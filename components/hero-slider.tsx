import { getCollectionProducts } from 'lib/shopify';
import { Product } from 'lib/shopify/types';
import { SlickSlider } from './slick-slider';



export async function HeroSlider() {

  const homepageItems: Product[] = await getCollectionProducts({
    collection: 'hidden-homepage-slider'
  });

  if (!homepageItems?.length) return null;

  return (
    <>
      <SlickSlider homepageItems={homepageItems} />
    </>
  )


}