'use client'

import { Product } from "lib/shopify/types";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { GridTileImage } from "./grid/tile";



export function SlickSlider({homepageItems}: {homepageItems: Product[]}) {
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    accessibility: true
    
  };

  return (
    <>
      <Slider className="lg:max-w-3xl md:max-w-xl max-w-screen px-4 mb-10 mx-auto relative" {...settings}>
        {homepageItems.map((product, i) => (
          <div key={`${product.handle}${i}`}>
            {product.featuredImage && (
              <Link href={`/product/${product.handle}`} className="relative h-full w-full">
                <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode: product.priceRange.maxVariantPrice.currencyCode
                }}
                src={product.featuredImage?.url}
                width={800}
                height={800}
              />
              </Link>
            )}
          </div>
        ))}
      </Slider>

    </>
  )
}