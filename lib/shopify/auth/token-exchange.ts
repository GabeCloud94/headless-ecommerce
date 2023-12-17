import { cookies } from "next/headers";

export default async function TokenExchange() {
  const cookieStore = cookies()
  const clientId = process.env.SHOPIFY_CUSTOMER_CLIENT_ID;
  const customerApiClientId = '30243aa5-17c1-465a-8493-944bcc4e88aa';
  const accessToken = cookieStore.get('accessToken');
  const body = new URLSearchParams();

  body.append('grant_type', 'urn:ietf:params:oauth:grant-type:jwt-bearer');
  body.append('client_id', clientId ?? '');
  body.append('audience', customerApiClientId);
  if (accessToken) {
    body.append('subject_token', accessToken.toString());
  }
  body.append(
    'subject_token_type',
    'urn:ietf:params:oauth:token-type:access_token',
  );
  body.append('scopes', 'https://api.customers.com/auth/customer.graphql');
  const headers = {
    'content-type': 'application/x-www-form-urlencoded',
    // Confidential Client
    'Authorization': 'Basic `<credentials>`'
  }
  const response = await fetch(`https://shopify.com/85110685995/auth/oauth/token`, {
    method: 'POST',
    headers: headers,
    body,
  });

  const {access_token} = await response.json();

  return access_token;
}