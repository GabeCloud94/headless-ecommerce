import { Button } from 'app/components/ui/button';
import { getCollectionProducts } from 'lib/shopify';
import { Product } from 'lib/shopify/types';
import Link from 'next/link';
import { SlickSlider } from './slick-slider';


const { SITE_NAME } = process.env;
export async function HeroSlider() {

  const homepageItems: Product[] = await getCollectionProducts({
    collection: 'new-arrivals'
  });

  if (!homepageItems?.length) return null;

  return (
    <section className='xl:max-w-7xl lg:flex lg:flex-row lg:justify-between lg:items-center xl:mx-auto border rounded-lg py-6 px-12 mb-8 bg-secondary mx-4'>
      <div className='flex flex-col gap-4 text-center mb-4 lg:mb-0'>
        <h1 className='text-5xl'>{SITE_NAME}</h1>
        <p className='text-2xl'>Be the First to Check Out Our New Arrivals!</p>
        <Button variant="default" className='text-xl py-6 w-36 mx-auto' asChild>
          <Link href="/search/new-arrivals">Shop Now</Link>
        </Button>
      </div>
        <SlickSlider homepageItems={homepageItems} />

    </section>
  )


}