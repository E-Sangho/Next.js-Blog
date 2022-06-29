import type { GetStaticProps, NextPage } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import PostCard from "../components/PostCard";

const Home = ({ posts }: { posts: IPost[] }) => {
	return (
		<div>
			{posts.map((post) => (
				<PostCard key={post.slug} post={post} />
			))}
		</div>
	);
};

export default Home;

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

export const getStaticProps: GetStaticProps = () => {
	const files = fs.readdirSync(path.join("posts"));

	const posts = files.map((fileName) => {
		const data = fs.readFileSync(path.join("posts", fileName), {
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

	return {
		props: {
			posts: posts.sort((a, b) => {
				return b.metaData.date - a.metaData.date;
			}),
		},
	};
};
