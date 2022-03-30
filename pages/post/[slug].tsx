import { GetStaticProps } from "next"
import Header from "../../components/Header"
import { sanityClient, urlFor } from "../../sanity"
import { PostTypeInterface } from "../../typings"

interface Props {
	post: PostTypeInterface
}


function Post({ post }: Props) {
	// console.log(post)
	return (
		<main>
			<Header />

			<img className="w-full h-40 object-cover" src={urlFor(post.mainImage).url()!} alt={post.title} />

			<article className="max-w-3xl mx-auto p-5">
				<h1 className="text-3xl mt-10 mb-3 ">{post.title}</h1>
				<h2 className="text-xl font-light text-gray-500 mb-2">{post.description}</h2>

				<div className="flex items-center space-x-2">
					<img className="h-10 w-10 rounded-full" src={urlFor(post.author.image).url()!} alt={post.author.name} />
					<p className="font-extralight text-sm">Blog post by <span className="text-green-600">{post.author.name}</span> - Published at {new Date(post._createdAt).toLocaleString('tr-TR')}</p>
				</div>

			</article>

		</main >

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