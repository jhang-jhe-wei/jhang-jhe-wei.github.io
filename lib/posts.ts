import grayMatter from 'gray-matter';
import { promises as fs } from 'fs';
import path from 'path';
import {remark} from 'remark';
import strip from 'strip-markdown';

import { genQuery, genLinkProps, parseQuery } from './postQuery';

export interface Post {
  filename: string;
  slug: string;
  options: {
    title: string;
    createdAt: string;
    tags?: string[];
    description?: string;
  };
  content: string;
}

const POSTS_DIR_PATH = 'posts/';
const POSTS_PER_PAGE = 6;
const POST_FILE_REGEX = /^(.+)\.md$/;

const postsDir = path.join(process.cwd(), POSTS_DIR_PATH);

const extractPost = async filename => {
  const fileContent = await fs.readFile(
    path.join(postsDir, filename),
    'utf8',
  );
  const { data, content } = grayMatter(fileContent);

  return {
    options: data as Post["options"],
    content,
  };
};

const postToCreatedAt = post => new Date(post.options.createdAt).getTime();

const withCache = process.env.NODE_ENV === 'development' ? (f => f) : (fn => {
  let cache;
  return async () => {
    if (cache) return cache;
    cache = fn();
    return cache;
  };
});

export const filenames = withCache(() => fs.readdir(postsDir));

export const all: () => Post[] = withCache(async () => {
  const posts = await Promise.all(
    (await filenames()).map(
      filename => filename.match(POST_FILE_REGEX),
    ).flatMap(
      match => (match ? [{ filename: match[0], slug: match[1] }] : []),
    ).map(async post => {
      const { options, content } = await extractPost(post.filename);
      remark()
        .use(strip)
        .process(content.replace(/(<([^>]+)>)/gi, ""))
        .then((file) => {
          console.log(String(file))
          options.description = String(file)
        })

      return { ...post, options };
    }),
  );

  return posts.sort(
    (post1, post2) => postToCreatedAt(post2) - postToCreatedAt(post1),
  );
});

export const totalPages: () => number = withCache(async () => Math.ceil((await filenames()).length / POSTS_PER_PAGE));

export const page = async (p: number) => {
  const posts = await all();
  return posts.slice(
    p * POSTS_PER_PAGE,
    (p + 1) * POSTS_PER_PAGE,
  );
};

export const postDetail = async (slug: string) => {
  const filename = `${slug}.md`;
  const { options, content } = await extractPost(filename);
  return { slug, filename, options, content };
};

export const genIndexPaths = async (locales: string[]) => {
  const paths = [];
  const pages = await totalPages();
  for (const locale of locales) {
    for (let page = 1; page <= pages; page++) {
      paths.push({ params: { page: page.toString() }, locale });
    }
  }
  return paths;
};

export { genQuery, genLinkProps, parseQuery };
