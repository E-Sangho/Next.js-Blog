import Link from "next/link";
import Image from "next/image";
import { IPost } from "@apis/Posts";

export default function PostCard({ post }: { post: IPost }) {
	return (
		<div className="flex my-4 space-x-4 rounded-md shadow-md bg-slate-900">
			<Image
				className="w-28 h-28 rounded-md"
				src={post.metaData.cover_image}
				alt=""
			/>
			<div className="mx-2 pb-1 flex flex-col justify-between w-full">
				<div>
					<h3 className="text-lg font-bold text-gray-200">
						<Link href={`/post/${post.slug}`}>{post.metaData.title}</Link>
					</h3>
					<p className="text-sm mt-2 text-gray-500">{post.metaData.excerpt}</p>
				</div>
				<ul className="flex border-t-2 pt-1 border-gray-700 w-full">
					{post.metaData.tag.map((t) => (
						<li key={t} className="text-indigo-600 mx-1 text-xs">
							#{t}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
