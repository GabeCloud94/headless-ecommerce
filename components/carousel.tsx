import { Separator } from 'app/components/ui/separator';
import { getCollectionProducts } from 'lib/shopify';
import Link from 'next/link';
import { GridTileImage } from './grid/tile';

export async function Carousel() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const products = await getCollectionProducts({ collection: 'related-products' });

  if (!products?.length) return null;

  // Purposefully duplicating products to make the carousel loop and not run out of products on wide screens.
  const carouselProducts = [...products];

  return (
    <div className=" w-full md:max-w-7xl mx-auto overflow-x-auto pb-6 pt-1 scrollbar-thumb-rounded-lg scrollbar-thumb-accent scrollbar-track-transparent scrollbar-thin">
      <h2 className='pb-4'>
          <Link href="/search/related-products" className='text-3xl my-4 hover:text-muted-foreground transition-all duration-300'>
              Related Products
          </Link>
        </h2>
        <Separator />
        <ul className="flex animate-carousel gap-4 pt-6">
          {carouselProducts.map((product, i) => (
            <li
              key={`${product.handle}${i}`}
              className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
            >
              <Link href={`/product/${product.handle}`} className="relative h-full w-full">
                <GridTileImage
                  alt={product.title}
                  label={{
                    title: product.title,
                    amount: product.priceRange.maxVariantPrice.amount,
                    currencyCode: product.priceRange.maxVariantPrice.currencyCode
                  }}
                  src={product.featuredImage?.url}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                />
              </Link>
            </li>
          ))}
        </ul>
    </div>
  );
}
