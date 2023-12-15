export const getCustomerQuery = /* GraphQL */ `
  query getCustomer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      firstName
      lastName
      email
      phone
      defaultAddress {
        id
        firstName
        lastName
        company
        address1
        address2
        city
        province
        zip
        country
        phone
      }
      addresses(first: 100) {
        edges {
          node {
            id
            firstName
            lastName
            company
            address1
            address2
            city
            province
            zip
            country
            phone
          }
        }
      }
    }
  }
`;

export const CREATE_CUSTOMER_MUTATION = /* GraphQL */`
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
        displayName
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
  `;
export const LOGIN_CUSTOMER_MUTATION = /* GraphQL */ `
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const ACTIVATE_CUSTOMER_BY_URL_MUTATION = /* GraphQL */ `
mutation customerActivateByUrl($activationUrl: URL!, $password: String!) {
  customerActivateByUrl(activationUrl: $activationUrl, password: $password) {
    customer {
      # Customer fields
    }
    customerAccessToken {
      # CustomerAccessToken fields
    }
    customerUserErrors {
      # CustomerUserError fields
    }
  }
}
`;