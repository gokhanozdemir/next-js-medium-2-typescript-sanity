## Aim

Is to warm up my fingers back to react again. I really enjoyed building this project.

While this is the main inspiration was [this tutorial](https://www.youtube.com/watch?v=I2dcpatq54o), there has been many additional chanages required to follow along and it took lots of debugging esspecially due to CSM live-dev server tunneling.

I built the stack from the scratch by initiating next.js first, then combining tailwind, sanity and deployment hooks on vercel.

## Headlines

- Full Stack Development project
- Incremental static regeneration based on React getStaticProps
- Static optimized pages
- Form validation with [react-hook-form](https://react-hook-form.com)
- CMS is hosted by [sanity.io](sanity.io)
- Fully responsive build

When the content is updated with the CMS you don't need to re-deploy. The files will be regenerated after 60 seconds. Just be patient.

## Tech Stack

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). [TypeScript](https://nextjs.org/learn/excel/typescript) is used with [TailwindCSS](https://tailwindcss.com/). Hosted on [Vercel](https://vercel.com) and [sanity.io](https://sanity.io) from the inital dev process.

### Preview

[Frontend](https://next-js-medium-2-typescript-sanity-studio.vercel.app) - CRUD actions for listing posts, and adding comments

[Backend](https://next-js-medium-2-typescript-sanity-studio.vercel.app/studio) - You will be asked to log-in

#### Responsive FrontEnd

![Responsive Layout](https://github.com/gokhanozdemir/next-js-medium-2-typescript-sanity/blob/master/_readme/responsive-gif.gif?raw=true)

#### Incremental Fractional Static Page Generation

![Incremental Fractional Static Page Generation](https://github.com/gokhanozdemir/next-js-medium-2-typescript-sanity/blob/master/_readme/cms-ifr-1-gif.gif?raw=true)

#### Add and Manage Comment

![Responsive Layout](https://github.com/gokhanozdemir/next-js-medium-2-typescript-sanity/blob/master/_readme/cms-add-comment-part-1-gif.gif?raw=true)

#### Preview Comment After Approval

![Responsive Layout](https://github.com/gokhanozdemir/next-js-medium-2-typescript-sanity/blob/master/_readme/cms-add-comment-part-2-gif.gif?raw=true)

#### CMS Versioning

![Responsive Layout](https://github.com/gokhanozdemir/next-js-medium-2-typescript-sanity/blob/master/_readme/cms-versioning-gif.gif?raw=true)

## Getting Started on Dev Server

Even if you try to setup the dev, .env variables are setup in the Vercel.com settings. You should re init sanity from scratch.

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello).
