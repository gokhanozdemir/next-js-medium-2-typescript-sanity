import { GetStaticProps } from "next"
import Header from "../../components/Header"
import { sanityClient, urlFor } from "../../sanity"
import { PostTypeInterface } from "../../typings"

interface Props {
	post: [PostTypeInterface]
}


function Post({ post }: Props) {
	console.log(post)
	return (
		<main>
			<Header />
		</main>
	)
}

export default Post

// Get a list of slugs
export const getStaticPaths = async () => {
	const query = `*[_type == "post"] 
					{
						_id,
					slug {
						current
						}
					}`
	const posts = await sanityClient.fetch(query);

	const paths = posts.map((post: PostTypeInterface) => ({
		params: {
			slug: post.slug.current
		}
	}))

	return {
		paths,
		fallback: "blocking",
	}

}

// Get details of each page with that slug
export const getStaticProps: GetStaticProps = async ({ params }) => {
	const query = `*[_type == "post" && slug.current == $slug][0] {
			_id,
			_createdAt,
			title,
			author -> {
				name,
				image
				},
				'comments': *[
					_type == "comment" &&
					post._ref == ^._id &&
					approved == true
				],
			slug,
			description,
			mainImage,
			body
			}`

	const post = await sanityClient.fetch(query, {
		slug: params?.slug,
	})

	if (!post) {
		return {
			notFound: true
		}
	} else {
		return {
			props: {
				post,
			},
			revalidate: 60, // after 60 secs it will update the details page again
		}
	}
}