import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import Prose from 'components/prose';
import { Product } from 'lib/shopify/types';
import { VariantSelector } from './variant-selector';

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-4">
        <h1 className="mb-2 text-4xl font-medium">{product.title}</h1>
        <div className="mr-auto w-auto rounded-full text-2xl text-foreground flex gap-2 items-center">
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
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
