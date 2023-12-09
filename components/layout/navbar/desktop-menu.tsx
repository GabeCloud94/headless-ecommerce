"use client"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from 'app/components/ui/navigation-menu';
import { Menu, MenuItem } from 'lib/shopify/types';
import Link from 'next/link';



export default function DesktopMenu({ menu }: { menu: Menu[] }) {

  return (
    <div className='hidden md:block'>
    {menu.length ? (
        <NavigationMenu>
          <NavigationMenuList>
            {menu.map((item: Menu) => (
              <NavigationMenuItem key={item.title}>
                {item.items ? (
                  <>
                    <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                      <NavigationMenuContent className='p-6 max-w-lg w-full'>
                      <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    {item.items.map((childItem: MenuItem) => (  // Use MenuItem here
                    <li className="row-span-3" key={childItem.title}>
                        <Link href={childItem.path} passHref legacyBehavior>
                          <NavigationMenuLink className={navigationMenuTriggerStyle()}>{childItem.title}</NavigationMenuLink>
                        </Link>
                    </li>
                    ))}
                    </ul>
                      </NavigationMenuContent>
                  </>
                ) : (
                  <Link href={item.path} passHref legacyBehavior>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>{item.title}</NavigationMenuLink>
                  </Link>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      ) : null}
    </div>
  )
}