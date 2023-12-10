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
    <div className='md:max-w-7xl md:flex md:flex-row md:justify-center md:items-center gap-4 md:mx-auto border rounded-lg p-6 mb-6 bg-secondary'>
      <div className='flex flex-col gap-4 text-center mb-4 md:mb-0'>
        <h1 className='text-5xl'>{SITE_NAME}</h1>
        <p className='text-2xl'>Be the First to Check Out Our New Arrivals!</p>
        <Button variant="default" className='text-xl py-6 w-36 mx-auto' asChild>
          <Link href="/collections/new-arrivals">Shop Now</Link>
        </Button>
      </div>
        <SlickSlider homepageItems={homepageItems} />

    </div>
  )


}