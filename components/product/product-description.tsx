'use client'
import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import Prose from 'components/prose';
import { Product, ProductVariant } from 'lib/shopify/types';
import { useSearchParams } from 'next/navigation';
import { VariantSelector } from './variant-selector';

export function ProductDescription({ product }: { product: Product; }) {
  const searchParams = useSearchParams();
  const defaultVariant = product?.variants.length === 1 ? product?.variants[0] : undefined;
  const variant = product?.variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === searchParams.get(option.name.toLowerCase())
    )
  );
  const selectedVariant= variant || defaultVariant;
  const price = selectedVariant ? selectedVariant.price.amount : product.priceRange.maxVariantPrice.amount;
  return (
    
    <>
      <div className="mb-6 flex flex-col border-b pb-4">
        <h1 className="mb-2 text-4xl font-medium">{product.title}</h1>
        <div className="mr-auto w-auto rounded-full text-2xl text-foreground flex gap-2 items-center">
          <Price
            amount={price}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
            currencyCodeClassName="text-2xl"
            className='text-2xl pl-0'
          />
          {parseFloat(product.compareAtPriceRange.maxVariantPrice.amount) > 0 ? (
            <Price
              amount={product.compareAtPriceRange.maxVariantPrice.amount}
              currencyCode={product.compareAtPriceRange.maxVariantPrice.currencyCode}
              currencyCodeClassName="text-lg text-primary"
              className='text-lg pl-0 line-through text-primary'
            />
          ) : null}
        </div>
      </div>
      <VariantSelector options={product.options} variants={product.variants} />

      {product.descriptionHtml ? (
        <Prose
          className="mb-6 text-sm leading-tight text-foreground"
          html={product.descriptionHtml}
        />
      ) : null}

      <AddToCart variants={product.variants} availableForSale={product.availableForSale} />
    </>
  );
}
