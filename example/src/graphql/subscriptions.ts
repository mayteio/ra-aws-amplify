// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost($owner: String) {
    onCreatePost(owner: $owner) {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost($owner: String, $editors: String) {
    onUpdatePost(owner: $owner, editors: $editors) {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost($owner: String) {
    onDeletePost(owner: $owner) {
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
export const onCreatePostEditor = /* GraphQL */ `
  subscription OnCreatePostEditor($editors: String) {
    onCreatePostEditor(editors: $editors) {
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
export const onUpdatePostEditor = /* GraphQL */ `
  subscription OnUpdatePostEditor($editors: String) {
    onUpdatePostEditor(editors: $editors) {
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
export const onDeletePostEditor = /* GraphQL */ `
  subscription OnDeletePostEditor($editors: String) {
    onDeletePostEditor(editors: $editors) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($owner: String) {
    onCreateUser(owner: $owner) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($owner: String) {
    onUpdateUser(owner: $owner) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($owner: String) {
    onDeleteUser(owner: $owner) {
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
      id
      content
      postId
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
      id
      content
      postId
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
      id
      content
      postId
    }
  }
`;
export const onCreateMedia = /* GraphQL */ `
  subscription OnCreateMedia($owner: String) {
    onCreateMedia(owner: $owner) {
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
export const onUpdateMedia = /* GraphQL */ `
  subscription OnUpdateMedia($owner: String) {
    onUpdateMedia(owner: $owner) {
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
export const onDeleteMedia = /* GraphQL */ `
  subscription OnDeleteMedia($owner: String) {
    onDeleteMedia(owner: $owner) {
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
