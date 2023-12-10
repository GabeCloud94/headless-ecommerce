

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

export const getArticleQuery = /* GraphQL */ `
  query getArticle($id: ID!) {
    article(id: $id) {
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
  }
  ${articleFragment}
`;

export const getArticlesQuery = /* GraphQL */ `
  query getArticles {
    articles(first: 10) {
      edges {
        node {
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
      }
    }
  }
  ${articleFragment}
`;