import { IMetaData } from "@apis/Posts";
import Link from "next/link";

interface ISeriesPage {
	metaData: IMetaData;
}
export default function SeriesCard({ metaData }: ISeriesPage) {
	return (
		<div className="flex my-4 space-x-4 rounded-md shadow-md">
			<img className="w-28 h-28 rounded-md" src={metaData.cover_image} alt="" />
			<div className="mx-2 pb-1 flex flex-col justify-between w-full">
				<div>
					<h3 className="text-lg font-bold">
						<Link href={`/series/${metaData.series}`}>{metaData.title}</Link>
					</h3>
					<p className="text-sm mt-2 text-gray-700">{metaData.excerpt}</p>
				</div>
				<ul className="flex border-t-2 pt-1 border-gray-200 w-full">
					{metaData.tag.map((t) => (
						<li key={t} className="text-gray-400 mx-1 text-xs">
							{t}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
