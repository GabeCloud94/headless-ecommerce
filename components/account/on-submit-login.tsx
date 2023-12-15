'use server'

import { loginCustomer } from "lib/shopify"
import { z } from "zod"
import { loginFormSchema } from "./sign-in"



export default async function OnSubmitLogin(values: z.infer<typeof loginFormSchema>) {
  loginCustomer(values)
}