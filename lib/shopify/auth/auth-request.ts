import { generateNonce } from "./nonce";
import { generateState } from "./state";

export async function Auth() {
  const clientId = process.env.SHOPIFY_CUSTOMER_CLIENT_ID;
  const state = await generateState();
  const nonce = await generateNonce(10);
  const authorizationRequestUrl = new URL(
    `https://shopify.com/85110685995/auth/oauth/authorize`
  );

  authorizationRequestUrl.searchParams.append(
    'scope',
    'openid email https://api.customers.com/auth/customer.graphql'
  );
  authorizationRequestUrl.searchParams.append(
    'client_id',
    `${clientId}`
  );
  authorizationRequestUrl.searchParams.append(
    'response_type',
    'code'
  );
  authorizationRequestUrl.searchParams.append(
    'redirect_uri',
    `https://nextjs-commerce-liart-beta.vercel.app`
  );
  authorizationRequestUrl.searchParams.append(
    'state',
    state
  );
  authorizationRequestUrl.searchParams.append(
    'nonce',
    nonce
  );


  window.location.href = authorizationRequestUrl.toString();
}