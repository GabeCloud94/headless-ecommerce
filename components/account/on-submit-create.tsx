'use server'

import { createCustomer } from "lib/shopify"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }).max(30, { message: "First name must be less than 30 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }).max(30, { message: "Last name must be less than 30 characters" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }).max(30, { message: "Password must be less than 30 characters" }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, { message: "Password must contain at least one uppercase letter, one lowercase letter, and one number" }),
  phoneNumber: z?.string(),
  acceptsMarketing: z.boolean().default(false)
})



export default async function OnSubmitCreate(values: z.infer<typeof formSchema>) {

  createCustomer(values)
  console.log(values)
  revalidateTag("customer")
  redirect("/account")
}