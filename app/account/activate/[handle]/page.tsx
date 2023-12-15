'use client'
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'app/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'app/components/ui/form';
import { Input } from 'app/components/ui/input';
import onSubmitActivateByUrl from 'components/account/activate-by-url';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from "zod";

const activateByUrlSchema = z.object({
  activationUrl: z.string(),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }).max(30, { message: "Password must be less than 30 characters" }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, { message: "Password must contain at least one uppercase letter, one lowercase letter, and one number" }),
})

export default function PasswordForm() {
  const params = useParams().toString()

  const form = useForm<z.infer<typeof activateByUrlSchema>>({
    resolver: zodResolver(activateByUrlSchema),
    defaultValues: {
      activationUrl: params,
      password: '',
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitActivateByUrl)}>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password:</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="outline" type="submit">Submit</Button>
      </form>
    </Form>
  );
};
