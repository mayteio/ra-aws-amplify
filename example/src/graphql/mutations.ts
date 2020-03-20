// tslint:disable
// this is an auto generated file. This will be overwritten

export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
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
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
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
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
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
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
      id
      content
      postId
    }
  }
`;
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
      id
      content
      postId
    }
  }
`;
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
      id
      content
      postId
    }
  }
`;
export const createMedia = /* GraphQL */ `
  mutation CreateMedia(
    $input: CreateMediaInput!
    $condition: ModelMediaConditionInput
  ) {
    createMedia(input: $input, condition: $condition) {
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
export const updateMedia = /* GraphQL */ `
  mutation UpdateMedia(
    $input: UpdateMediaInput!
    $condition: ModelMediaConditionInput
  ) {
    updateMedia(input: $input, condition: $condition) {
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
export const deleteMedia = /* GraphQL */ `
  mutation DeleteMedia(
    $input: DeleteMediaInput!
    $condition: ModelMediaConditionInput
  ) {
    deleteMedia(input: $input, condition: $condition) {
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
export const createPostCategory = /* GraphQL */ `
  mutation CreatePostCategory(
    $input: CreatePostCategoryInput!
    $condition: ModelPostCategoryConditionInput
  ) {
    createPostCategory(input: $input, condition: $condition) {
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
export const updatePostCategory = /* GraphQL */ `
  mutation UpdatePostCategory(
    $input: UpdatePostCategoryInput!
    $condition: ModelPostCategoryConditionInput
  ) {
    updatePostCategory(input: $input, condition: $condition) {
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
export const deletePostCategory = /* GraphQL */ `
  mutation DeletePostCategory(
    $input: DeletePostCategoryInput!
    $condition: ModelPostCategoryConditionInput
  ) {
    deletePostCategory(input: $input, condition: $condition) {
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
export const createCategory = /* GraphQL */ `
  mutation CreateCategory(
    $input: CreateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    createCategory(input: $input, condition: $condition) {
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
export const updateCategory = /* GraphQL */ `
  mutation UpdateCategory(
    $input: UpdateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    updateCategory(input: $input, condition: $condition) {
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
export const deleteCategory = /* GraphQL */ `
  mutation DeleteCategory(
    $input: DeleteCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    deleteCategory(input: $input, condition: $condition) {
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
