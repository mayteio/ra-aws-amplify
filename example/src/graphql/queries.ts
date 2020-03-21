// tslint:disable
// this is an auto generated file. This will be overwritten

export const getMedia = /* GraphQL */ `
  query GetMedia($id: ID!) {
    getMedia(id: $id) {
      id
      name
      attachment {
        key
        identityId
        level
      }
      owner
    }
  }
`;
export const listMedias = /* GraphQL */ `
  query ListMedias(
    $filter: ModelMediaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMedias(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        attachment {
          key
          identityId
          level
        }
        owner
      }
      nextToken
    }
  }
`;
export const getPostCategory = /* GraphQL */ `
  query GetPostCategory($id: ID!) {
    getPostCategory(id: $id) {
      id
      postId
      categoryId
      category {
        id
        title
        posts {
          nextToken
        }
        owner
      }
      post {
        id
        title
        content
        image {
          id
          name
          owner
        }
        categories {
          nextToken
        }
        owner
        comments {
          nextToken
        }
      }
      owner
    }
  }
`;
export const listPostCategorys = /* GraphQL */ `
  query ListPostCategorys(
    $filter: ModelPostCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostCategorys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        postId
        categoryId
        category {
          id
          title
          owner
        }
        post {
          id
          title
          content
          owner
        }
        owner
      }
      nextToken
    }
  }
`;
export const getCategory = /* GraphQL */ `
  query GetCategory($id: ID!) {
    getCategory(id: $id) {
      id
      title
      posts {
        items {
          id
          postId
          categoryId
          owner
        }
        nextToken
      }
      owner
    }
  }
`;
export const listCategorys = /* GraphQL */ `
  query ListCategorys(
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCategorys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        posts {
          nextToken
        }
        owner
      }
      nextToken
    }
  }
`;
export const postCategorysByPost = /* GraphQL */ `
  query PostCategorysByPost(
    $postId: ID
    $categoryId: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postCategorysByPost(
      postId: $postId
      categoryId: $categoryId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        postId
        categoryId
        category {
          id
          title
          owner
        }
        post {
          id
          title
          content
          owner
        }
        owner
      }
      nextToken
    }
  }
`;
export const postCategorysByCategory = /* GraphQL */ `
  query PostCategorysByCategory(
    $categoryId: ID
    $postId: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postCategorysByCategory(
      categoryId: $categoryId
      postId: $postId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        postId
        categoryId
        category {
          id
          title
          owner
        }
        post {
          id
          title
          content
          owner
        }
        owner
      }
      nextToken
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        content
        image {
          id
          name
          owner
        }
        categories {
          items {
            category {
              id
              title
            }
          }
          nextToken
        }
        owner
        comments {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      title
      content
      image {
        id
        name
        attachment {
          key
          identityId
          level
        }
        owner
      }
      categories {
        items {
          id
          postId
          categoryId
          owner
        }
        nextToken
      }
      owner
      comments {
        items {
          id
          content
          postId
        }
        nextToken
      }
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      content
      postId
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        content
        postId
      }
      nextToken
    }
  }
`;
export const commentsByPost = /* GraphQL */ `
  query CommentsByPost(
    $postId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    commentsByPost(
      postId: $postId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        content
        postId
      }
      nextToken
    }
  }
`;
