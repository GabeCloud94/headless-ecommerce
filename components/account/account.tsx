'use client'
import { Button } from 'app/components/ui/button';

import { RiAccountBoxLine } from "react-icons/ri";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../../app/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../app/components/ui/tabs";
import SignIn from './sign-in';
import SignUp from './sign-up';





export default function Account() {




  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon"><RiAccountBoxLine className='text-xl' /></Button>
      </SheetTrigger>
      <SheetContent side='left'>
        <SheetHeader>
          <SheetTitle>Sign In / Sign Up</SheetTitle>
          <SheetDescription>
            If you already have an account, sign in here. Otherwise, sign up for a new account.
          </SheetDescription>
        </SheetHeader>

        <Tabs defaultValue="sign in" className="mt-2">
          <TabsList>
            <TabsTrigger value="sign in">Sign In</TabsTrigger>
            <TabsTrigger value="sign up">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="sign in">
            <SignIn />
          </TabsContent>
          <TabsContent value="sign up">
            <SignUp />
        </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
