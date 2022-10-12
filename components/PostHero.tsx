import { IMetaData } from "@apis/Posts";
import Image from "next/image";

interface IPostHero {
	metaData: IMetaData;
}

export default function PostHero({ metaData }: IPostHero) {
	return (
		<div className="mb-8 mt-4 mx-4">
			<h1 className="text-2xl font-bold leading-tight text-zinc-200">
				{metaData.title}
			</h1>
			<p className="text-gray-500 text-sm text-end">
				on
				<time dateTime={metaData.date}> {metaData.date.slice(0, -9)}</time>
			</p>
			<div className="w-full text-center relative shadow-md mt-4">
				<Image
					className="w-full h-40 object-cover rounded-md"
					src={metaData.cover_image}
					alt=""
					layout="fill"
				/>
			</div>
		</div>
	);
}
