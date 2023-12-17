'use client'
import { Button } from 'app/components/ui/button';
import { Auth } from 'lib/shopify/auth/auth-request';

import { RiAccountBoxLine } from "react-icons/ri";





export default function Account() {




  return (

        <Button variant="outline" size="icon" onClick={Auth}><RiAccountBoxLine className='text-xl' /></Button>

  );
}
