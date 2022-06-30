import { GetStaticPaths, GetStaticProps } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { MDXPost, getPostBySlug, createPath } from "@apis/Posts";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import "highlight.js/styles/base16/dracula.css";
import rehypeHighlight from "rehype-highlight";
import React from "react";

const Paragraph: React.FC<any> = (props) => {
	return <p className="text-blue-400" {...props} />;
};

const components: import("mdx/types").MDXComponents = {
	h1: (props) => <h1 className="text-orange-500" {...props} />,
	p: (props) => <Paragraph {...props} />,
};

export default function PostPage({ post }: { post: MDXPost }) {
	return (
		<div>
			<h1>{post.metaData.title}</h1>
			<MDXRemote {...post.source} components={components} />
		</div>
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
