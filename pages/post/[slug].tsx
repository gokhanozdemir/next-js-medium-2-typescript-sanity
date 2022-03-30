import { GetStaticProps } from "next"
import Header from "../../components/Header"
import { sanityClient, urlFor } from "../../sanity"
import { PostTypeInterface } from "../../typings"
import PortableText from "react-portable-text"
import { useForm, SubmitHandler } from "react-hook-form"

interface commentTypeInterface {
	_id: string
	name: string
	email: string
	comment: string
}

interface Props {
	post: PostTypeInterface
}


function Post({ post }: Props) {
	// console.log(post)

	// How we connect to our comment form
	const { register, handleSubmit, formState: { errors } } = useForm<commentTypeInterface>()


	let onSubmit: SubmitHandler<commentTypeInterface> = async (data) => {
		console.log(data)
		console.log(errors)
	}

	return (
		<main>
			<Header />

			<img className="w-full h-40 object-cover" src={urlFor(post.mainImage).url()!} alt={post.title} />

			<article className="max-w-3xl mx-auto p-5">
				<h1 className="text-3xl mt-10 mb-3 ">{post.title}</h1>
				<h2 className="text-xl font-light text-gray-500 mb-2">{post.description}</h2>

				<div className="flex items-center space-x-2 my-4">
					<img className="h-10 w-10 rounded-full" src={urlFor(post.author.image).url()!} alt={post.author.name} />
					<p className="font-extralight text-sm">Blog post by <span className="text-green-600">{post.author.name}</span> - Published at {new Date(post._createdAt).toLocaleString('tr-TR')}</p>
				</div>

				<div className="">
					<PortableText
						className=""
						dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
						projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
						content={post.body}
						serializers={{
							h2: (props: any) => {
								return <h2 className="text-2xl font-bold my-5" {...props} />
							},
							h3: (props: any) => {
								return <h3 className="text-xl font-bold my-5" {...props} />
							},
							li: ({ children }: any) => {
								<li className="text-xl font-bold my-5" >{children}</li>
							},
							link: ({ href, children }: any) => {
								<a href={href} className="text-blue-500 hover:underline" >{children}</a>
							},
						}}
					/>
				</div>


			</article>

			<hr className="max-w-lg my-5 mx-auto border border-yellow-500" />
			<h3 className="text-sm text-yellow-500">Enjoyed this article?</h3>
			<h4 className="text-3xl font-bold">Leave a comment below!</h4>
			<hr className="py-3 mt-2" />

			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-5 max-w-2xl mx-auto mb-10">

				<input {...register("_id")} type="hidden" name="_id" value={post._id} />

				<label className="block mb-5">
					<span className="text-gray-700">Name</span>
					<input {...register("name", { required: true })} className="shadow border rounded p-2 mt-2 form-input block w-full  focus:outline-none focus:ring-2 ring-offset-2 ring-yellow-500 invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
						type="text" placeholder="John Appleseed" />
				</label>
				<label className="block mb-5">
					<span className="text-gray-700">Email</span>
					<input {...register("email", { required: true })} className="shadow border rounded p-2 mt-2 form-input block w-full  focus:outline-none focus:ring-2 ring-offset-2 ring-yellow-500 invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
						type="email" placeholder="john@domain.com" />
				</label>
				<label className="block mb-5" >
					<span className="text-gray-700">Comment</span>
					<textarea {...register("comment", { required: true })} className="shadow border rounded p-2 px-3 mt-2 form-textarea block w-full focus:outline-none focus:ring-2 ring-offset-2 ring-yellow-500 	invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
						placeholder="Your comments" rows={8} />
				</label>
				{/* errors when validation fails */}
				<div className="flex flex-col p-5">
					{errors.name && (<p className="text-red-700" >* <span className="font-bold">Name</span> field is required</p>)}
					{errors.email && (<p className="text-red-700" >* <span className="font-bold">Email</span> field is required</p>)}
					{errors.comment && (<p className="text-red-700" >* <span className="font-bold">Comment</span> field is required</p>)}
				</div>
				<input type="submit" className="shadow bg-yellow-500 hover:bg-yellow-400 text-white font-bold focus:outline-none py-2 px-4 rounded cursor-pointer" />
			</form>

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