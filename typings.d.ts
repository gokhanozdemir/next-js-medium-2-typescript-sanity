export interface PostTypeInterface {
  _id: string;
  _createdAt: string;
  title: string;
  author: {
    name: string;
    image: string;
  };
  comments: PostandCommentTypeInterface[];
  description: string;
  mainImage: {
    asset: {
      url: string;
    };
  };
  slug: { current: string };
  body: [object];
}

export interface PostandCommentTypeInterface {
  approved: boolean;
  comment: string;
  email: string;
  name: string;
  post: {
    _ref: string;
    type: string;
  };
  _id: string;
  _createdAt: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
}
