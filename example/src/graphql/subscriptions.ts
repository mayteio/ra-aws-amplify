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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost($owner: String, $editors: String) {
    onUpdatePost(owner: $owner, editors: $editors) {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost($owner: String) {
    onDeletePost(owner: $owner) {
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
export const onCreateMedia = /* GraphQL */ `
  subscription OnCreateMedia($editors: String) {
    onCreateMedia(editors: $editors) {
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
export const onUpdateMedia = /* GraphQL */ `
  subscription OnUpdateMedia($editors: String) {
    onUpdateMedia(editors: $editors) {
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
export const onDeleteMedia = /* GraphQL */ `
  subscription OnDeleteMedia($editors: String) {
    onDeleteMedia(editors: $editors) {
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
export const onCreatePostEditor = /* GraphQL */ `
  subscription OnCreatePostEditor($editors: String) {
    onCreatePostEditor(editors: $editors) {
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
export const onUpdatePostEditor = /* GraphQL */ `
  subscription OnUpdatePostEditor($editors: String) {
    onUpdatePostEditor(editors: $editors) {
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
export const onDeletePostEditor = /* GraphQL */ `
  subscription OnDeletePostEditor($editors: String) {
    onDeletePostEditor(editors: $editors) {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
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
