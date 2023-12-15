import { ModeToggle } from 'app/components/ui/mode-toggle';
import Account from 'components/account/account';
import Cart from 'components/cart';
import OpenCart from 'components/cart/open-cart';
import LogoSquare from 'components/logo-square';
import { getMenu } from 'lib/shopify';
import Link from 'next/link';
import { Suspense } from 'react';
import DesktopMenu from './desktop-menu';
import MobileMenu from './mobile-menu';
import Search from './search';





const { SITE_NAME } = process.env;

export default async function Navbar() {
  const menu = await getMenu('next-js-frontend-header-menu');

  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="block flex-none md:hidden">
        <MobileMenu menu={menu} />
      </div>
      <div className="flex w-full items-center">
        <div className="flex w-full lg:w-1/2 2xl:w-1/3">
          <Link href="/" className="mr-2 ml-2 flex w-full items-center justify-start md:w-auto 2xl:mr-6">
            <LogoSquare />
            <div className="ml-2 flex-none text-sm font-medium uppercase hidden 2xl:block">
              {SITE_NAME}
            </div>
          </Link>
          <DesktopMenu menu={menu} />
        </div>
        <div className="hidden justify-end lg:flex lg:w-1/4 2xl:w-1/3">
          <Search />
        </div>
        <div className="flex justify-end 2xl:w-1/3 lg:w-1/4 gap-4 items-center">
          <ModeToggle />
          <Account />
          <Suspense fallback={<OpenCart />}>
            <Cart />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}
