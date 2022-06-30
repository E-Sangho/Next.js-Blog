import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";

export default function SeriesPage({ list }: { list: string[] }) {
	return (
		<div>
			{list.map((name) => (
				<Link href={`/post/${name}`}>
					<a>{name}</a>
				</Link>
			))}
		</div>
	);
}
export const getStaticProps: GetStaticProps = ({ params }) => {
	const { series } = params as { series: string };

	const files = fs.readdirSync(path.join("posts"));

	const list = files
		.map((fileName) => {
			const data = fs.readFileSync(path.join("posts", fileName), {
				encoding: "utf-8",
			});

			const { data: metaData } = matter(data);

			if (metaData.series === series) {
				return fileName.split(".mdx")[0];
			}

			return "";
		})
		.filter((name) => name !== "");

	return {
		props: {
			list,
		},
	};
};

export const getStaticPaths: GetStaticPaths = () => {
	const files = fs.readdirSync(path.join("posts"));

	const series = Array.from(
		new Set(
			files.map((fileName) => {
				const data = fs.readFileSync(path.join("posts", fileName), {
					encoding: "utf-8",
				});

				const { data: metaData } = matter(data);

				return metaData.series;
			})
		)
	);

	const paths = series.map((seriesName) => {
		return {
			params: {
				series: seriesName,
			},
		};
	});

	return {
		paths,
		fallback: false,
	};
};
