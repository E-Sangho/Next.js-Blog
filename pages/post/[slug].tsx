import { GetStaticPaths, GetStaticProps } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { MDXPost, getPostBySlug, createPath } from "@apis/Posts";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import "highlight.js/styles/base16/dracula.css";
import rehypeHighlight from "rehype-highlight";
import React from "react";
import Layout from "@components/Layout";
import Components from "@components/PostComponents";

export default function PostPage({ post }: { post: MDXPost }) {
	const components = Components;
	return (
		<Layout title={post.metaData.title} canGoBack={true}>
			<h1>{post.metaData.title}</h1>
			<div className="prose">
				<MDXRemote {...post.source} components={components} />
			</div>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { slug } = params as { slug: string };

	const { content, data: metaData } = getPostBySlug(slug);

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
	const paths = createPath();

	return {
		paths,
		fallback: false,
	};
};
