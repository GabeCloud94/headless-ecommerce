// blog.ts

import { articleFragment } from "./article";

export const blogFragment = /* GraphQL */ `
  fragment blog on Blog {
    id
    title
    handle
    articles(first: 10) {
      edges {
        node {
          ...article
        }
      }
    }
    seo {
      title
      description
    }
    articleByHandle(handle: $handle) {
      ...article
    }
  }
  ${articleFragment}
`;

export const getBlogQuery = /* GraphQL */ `
  query getBlog($handle: String!) {
    blogByHandle(handle: $handle) {
      ...blog
    }
  }
  ${blogFragment}
`;




