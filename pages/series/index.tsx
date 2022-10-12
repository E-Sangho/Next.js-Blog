import { GetStaticPaths, GetStaticProps } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Layout from "@components/Layout";
import { IMetaData } from "@apis/Posts";
import SeriesCard from "@components/SeriesCard";

interface ISeriesPage {
	series: IMetaData[];
}

export default function SeriesPage({ series }: ISeriesPage) {
	return (
		<Layout title="Series" hasTabBar={true}>
			<div className="mx-4">
				{series.map((metaData) => (
					<SeriesCard key={metaData.series} metaData={metaData} />
				))}
			</div>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = () => {
	const files = fs.readdirSync(path.join("posts"));

	let seriesSet = new Set();

	const series = files
		.map((fileName) => {
			const data = fs.readFileSync(path.join("posts", fileName));

			const { data: metaData } = matter(data);

			if (metaData?.series && !seriesSet.has(metaData.series)) {
				seriesSet.add(metaData.series);

				return metaData;
			}
		})
		.filter((e) => e);

	// `object` ("[object Date]") cannot be serialized as JSON. Please only return JSON serializable data types.
	// metaData로 반환하니 JSON 형태로 반환되지 않는 문제가 있는듯 하다.
	// 그래서 JSON.stringify를 사용했다.
	return {
		props: {
			series: JSON.parse(JSON.stringify(series)),
		},
	};
};
