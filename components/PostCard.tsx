import Link from "next/link";
import { IPost } from "@apis/Posts";

export default function PostCard({ post }: { post: IPost }) {
	return (
		<div className="flex my-4 space-x-4 rounded-md shadow-md">
			<img
				className="w-28 h-28 rounded-md"
				src={post.metaData.cover_image}
				alt=""
			/>
			<div className="mx-2 pb-1 flex flex-col justify-between w-full">
				<div>
					<h3 className="text-lg font-bold">
						<Link href={`/post/${post.slug}`}>{post.metaData.title}</Link>
					</h3>
					<p className="text-sm mt-2 text-gray-700">{post.metaData.excerpt}</p>
				</div>
				<ul className="flex border-t-2 pt-1 border-gray-200 w-full">
					{post.metaData.tag.map((t) => (
						<li key={t} className="text-gray-400 mx-1 text-xs">
							{t}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
