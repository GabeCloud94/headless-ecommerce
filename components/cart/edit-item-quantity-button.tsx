'use client';

import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useToast } from 'app/components/ui/use-toast';
import clsx from 'clsx';
import { updateItemQuantity } from 'components/cart/actions';
import LoadingDots from 'components/loading-dots';
import type { CartItem } from 'lib/shopify/types';
import { useFormState, useFormStatus } from 'react-dom';

function SubmitButton({ type, item, maxQuantity }: { type: 'plus' | 'minus', item: CartItem, maxQuantity: number }) {
  const { pending } = useFormStatus();
  const { toast } = useToast()

  return (
    <button
      type="submit"
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (pending) e.preventDefault();
        
        if (type === 'plus' && item.quantity >= maxQuantity) {
          toast({ title: 'Item quantity is at max.' });
        } else if (type === 'minus' && item.quantity <= 1) {
          toast({ title: 'Item has been removed.' });
        } else {
          type === 'plus' ? toast({ title: 'Item quantity increased.' }) : toast({ title: 'Item quantity decreased.' });
        }
      }}
      aria-label={type === 'plus' ? 'Increase item quantity' : 'Reduce item quantity'}
      aria-disabled={pending}
      className={clsx(
        'ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full px-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80',
        {
          'cursor-not-allowed': pending,
          'ml-auto': type === 'minus'
        }
      )}
    >
      {pending ? (
        <LoadingDots className="bg-foreground" />
      ) : type === 'plus' ? (
        <PlusIcon className="h-4 w-4 text-muted-foreground" />
      ) : (
        <MinusIcon className="h-4 w-4 text-muted-foreground" />
      )}
    </button>
  );
}

export function EditItemQuantityButton({ item, type, maxQuantity }: { item: CartItem; type: 'plus' | 'minus', maxQuantity: number }) {
  const [message, formAction] = useFormState(updateItemQuantity, null);
  const payload = {
    lineId: item.id,
    variantId: item.merchandise.id,
    quantity: type === 'plus' ? item.quantity + 1 : item.quantity - 1
  };
  const actionWithVariant = formAction.bind(null, payload);

  return (
    <form action={actionWithVariant}>
      <SubmitButton type={type} item={item} maxQuantity={maxQuantity} />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
