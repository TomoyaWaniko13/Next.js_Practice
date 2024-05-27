import { defineDocumentType, makeSource } from 'contentlayer/source-files';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `blog/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
    },
    date: {
      type: 'date',
      required: true,
    },
    published: {
      type: 'boolean',
      default: true,
    },
    image: {
      type: 'string',
      required: true,
    },
    authors: {
      // Add this line
      type: 'list',
      of: {
        type: 'string',
      },
    },
  },
  computedFields: {
    // のフィールドは、ドキュメントのファイルパスから計算されます。具体的には、doc._raw.flattenedPath の
    // 値の前にスラッシュ(/)を追加します。例えば、もし doc._raw.flattenedPath の値が blog/my-first-post
    // であれば、slug の値は /blog/my-first-post になります。
    slug: {
      type: 'string',
      resolve: (doc) => `/${doc._raw.flattenedPath}`,
    },
    // このフィールドも、ドキュメントのファイルパスから計算されます。具体的には、doc._raw.flattenedPath の
    // 値をスラッシュ(/)で分割し、最初の要素を削除した後の最初の要素を取得します。例えば、もし doc._raw.flattenedPath の
    // 値が blog/my-first-post であれば、slugIdentifier の値は my-first-post になります。
    slugIdentifier: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.split('/')[1],
    },
  },
}));

export default makeSource({
  contentDirPath: './content',
  documentTypes: [Post],
});
