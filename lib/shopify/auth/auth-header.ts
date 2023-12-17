
export default async function AuthHeaders() {

  const clientId = process.env.SHOPIFY_CUSTOMER_CLIENT_ID;
  const clientSecret = process.env.SHOPIFY_CUSTOMER_CLIENT_SECRET;
  
  const credentials = await crypto.subtle.digest(
    { name: "SHA-256" },
    new TextEncoder().encode(`${clientId}:${clientSecret}`)
  );
  return credentials;
}
