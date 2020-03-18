// tslint:disable
// this is an auto generated file. This will be overwritten

export const getPostEditor = /* GraphQL */ `
  query GetPostEditor($id: ID!) {
    getPostEditor(id: $id) {
      id
      editor {
        id
        username
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
        editors {
          nextToken
        }
        owner
        comments {
          nextToken
        }
      }
    }
  }
`;
export const listPostEditors = /* GraphQL */ `
  query ListPostEditors(
    $filter: ModelPostEditorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostEditors(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        editor {
          id
          username
          owner
        }
        post {
          id
          title
          content
          owner
        }
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      posts {
        items {
          id
        }
        nextToken
      }
      owner
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        posts {
          nextToken
        }
        owner
      }
      nextToken
    }
  }
`;
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
        editors {
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
      editors {
        items {
          id
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
