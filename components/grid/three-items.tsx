import { Separator } from 'app/components/ui/separator';
import { GridTileImage } from 'components/grid/tile';
import { getCollectionProducts } from 'lib/shopify';
import type { Product } from 'lib/shopify/types';
import Link from 'next/link';

function ThreeItemGridItem({
  item,
  size,

}: {
  item: Product;
  size: 'full' | 'half';

}) {
  return (
    <div
      className={size === 'full' ? 'md:col-span-4 md:row-span-2 col-span-2 row-span-1' : 'md:col-span-2 md:row-span-1'}
    >
      <Link className="relative block aspect-square h-full w-full" href={`/product/${item.handle}`}>
        <GridTileImage
          src={item.featuredImage.url}
          fill
          sizes={
            size === 'full' ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 50vw'
          }
          compareAtAmount={parseFloat(item.compareAtPriceRange.maxVariantPrice.amount) > 0 ? item.compareAtPriceRange.maxVariantPrice.amount : undefined }
          amount={item.priceRange.maxVariantPrice.amount}
          alt={item.title}
          label={{
            position: 'bottom',
            title: item.title as string,
            amount: item.priceRange.maxVariantPrice.amount,
            currencyCode: item.priceRange.maxVariantPrice.currencyCode
          }}
        />
      </Link>
    </div>
  );
}

export async function ThreeItemGrid() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const homepageItems = await getCollectionProducts({
    collection: 'best-sellers'
  });

  if (!homepageItems[0] || !homepageItems[1] || !homepageItems[2]) return null;

  const [firstProduct, secondProduct, thirdProduct] = homepageItems;

  return (
    <section className='mx-auto max-w-7xl px-4'>
      <h2 className='pb-4'>
        <Link href="/search/best-sellers" className='text-3xl my-4 hover:text-muted-foreground transition-all duration-300'>
            Best Sellers
        </Link>
      </h2>
      <Separator />
      <div className="grid gap-4 py-6 md:grid-cols-6 md:grid-rows-2">
      <ThreeItemGridItem size="full" item={firstProduct} />
      <ThreeItemGridItem size="half" item={secondProduct} />
      <ThreeItemGridItem size="half" item={thirdProduct} />
      </div>
    </section>
  );
}
