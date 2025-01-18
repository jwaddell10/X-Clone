import useFetchPosts from "../../helpers/useFetchPosts";
import "../../Styles/DisplayPost.css";

export default function DisplayPost() {
	const { posts } = useFetchPosts();

	return (
		<div>
			{posts &&
				posts.map((item) => (
					<ul className="display-post-container" key={item.id}>
						<li>{item.author.name}</li>
						<li>{item.createdAt}</li>
						<li>{item.text}</li>
					</ul>
				))}
		</div>
	);
}
