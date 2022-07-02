import { IMetaData } from "@apis/Posts";

interface IPostHero {
	metaData: IMetaData;
}

export default function PostHero({ metaData }: IPostHero) {
	return (
		<div className="mb-16 mt-8">
			<div className="w-full text-center relative">
				<img
					className="w-full h-40 object-cover"
					src={metaData.cover_image}
					alt=""
				/>
				<h1 className="text-2xl font-bold leading-tight relative -top-24 left-1/2 -translate-x-1/2 text-gray-200">
					{metaData.title}
				</h1>
				<p className="text-gray-500 teext-base text-end">
					on
					<time dateTime={metaData.date}> {metaData.date.slice(0, -9)}</time>
				</p>
			</div>
		</div>
	);
}
