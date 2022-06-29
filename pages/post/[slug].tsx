import { GetStaticPaths, GetStaticProps } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { IMetaData } from "../index";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import "highlight.js/styles/base16/dracula.css";
import rehypeHighlight from "rehype-highlight";
import React from "react";

interface MDXPost {
	source: MDXRemoteSerializeResult<Record<string, unknown>>;
	metaData: IMetaData;
}

const Paragraph = ({ children }: { children: React.ReactNode }) => {
	return <p className="text-orange-500">{children}</p>;
};

// const components: MDXComponent= { p: (props) => <Paragraph variant="p" {...props} /> }

export default function PostPage({ post }: { post: MDXPost }) {
	return (
		<div>
			<h1>{post.metaData.title}</h1>
			<MDXRemote {...post.source} components={{ Paragraph }} />
		</div>
	);
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { slug } = params as { slug: string };

	const data = fs.readFileSync(path.join("posts", `${slug}.mdx`), {
		encoding: "utf-8",
	});

	const { content, data: metaData } = matter(data);

	const mdxSource = await serialize(content, {
		mdxOptions: {
			rehypePlugins: [
				rehypeSlug,
				[
					rehypeAutolinkHeadings,
					{
						behavior: "wrap",
					},
				],
				rehypeHighlight,
			],
		},
	});
	return {
		props: {
			post: {
				source: mdxSource,
				metaData,
			},
		},
	};
};

export const getStaticPaths: GetStaticPaths = () => {
	const files = fs.readdirSync(path.join("posts"));

	const paths = files.map((fileName) => {
		const slug = fileName.split(".mdx")[0];

		return {
			params: {
				slug,
			},
		};
	});

	return {
		paths,
		fallback: false,
	};
};
