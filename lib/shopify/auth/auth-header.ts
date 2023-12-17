
export default async function AuthHeaders() {

  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  
  const credentials = await crypto.subtle.digest(
    { name: "SHA-256" },
    new TextEncoder().encode(`${clientId}:${clientSecret}`)
  );
  return credentials;
}
