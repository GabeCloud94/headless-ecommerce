'use server'

// on-submit-create.tsx

import { redirect } from "next/navigation";



export default async function OnSubmitCreate(data: { email: string; firstName: string; lastName: string; password: string; phone: string; acceptsMarketing: boolean; }) {
  
  const plainFormData = {
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    password: data.password,
    phone: data.phone,
    acceptsMarketing: data.acceptsMarketing
  }
  console.log(plainFormData)
  

  const response = await fetch("https://shopify.com/85110685995/account/customer/unstable/graphql",
  {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${process.env.SHOPIFY_CUSTOMER_CLIENT_ID}`,
    },
    body: JSON.stringify({
      query: `
        mutation customerCreate($input: CustomerCreateInput!) {
          customerCreate(input: $input) {
            customer {
              id
            }
            userErrors {
              field
              message
            }
          }
        }
      `,
      variables: {
        input: plainFormData
      }
    })
  })

    // Parse the JSON response
    const promise = await response.json();

    // Check for errors
    if (promise.errors) {
      console.error(promise.errors);
      throw new Error('Error creating customer');
    }
  
    // Handle the data
    const customer = promise.data.customerCreate.customer;
    console.log('Created customer:', customer);
  
    // If you need to redirect or perform some other action, do it here
    // For example, you might redirect to the new customer's profile page
    redirect(`/account/${customer.id}`);
}