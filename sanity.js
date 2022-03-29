import { createCurrentUserHook, createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: "2022-03-25",

  useCdn: process.env.NODE_ENV === "production",
};

// this is where we need to create queries
export const sanityClient = createClient(config);
export const builder = imageUrlBuilder(sanityClient);

// Get Image URL from asset ref data
export const urlFor = (source) => {
  return builder.image(source);
};

// Then you can use the handy builder syntax to generate your urls:
// <img src={urlFor(author.image).width(200).url()} />

// Get currently logged in user

export const useCurrentUser = createCurrentUserHook(config);
