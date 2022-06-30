import { GetStaticPaths, GetStaticProps } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

export default function SeriesPage({ series }: { series: string[] }) {
	return (
		<ul>
			{series.map((seriesName) => (
				<Link href={`/series/${seriesName}`}>
					<a key={seriesName}>{seriesName}</a>
				</Link>
			))}
		</ul>
	);
}
export const getStaticProps: GetStaticProps = () => {
	const files = fs.readdirSync(path.join("posts"));

	const series = Array.from(
		new Set(
			files.map((fileName) => {
				const data = fs.readFileSync(path.join("posts", fileName));

				const { data: metaData } = matter(data);

				return metaData.series;
			})
		)
	);

	return {
		props: {
			series,
		},
	};
};
