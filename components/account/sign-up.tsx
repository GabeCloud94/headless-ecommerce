'use client'
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "app/components/ui/button";
import { Checkbox } from 'app/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'app/components/ui/form';
import { Input } from 'app/components/ui/input';
import { useForm } from "react-hook-form";
import * as z from "zod";
import OnSubmitCreate from "./on-submit-create";


export const createFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }).max(30, { message: "First name must be less than 30 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }).max(30, { message: "Last name must be less than 30 characters" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }).max(30, { message: "Password must be less than 30 characters" }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, { message: "Password must contain at least one uppercase letter, one lowercase letter, and one number" }),
  phone: z?.string(),
  acceptsMarketing: z.boolean().default(false)
})

export default function SignUp() {

  
    // 1. Define your form.
    const form = useForm<z.infer<typeof createFormSchema>>({
      resolver: zodResolver(createFormSchema),
      defaultValues: {
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        phone: "",
        acceptsMarketing: true
      },
    })

   
return (

<Form {...form}>
            <form onSubmit={form.handleSubmit(OnSubmitCreate)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email:</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name:</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name:</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password:</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number:</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="acceptsMarketing"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormLabel className="mt-2">Accept Marketing:</FormLabel>
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="mt-4" type="submit">Sign Up</Button>
            </form>
          </Form>
)
}
