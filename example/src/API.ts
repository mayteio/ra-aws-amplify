/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateBlogInput = {
  id?: string | null,
  name: string,
};

export type ModelBlogConditionInput = {
  name?: ModelStringInput | null,
  and?: Array< ModelBlogConditionInput | null > | null,
  or?: Array< ModelBlogConditionInput | null > | null,
  not?: ModelBlogConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type UpdateBlogInput = {
  id: string,
  name?: string | null,
};

export type DeleteBlogInput = {
  id?: string | null,
};

export type CreatePostInput = {
  id?: string | null,
  title: string,
  image?: S3ObjectInput | null,
  postBlogId?: string | null,
};

export type S3ObjectInput = {
  key: string,
  identityId?: string | null,
  level?: string | null,
};

export type ModelPostConditionInput = {
  title?: ModelStringInput | null,
  and?: Array< ModelPostConditionInput | null > | null,
  or?: Array< ModelPostConditionInput | null > | null,
  not?: ModelPostConditionInput | null,
};

export type UpdatePostInput = {
  id: string,
  title?: string | null,
  image?: S3ObjectInput | null,
  postBlogId?: string | null,
};

export type DeletePostInput = {
  id?: string | null,
};

export type CreatePostEditorInput = {
  id?: string | null,
  postEditorPostId: string,
  postEditorEditorId: string,
};

export type ModelPostEditorConditionInput = {
  and?: Array< ModelPostEditorConditionInput | null > | null,
  or?: Array< ModelPostEditorConditionInput | null > | null,
  not?: ModelPostEditorConditionInput | null,
};

export type UpdatePostEditorInput = {
  id: string,
  postEditorPostId?: string | null,
  postEditorEditorId?: string | null,
};

export type DeletePostEditorInput = {
  id?: string | null,
};

export type CreateUserInput = {
  id?: string | null,
  username: string,
};

export type ModelUserConditionInput = {
  username?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type UpdateUserInput = {
  id: string,
  username?: string | null,
};

export type DeleteUserInput = {
  id?: string | null,
};

export type CreateCommentInput = {
  id?: string | null,
  content?: string | null,
  commentPostId?: string | null,
};

export type ModelCommentConditionInput = {
  content?: ModelStringInput | null,
  and?: Array< ModelCommentConditionInput | null > | null,
  or?: Array< ModelCommentConditionInput | null > | null,
  not?: ModelCommentConditionInput | null,
};

export type UpdateCommentInput = {
  id: string,
  content?: string | null,
  commentPostId?: string | null,
};

export type DeleteCommentInput = {
  id?: string | null,
};

export type ModelBlogFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelBlogFilterInput | null > | null,
  or?: Array< ModelBlogFilterInput | null > | null,
  not?: ModelBlogFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelPostFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  and?: Array< ModelPostFilterInput | null > | null,
  or?: Array< ModelPostFilterInput | null > | null,
  not?: ModelPostFilterInput | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  username?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelCommentFilterInput = {
  id?: ModelIDInput | null,
  content?: ModelStringInput | null,
  and?: Array< ModelCommentFilterInput | null > | null,
  or?: Array< ModelCommentFilterInput | null > | null,
  not?: ModelCommentFilterInput | null,
};

export type CreateBlogMutationVariables = {
  input: CreateBlogInput,
  condition?: ModelBlogConditionInput | null,
};

export type CreateBlogMutation = {
  createBlog:  {
    __typename: "Blog",
    id: string,
    name: string,
    posts:  {
      __typename: "ModelPostConnection",
      items:  Array< {
        __typename: "Post",
        id: string,
        title: string,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type UpdateBlogMutationVariables = {
  input: UpdateBlogInput,
  condition?: ModelBlogConditionInput | null,
};

export type UpdateBlogMutation = {
  updateBlog:  {
    __typename: "Blog",
    id: string,
    name: string,
    posts:  {
      __typename: "ModelPostConnection",
      items:  Array< {
        __typename: "Post",
        id: string,
        title: string,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type DeleteBlogMutationVariables = {
  input: DeleteBlogInput,
  condition?: ModelBlogConditionInput | null,
};

export type DeleteBlogMutation = {
  deleteBlog:  {
    __typename: "Blog",
    id: string,
    name: string,
    posts:  {
      __typename: "ModelPostConnection",
      items:  Array< {
        __typename: "Post",
        id: string,
        title: string,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type CreatePostMutationVariables = {
  input: CreatePostInput,
  condition?: ModelPostConditionInput | null,
};

export type CreatePostMutation = {
  createPost:  {
    __typename: "Post",
    id: string,
    title: string,
    image:  {
      __typename: "S3Object",
      key: string,
      identityId: string | null,
      level: string | null,
    } | null,
    editors:  {
      __typename: "ModelPostEditorConnection",
      items:  Array< {
        __typename: "PostEditor",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    blog:  {
      __typename: "Blog",
      id: string,
      name: string,
      posts:  {
        __typename: "ModelPostConnection",
        nextToken: string | null,
      } | null,
    } | null,
    owner: string | null,
    comments:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        content: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type UpdatePostMutationVariables = {
  input: UpdatePostInput,
  condition?: ModelPostConditionInput | null,
};

export type UpdatePostMutation = {
  updatePost:  {
    __typename: "Post",
    id: string,
    title: string,
    image:  {
      __typename: "S3Object",
      key: string,
      identityId: string | null,
      level: string | null,
    } | null,
    editors:  {
      __typename: "ModelPostEditorConnection",
      items:  Array< {
        __typename: "PostEditor",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    blog:  {
      __typename: "Blog",
      id: string,
      name: string,
      posts:  {
        __typename: "ModelPostConnection",
        nextToken: string | null,
      } | null,
    } | null,
    owner: string | null,
    comments:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        content: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type DeletePostMutationVariables = {
  input: DeletePostInput,
  condition?: ModelPostConditionInput | null,
};

export type DeletePostMutation = {
  deletePost:  {
    __typename: "Post",
    id: string,
    title: string,
    image:  {
      __typename: "S3Object",
      key: string,
      identityId: string | null,
      level: string | null,
    } | null,
    editors:  {
      __typename: "ModelPostEditorConnection",
      items:  Array< {
        __typename: "PostEditor",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    blog:  {
      __typename: "Blog",
      id: string,
      name: string,
      posts:  {
        __typename: "ModelPostConnection",
        nextToken: string | null,
      } | null,
    } | null,
    owner: string | null,
    comments:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        content: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type CreatePostEditorMutationVariables = {
  input: CreatePostEditorInput,
  condition?: ModelPostEditorConditionInput | null,
};

export type CreatePostEditorMutation = {
  createPostEditor:  {
    __typename: "PostEditor",
    id: string,
    post:  {
      __typename: "Post",
      id: string,
      title: string,
      image:  {
        __typename: "S3Object",
        key: string,
        identityId: string | null,
        level: string | null,
      } | null,
      editors:  {
        __typename: "ModelPostEditorConnection",
        nextToken: string | null,
      } | null,
      blog:  {
        __typename: "Blog",
        id: string,
        name: string,
      } | null,
      owner: string | null,
      comments:  {
        __typename: "ModelCommentConnection",
        nextToken: string | null,
      } | null,
    },
    editor:  {
      __typename: "User",
      id: string,
      username: string,
      posts:  {
        __typename: "ModelPostEditorConnection",
        nextToken: string | null,
      } | null,
      owner: string | null,
    },
  } | null,
};

export type UpdatePostEditorMutationVariables = {
  input: UpdatePostEditorInput,
  condition?: ModelPostEditorConditionInput | null,
};

export type UpdatePostEditorMutation = {
  updatePostEditor:  {
    __typename: "PostEditor",
    id: string,
    post:  {
      __typename: "Post",
      id: string,
      title: string,
      image:  {
        __typename: "S3Object",
        key: string,
        identityId: string | null,
        level: string | null,
      } | null,
      editors:  {
        __typename: "ModelPostEditorConnection",
        nextToken: string | null,
      } | null,
      blog:  {
        __typename: "Blog",
        id: string,
        name: string,
      } | null,
      owner: string | null,
      comments:  {
        __typename: "ModelCommentConnection",
        nextToken: string | null,
      } | null,
    },
    editor:  {
      __typename: "User",
      id: string,
      username: string,
      posts:  {
        __typename: "ModelPostEditorConnection",
        nextToken: string | null,
      } | null,
      owner: string | null,
    },
  } | null,
};

export type DeletePostEditorMutationVariables = {
  input: DeletePostEditorInput,
  condition?: ModelPostEditorConditionInput | null,
};

export type DeletePostEditorMutation = {
  deletePostEditor:  {
    __typename: "PostEditor",
    id: string,
    post:  {
      __typename: "Post",
      id: string,
      title: string,
      image:  {
        __typename: "S3Object",
        key: string,
        identityId: string | null,
        level: string | null,
      } | null,
      editors:  {
        __typename: "ModelPostEditorConnection",
        nextToken: string | null,
      } | null,
      blog:  {
        __typename: "Blog",
        id: string,
        name: string,
      } | null,
      owner: string | null,
      comments:  {
        __typename: "ModelCommentConnection",
        nextToken: string | null,
      } | null,
    },
    editor:  {
      __typename: "User",
      id: string,
      username: string,
      posts:  {
        __typename: "ModelPostEditorConnection",
        nextToken: string | null,
      } | null,
      owner: string | null,
    },
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser:  {
    __typename: "User",
    id: string,
    username: string,
    posts:  {
      __typename: "ModelPostEditorConnection",
      items:  Array< {
        __typename: "PostEditor",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    owner: string | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser:  {
    __typename: "User",
    id: string,
    username: string,
    posts:  {
      __typename: "ModelPostEditorConnection",
      items:  Array< {
        __typename: "PostEditor",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    owner: string | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser:  {
    __typename: "User",
    id: string,
    username: string,
    posts:  {
      __typename: "ModelPostEditorConnection",
      items:  Array< {
        __typename: "PostEditor",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    owner: string | null,
  } | null,
};

export type CreateCommentMutationVariables = {
  input: CreateCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type CreateCommentMutation = {
  createComment:  {
    __typename: "Comment",
    id: string,
    content: string | null,
    post:  {
      __typename: "Post",
      id: string,
      title: string,
      image:  {
        __typename: "S3Object",
        key: string,
        identityId: string | null,
        level: string | null,
      } | null,
      editors:  {
        __typename: "ModelPostEditorConnection",
        nextToken: string | null,
      } | null,
      blog:  {
        __typename: "Blog",
        id: string,
        name: string,
      } | null,
      owner: string | null,
      comments:  {
        __typename: "ModelCommentConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type UpdateCommentMutationVariables = {
  input: UpdateCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type UpdateCommentMutation = {
  updateComment:  {
    __typename: "Comment",
    id: string,
    content: string | null,
    post:  {
      __typename: "Post",
      id: string,
      title: string,
      image:  {
        __typename: "S3Object",
        key: string,
        identityId: string | null,
        level: string | null,
      } | null,
      editors:  {
        __typename: "ModelPostEditorConnection",
        nextToken: string | null,
      } | null,
      blog:  {
        __typename: "Blog",
        id: string,
        name: string,
      } | null,
      owner: string | null,
      comments:  {
        __typename: "ModelCommentConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type DeleteCommentMutationVariables = {
  input: DeleteCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type DeleteCommentMutation = {
  deleteComment:  {
    __typename: "Comment",
    id: string,
    content: string | null,
    post:  {
      __typename: "Post",
      id: string,
      title: string,
      image:  {
        __typename: "S3Object",
        key: string,
        identityId: string | null,
        level: string | null,
      } | null,
      editors:  {
        __typename: "ModelPostEditorConnection",
        nextToken: string | null,
      } | null,
      blog:  {
        __typename: "Blog",
        id: string,
        name: string,
      } | null,
      owner: string | null,
      comments:  {
        __typename: "ModelCommentConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type ListBlogsQueryVariables = {
  filter?: ModelBlogFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListBlogsQuery = {
  listBlogs:  {
    __typename: "ModelBlogConnection",
    items:  Array< {
      __typename: "Blog",
      id: string,
      name: string,
      posts:  {
        __typename: "ModelPostConnection",
        nextToken: string | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetBlogQueryVariables = {
  id: string,
};

export type GetBlogQuery = {
  getBlog:  {
    __typename: "Blog",
    id: string,
    name: string,
    posts:  {
      __typename: "ModelPostConnection",
      items:  Array< {
        __typename: "Post",
        id: string,
        title: string,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type ListPostsQueryVariables = {
  filter?: ModelPostFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPostsQuery = {
  listPosts:  {
    __typename: "ModelPostConnection",
    items:  Array< {
      __typename: "Post",
      id: string,
      title: string,
      image:  {
        __typename: "S3Object",
        key: string,
        identityId: string | null,
        level: string | null,
      } | null,
      editors:  {
        __typename: "ModelPostEditorConnection",
        nextToken: string | null,
      } | null,
      blog:  {
        __typename: "Blog",
        id: string,
        name: string,
      } | null,
      owner: string | null,
      comments:  {
        __typename: "ModelCommentConnection",
        nextToken: string | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetPostQueryVariables = {
  id: string,
};

export type GetPostQuery = {
  getPost:  {
    __typename: "Post",
    id: string,
    title: string,
    image:  {
      __typename: "S3Object",
      key: string,
      identityId: string | null,
      level: string | null,
    } | null,
    editors:  {
      __typename: "ModelPostEditorConnection",
      items:  Array< {
        __typename: "PostEditor",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    blog:  {
      __typename: "Blog",
      id: string,
      name: string,
      posts:  {
        __typename: "ModelPostConnection",
        nextToken: string | null,
      } | null,
    } | null,
    owner: string | null,
    comments:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        content: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      username: string,
      posts:  {
        __typename: "ModelPostEditorConnection",
        nextToken: string | null,
      } | null,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser:  {
    __typename: "User",
    id: string,
    username: string,
    posts:  {
      __typename: "ModelPostEditorConnection",
      items:  Array< {
        __typename: "PostEditor",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    owner: string | null,
  } | null,
};

export type GetCommentQueryVariables = {
  id: string,
};

export type GetCommentQuery = {
  getComment:  {
    __typename: "Comment",
    id: string,
    content: string | null,
    post:  {
      __typename: "Post",
      id: string,
      title: string,
      image:  {
        __typename: "S3Object",
        key: string,
        identityId: string | null,
        level: string | null,
      } | null,
      editors:  {
        __typename: "ModelPostEditorConnection",
        nextToken: string | null,
      } | null,
      blog:  {
        __typename: "Blog",
        id: string,
        name: string,
      } | null,
      owner: string | null,
      comments:  {
        __typename: "ModelCommentConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type ListCommentsQueryVariables = {
  filter?: ModelCommentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCommentsQuery = {
  listComments:  {
    __typename: "ModelCommentConnection",
    items:  Array< {
      __typename: "Comment",
      id: string,
      content: string | null,
      post:  {
        __typename: "Post",
        id: string,
        title: string,
        owner: string | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateBlogSubscription = {
  onCreateBlog:  {
    __typename: "Blog",
    id: string,
    name: string,
    posts:  {
      __typename: "ModelPostConnection",
      items:  Array< {
        __typename: "Post",
        id: string,
        title: string,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnUpdateBlogSubscription = {
  onUpdateBlog:  {
    __typename: "Blog",
    id: string,
    name: string,
    posts:  {
      __typename: "ModelPostConnection",
      items:  Array< {
        __typename: "Post",
        id: string,
        title: string,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnDeleteBlogSubscription = {
  onDeleteBlog:  {
    __typename: "Blog",
    id: string,
    name: string,
    posts:  {
      __typename: "ModelPostConnection",
      items:  Array< {
        __typename: "Post",
        id: string,
        title: string,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnCreatePostSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreatePostSubscription = {
  onCreatePost:  {
    __typename: "Post",
    id: string,
    title: string,
    image:  {
      __typename: "S3Object",
      key: string,
      identityId: string | null,
      level: string | null,
    } | null,
    editors:  {
      __typename: "ModelPostEditorConnection",
      items:  Array< {
        __typename: "PostEditor",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    blog:  {
      __typename: "Blog",
      id: string,
      name: string,
      posts:  {
        __typename: "ModelPostConnection",
        nextToken: string | null,
      } | null,
    } | null,
    owner: string | null,
    comments:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        content: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnUpdatePostSubscriptionVariables = {
  owner?: string | null,
  editors?: string | null,
};

export type OnUpdatePostSubscription = {
  onUpdatePost:  {
    __typename: "Post",
    id: string,
    title: string,
    image:  {
      __typename: "S3Object",
      key: string,
      identityId: string | null,
      level: string | null,
    } | null,
    editors:  {
      __typename: "ModelPostEditorConnection",
      items:  Array< {
        __typename: "PostEditor",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    blog:  {
      __typename: "Blog",
      id: string,
      name: string,
      posts:  {
        __typename: "ModelPostConnection",
        nextToken: string | null,
      } | null,
    } | null,
    owner: string | null,
    comments:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        content: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnDeletePostSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeletePostSubscription = {
  onDeletePost:  {
    __typename: "Post",
    id: string,
    title: string,
    image:  {
      __typename: "S3Object",
      key: string,
      identityId: string | null,
      level: string | null,
    } | null,
    editors:  {
      __typename: "ModelPostEditorConnection",
      items:  Array< {
        __typename: "PostEditor",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    blog:  {
      __typename: "Blog",
      id: string,
      name: string,
      posts:  {
        __typename: "ModelPostConnection",
        nextToken: string | null,
      } | null,
    } | null,
    owner: string | null,
    comments:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        content: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnCreatePostEditorSubscriptionVariables = {
  editors?: string | null,
};

export type OnCreatePostEditorSubscription = {
  onCreatePostEditor:  {
    __typename: "PostEditor",
    id: string,
    post:  {
      __typename: "Post",
      id: string,
      title: string,
      image:  {
        __typename: "S3Object",
        key: string,
        identityId: string | null,
        level: string | null,
      } | null,
      editors:  {
        __typename: "ModelPostEditorConnection",
        nextToken: string | null,
      } | null,
      blog:  {
        __typename: "Blog",
        id: string,
        name: string,
      } | null,
      owner: string | null,
      comments:  {
        __typename: "ModelCommentConnection",
        nextToken: string | null,
      } | null,
    },
    editor:  {
      __typename: "User",
      id: string,
      username: string,
      posts:  {
        __typename: "ModelPostEditorConnection",
        nextToken: string | null,
      } | null,
      owner: string | null,
    },
  } | null,
};

export type OnUpdatePostEditorSubscriptionVariables = {
  editors?: string | null,
};

export type OnUpdatePostEditorSubscription = {
  onUpdatePostEditor:  {
    __typename: "PostEditor",
    id: string,
    post:  {
      __typename: "Post",
      id: string,
      title: string,
      image:  {
        __typename: "S3Object",
        key: string,
        identityId: string | null,
        level: string | null,
      } | null,
      editors:  {
        __typename: "ModelPostEditorConnection",
        nextToken: string | null,
      } | null,
      blog:  {
        __typename: "Blog",
        id: string,
        name: string,
      } | null,
      owner: string | null,
      comments:  {
        __typename: "ModelCommentConnection",
        nextToken: string | null,
      } | null,
    },
    editor:  {
      __typename: "User",
      id: string,
      username: string,
      posts:  {
        __typename: "ModelPostEditorConnection",
        nextToken: string | null,
      } | null,
      owner: string | null,
    },
  } | null,
};

export type OnDeletePostEditorSubscriptionVariables = {
  editors?: string | null,
};

export type OnDeletePostEditorSubscription = {
  onDeletePostEditor:  {
    __typename: "PostEditor",
    id: string,
    post:  {
      __typename: "Post",
      id: string,
      title: string,
      image:  {
        __typename: "S3Object",
        key: string,
        identityId: string | null,
        level: string | null,
      } | null,
      editors:  {
        __typename: "ModelPostEditorConnection",
        nextToken: string | null,
      } | null,
      blog:  {
        __typename: "Blog",
        id: string,
        name: string,
      } | null,
      owner: string | null,
      comments:  {
        __typename: "ModelCommentConnection",
        nextToken: string | null,
      } | null,
    },
    editor:  {
      __typename: "User",
      id: string,
      username: string,
      posts:  {
        __typename: "ModelPostEditorConnection",
        nextToken: string | null,
      } | null,
      owner: string | null,
    },
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateUserSubscription = {
  onCreateUser:  {
    __typename: "User",
    id: string,
    username: string,
    posts:  {
      __typename: "ModelPostEditorConnection",
      items:  Array< {
        __typename: "PostEditor",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    owner: string | null,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser:  {
    __typename: "User",
    id: string,
    username: string,
    posts:  {
      __typename: "ModelPostEditorConnection",
      items:  Array< {
        __typename: "PostEditor",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    owner: string | null,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser:  {
    __typename: "User",
    id: string,
    username: string,
    posts:  {
      __typename: "ModelPostEditorConnection",
      items:  Array< {
        __typename: "PostEditor",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    owner: string | null,
  } | null,
};

export type OnCreateCommentSubscription = {
  onCreateComment:  {
    __typename: "Comment",
    id: string,
    content: string | null,
    post:  {
      __typename: "Post",
      id: string,
      title: string,
      image:  {
        __typename: "S3Object",
        key: string,
        identityId: string | null,
        level: string | null,
      } | null,
      editors:  {
        __typename: "ModelPostEditorConnection",
        nextToken: string | null,
      } | null,
      blog:  {
        __typename: "Blog",
        id: string,
        name: string,
      } | null,
      owner: string | null,
      comments:  {
        __typename: "ModelCommentConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type OnUpdateCommentSubscription = {
  onUpdateComment:  {
    __typename: "Comment",
    id: string,
    content: string | null,
    post:  {
      __typename: "Post",
      id: string,
      title: string,
      image:  {
        __typename: "S3Object",
        key: string,
        identityId: string | null,
        level: string | null,
      } | null,
      editors:  {
        __typename: "ModelPostEditorConnection",
        nextToken: string | null,
      } | null,
      blog:  {
        __typename: "Blog",
        id: string,
        name: string,
      } | null,
      owner: string | null,
      comments:  {
        __typename: "ModelCommentConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type OnDeleteCommentSubscription = {
  onDeleteComment:  {
    __typename: "Comment",
    id: string,
    content: string | null,
    post:  {
      __typename: "Post",
      id: string,
      title: string,
      image:  {
        __typename: "S3Object",
        key: string,
        identityId: string | null,
        level: string | null,
      } | null,
      editors:  {
        __typename: "ModelPostEditorConnection",
        nextToken: string | null,
      } | null,
      blog:  {
        __typename: "Blog",
        id: string,
        name: string,
      } | null,
      owner: string | null,
      comments:  {
        __typename: "ModelCommentConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};
