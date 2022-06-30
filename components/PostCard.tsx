import Link from "next/link";
import { IPost } from "@apis/Posts";

export default function PostCard({ post }: { post: IPost }) {
	return (
		<div>
			<img className="w-24 h-24" src={post.metaData.cover_image} alt="" />
			<h3>
				<Link href={`/post/${post.slug}`}>{post.metaData.title}</Link>
			</h3>
			<p>{post.metaData.excerpt}</p>
			<ul>
				{post.metaData.tag.map((t) => (
					<li key={t}>{t}</li>
				))}
			</ul>
		</div>
	);
}
