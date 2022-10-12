import Link from "next/link";
import { IMetaData } from "@apis/Posts";
import Image from "next/image";

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
				<div
					key={data.metaData.title}
					className="flex my-4 space-x-4 rounded-md shadow-md"
				>
					<Image
						className="w-28 h-28 rounded-md"
						src={data.metaData.cover_image}
						alt=""
						width={112}
						height={112}
					/>
					<div className="mx-2 pb-1 flex flex-col justify-between w-full">
						<div>
							<h3 className="text-lg font-bold text-gray-200">
								<Link href={`/post/${data.fileName}`}>
									<a>{data.metaData.title}</a>
								</Link>
							</h3>
							<p className="text-sm mt-2 text-gray-500">
								{data.metaData.excerpt}
							</p>
						</div>
						<ul className="flex border-t-2 pt-1 border-gray-700 w-full">
							{data.metaData.tag.map((t) => (
								<li key={t} className="text-indigo-600 mx-1 text-xs">
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
