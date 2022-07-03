import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "@components/Layout";
import SeriesList from "@components/SeriesList";
import { IMetaData } from "@apis/Posts";

export default function SeriesPage({
	metaDataWithTitle,
}: {
	metaDataWithTitle: {
		fileName: string;
		metaData: IMetaData;
	}[];
}) {
	return (
		<Layout title="Seires List" canGoBack={true} hasTabBar={true}>
			<div className="mx-4">
				<SeriesList metaDataWithTitle={metaDataWithTitle} />
			</div>
		</Layout>
	);
}
export const getStaticProps: GetStaticProps = ({ params }) => {
	const { series } = params as { series: string };

	const files = fs.readdirSync(path.join("posts"));

	const metaDataWithTitle = files
		.map((fileName) => {
			const data = fs.readFileSync(path.join("posts", fileName), {
				encoding: "utf-8",
			});

			const { data: metaData } = matter(data);

			if (metaData.series === series) {
				return {
					fileName: fileName.split(".mdx")[0],
					metaData,
				};
			}
		})
		.filter((e) => e);

	return {
		props: {
			metaDataWithTitle,
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
