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
export const onCreatePostCategory = /* GraphQL */ `
  subscription OnCreatePostCategory($owner: String) {
    onCreatePostCategory(owner: $owner) {
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
export const onUpdatePostCategory = /* GraphQL */ `
  subscription OnUpdatePostCategory($owner: String) {
    onUpdatePostCategory(owner: $owner) {
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
export const onDeletePostCategory = /* GraphQL */ `
  subscription OnDeletePostCategory($owner: String) {
    onDeletePostCategory(owner: $owner) {
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
export const onCreateCategory = /* GraphQL */ `
  subscription OnCreateCategory($owner: String) {
    onCreateCategory(owner: $owner) {
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
export const onUpdateCategory = /* GraphQL */ `
  subscription OnUpdateCategory($owner: String) {
    onUpdateCategory(owner: $owner) {
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
export const onDeleteCategory = /* GraphQL */ `
  subscription OnDeleteCategory($owner: String) {
    onDeleteCategory(owner: $owner) {
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
