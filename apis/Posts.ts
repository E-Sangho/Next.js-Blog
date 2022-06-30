import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
const POSTS_PATH = path.join(process.cwd(), "posts");

// Post functions
const getPosts = () => {
	const files = fs.readdirSync(path.join("posts"));

	const posts = files.map((fileName) => {
		const data = fs.readFileSync(path.join(POSTS_PATH, fileName), {
			encoding: "utf-8",
		});

		const { data: metaData } = matter(data);

		metaData.date = new Date(metaData.date).toUTCString().slice(0, -4);

		const slug = fileName.split(".mdx")[0];

		return {
			slug,
			metaData,
		};
	});

	return posts.filter((post) => post.metaData.draft === true);
};

const getPostBySlug = (slug: string) => {
	const data = fs.readFileSync(path.join(POSTS_PATH, `${slug}.mdx`), {
		encoding: "utf-8",
	});

	return matter(data);
};

const createPath = () => {
	const files = fs.readdirSync(POSTS_PATH);

	return files.map((fileName) => {
		const slug = fileName.split(".mdx")[0];

		return {
			params: {
				slug,
			},
		};
	});
};

// Interfaces
export interface IMetaData {
	title: string;
	date: string;
	category: string;
	tag: string[];
	series: string;
	excerpt: string;
	cover_image: string;
}

export interface IPost {
	slug: string;
	metaData: IMetaData;
}

export interface MDXPost {
	source: MDXRemoteSerializeResult<Record<string, unknown>>;
	metaData: IMetaData;
}

export { getPosts, getPostBySlug, createPath };
