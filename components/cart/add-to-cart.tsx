'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import { useToast } from 'app/components/ui/use-toast';
import clsx from 'clsx';
import { addItem } from 'components/cart/actions';
import LoadingDots from 'components/loading-dots';
import { ProductVariant } from 'lib/shopify/types';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react'; // Make sure to import React
import { useFormState, useFormStatus } from 'react-dom';
import QuantitySelector from './quantity-selector';

function SubmitButton({
  availableForSale,
  selectedVariantId,
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;}) {
  const { pending } = useFormStatus();
  const { toast } = useToast()
  const buttonClasses =
    'relative flex w-full items-center justify-center rounded-full bg-primary text-primary-foreground p-4 tracking-wide';
  const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60';

  if (!availableForSale) {
    return (
      <button aria-disabled className={clsx(buttonClasses, disabledClasses)}>
        Out Of Stock
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-label="Please select an option"
        aria-disabled
        className={clsx(buttonClasses, disabledClasses)}
      >
        <div className="absolute left-0 ml-4">
          <PlusIcon className="h-5" />
        </div>
        Add To Cart
      </button>
    );
  }

  return (
    <button
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        pending ? e.preventDefault() : toast({ title: 'Added item(s) to cart successfully!' })
      }}
      aria-label="Add to cart"
      aria-disabled={pending}
      className={clsx(buttonClasses, {
        'hover:opacity-90': true,
        disabledClasses: pending
      })}
      >
      <div className="absolute left-0 ml-4">
        {pending ? <LoadingDots className="mb-3 bg-white" /> : <PlusIcon className="h-5" />}
      </div>
      Add To Cart
    </button>
  );
}

export function AddToCart({
  variants,
  availableForSale
}: {
  variants: ProductVariant[];
  availableForSale: boolean;
}) {
  const [message, formAction] = useFormState(addItem, null);
  const searchParams = useSearchParams();
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === searchParams.get(option.name.toLowerCase())
    )
  );
  const selectedVariantId = variant?.id || defaultVariantId;

  // State to manage the quantity
  const [quantity, setQuantity] = useState(1);

  // Wrapper function to handle binding additional arguments
  const actionWithVariantAndQuantity = formAction.bind(null, {selectedVariantId, quantity});
  

  return (
    <form action={actionWithVariantAndQuantity}>
      {/* Add the QuantitySelector component here */}
      <div className='flex items-center gap-4'>

        <QuantitySelector onQuantityChange={setQuantity} quantity={quantity} />
        
        {selectedVariantId && <p>Remaining: Quantity: {variant?.quantityAvailable}</p>}
      </div>
  
      {/* Original SubmitButton logic remains unchanged */}
      <SubmitButton availableForSale={availableForSale} selectedVariantId={selectedVariantId} />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
