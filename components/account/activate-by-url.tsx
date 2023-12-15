'use server'
import { customerActivateByUrl } from "lib/shopify";
import * as z from "zod";

const activateByUrlSchema = z.object({
  activationUrl: z.string(),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }).max(30, { message: "Password must be less than 30 characters" }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, { message: "Password must contain at least one uppercase letter, one lowercase letter, and one number" }),
})

export default async function onSubmitActivateByUrl(data: z.infer<typeof activateByUrlSchema>) {
  customerActivateByUrl(data)
};