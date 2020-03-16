// tslint:disable
// this is an auto generated file. This will be overwritten

export const getMedia = /* GraphQL */ `
  query GetMedia($id: ID!) {
    getMedia(id: $id) {
      id
      title
      attachment {
        key
        identityId
        level
      }
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
        title
        attachment {
          key
          identityId
          level
        }
      }
      nextToken
    }
  }
`;
export const getPostEditor = /* GraphQL */ `
  query GetPostEditor($id: ID!) {
    getPostEditor(id: $id) {
      id
      post {
        id
        title
        content
        image {
          id
          title
        }
        editors {
          nextToken
        }
        owner
        comments {
          nextToken
        }
      }
      editor {
        id
        username
        posts {
          nextToken
        }
        owner
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
        post {
          id
          title
          content
          owner
        }
        editor {
          id
          username
          owner
        }
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
          title
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
        title
        attachment {
          key
          identityId
          level
        }
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
        }
        nextToken
      }
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
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      content
      post {
        id
        title
        content
        image {
          id
          title
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
