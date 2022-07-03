import Link from "next/link";
import { IMetaData } from "@apis/Posts";

export default function SeriesList({
	metaDataWithTitle,
}: {
	metaDataWithTitle: {
		fileName: string;
		metaData: IMetaData;
	}[];
}) {
	return (
		<div>
			{metaDataWithTitle.map((data) => (
				<div className="flex my-4 space-x-4 rounded-md shadow-md">
					<img
						className="w-28 h-28 rounded-md"
						src={data.metaData.cover_image}
						alt=""
					/>
					<div className="mx-2 pb-1 flex flex-col justify-between w-full">
						<div>
							<h3 className="text-lg font-bold">
								<Link href={`/post/${data.fileName}`}>
									<a>{data.metaData.title}</a>
								</Link>
							</h3>
							<p className="text-sm mt-2 text-gray-700">
								{data.metaData.excerpt}
							</p>
						</div>
						<ul className="flex border-t-2 pt-1 border-gray-200 w-full">
							{data.metaData.tag.map((t) => (
								<li key={t} className="text-gray-400 mx-1 text-xs">
									{t}
								</li>
							))}
						</ul>
					</div>
				</div>
			))}
		</div>
	);
}
