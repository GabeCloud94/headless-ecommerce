//article.ts

export const articleFragment = /* GraphQL */ `
  fragment article on Article {
    id
    title
    image {
      url
      altText
    }
    content
    excerpt
    seo {
      title
      description
    }
    publishedAt
    handle
  }  
`;



