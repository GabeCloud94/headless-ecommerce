
import credentials from './auth-header';

export default async function ObtainAccessToken(code: string) {

  const clientId = process.env.SHOPIFY_CUSTOMER_CLIENT_ID;
  const body = new URLSearchParams();
  
  body.append('grant_type', 'authorization_code');
  body.append('client_id', clientId ?? '');
  body.append(
    'redirect_uri',
    `nextjs-commerce-liart-beta.vercel.app
    `,
  );
  body.append('code', code);
  

  const headers = {
    'content-type': 'application/x-www-form-urlencoded',
    // Confidential Client
    'Authorization': `Basic ${credentials}}`
  }
  
  const response = await fetch(`https://shopify.com/85110685995/auth/oauth/token`, {
    method: 'POST',
    headers: headers,
    body,
  });
  

  
  const {access_token, expires_in, id_token, refresh_token} =
    await response.json();

  return {access_token, expires_in, id_token, refresh_token};
}
