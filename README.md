# Tracker v2

The aim of the project is to facilitate the tracking of TV series, movies, and many other things in the future. I used to use Notion to keep track of what I've watched, but doing it manually was quite cumbersome. Although there were similar applications, they had their issues. They didn't suffice to meet my needs. So, I wanted to develop an application like this.

## Roadmap

- Coming Soon
- Creating lists
- Commenting


## Basic Technologies Used

**Client:** Next.js, React, Typescript, Firebase, TailwindCSS, shadcn-ui, valibot, react-hook-form, react-csv, next-themes, next-intl,

**Server:** Next.js, next-firebase-auth-edge, Firebase Admin, tRPC

## Lessons Learned

While preparing the project, I encountered many challenges. One of the biggest was likely the multi-language support. Setting up both user authentication and the multi-language middleware took 5 days. The user login/logout system and Firebase Admin setup were challenging.

## Features

- Real-time data changes with `Firebase`
- Full control over the profile with `firebase` (adding a profile picture, username, display name, changing password, changing email)
- Secure authentication with `next-firebase-auth-edge`
- Real-time messaging with Firebase

- Built with `tailwindCSS`
- Accessible components with Shadcn-ui
- Dark/light mode switch with `next-themes`
- icons with `react-icons`
- Responsive design

- Type-safe API with `tRPC`
- Rate limiting
- Multi-language support (tr, en, de) with `next-intl`
- Mail sender with `node-mailer`
- PWA export with `next-pwa` you can download like an Android or iOS app.
- Adding to favorites, rating, adding status

- Pagination with `@tanstack/react-query`
- Table functionality with `@tanstack/react-table`
- Form validation with `react-hook-form` and `valibot`
- Data export with `react-csv`
- SEO support
- Debouncing with `use-debounce`
- CI/CD with GitHub actions(every commit to preview or main branch automatically deploy new version to preview or production)

## Screenshots

![Ekran Görüntüsü - 2023-08-23 10-35-00](https://github.com/dukeofsoftware/series-tracker-v2/assets/89215036/da96ca30-fabd-47d6-b72c-4af34718b816)
![Ekran Görüntüsü - 2023-08-23 14-14-36](https://github.com/dukeofsoftware/series-tracker-v2/assets/89215036/992bc261-4795-4f40-a017-c0abf097bf1e)
![Ekran Görüntüsü - 2023-08-23 14-14-18](https://github.com/dukeofsoftware/series-tracker-v2/assets/89215036/c4c71cb7-36b6-4131-b7cc-047f5af67baf)
![Ekran Görüntüsü - 2023-08-23 14-13-28](https://github.com/dukeofsoftware/series-tracker-v2/assets/89215036/31179e16-4aa4-46bf-86ca-a208b56938ac)
![Ekran Görüntüsü - 2023-08-23 14-13-50](https://github.com/dukeofsoftware/series-tracker-v2/assets/89215036/ca084fbf-d105-4e9a-97bc-97ef93da3a02)
![Ekran Görüntüsü - 2023-08-23 14-14-52](https://github.com/dukeofsoftware/series-tracker-v2/assets/89215036/d97b9cfc-7054-4663-ae6b-f049ecac34ff)



## Optimization

Using `next/dynamic` for import, server-side rendering (SSR), react-query, useMemo, memo

## Frequently Asked Questions

**Q1:** Question 1  
**A1:** Answer 1

**Q2:** Question 2  
**A2:** Answer 2

## Running on Your Computer

Clone the project:

```bash
git clone git@github.com:dukeofsoftware/series-tracker-v2.git
```

Navigate to the project directory:

```bash
cd series-tracker-v2
```

Install the necessary packages and add required values to the `.env` file:

```bash
pnpm install
```

Run the server:

```bash
pnpm serve
```

## Environment Variables

To run this project, you must add the following environment variables to your `.env` file. You can find them in the `.env.example` file. Also, all environment variables come with type safety @/env.mjs so you can't start the application without adding all of them.

`ANALYZE=`false

#### Server Firebase

`FIREBASE_PROJECT_ID=`

`FIREBASE_API_KEY=` 

`FIREBASE_CLIENT_EMAIL=`

`FIREBASE_PRIVATE_KEY=`"-----BEGIN PRIVATE KEY-----

-----END PRIVATE KEY-----\n"

#### Client Firebase

`NEXT_PUBLIC_FIREBASE_API_KEY=`

`NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=`

`NEXT_PUBLIC_PROJECT_ID=`

`NEXT_PUBLIC_BUCKET=`

`NEXT_PUBLIC_MESSAGING_SENDER_ID=`

`NEXT_PUBLIC_APP_ID=`

`NEXT_PUBLIC_MEASUREMENT_ID=`

`NEXT_PUBLIC_FIREBASE_DATABASE_URL=`

`NEXT_PUBLIC_REDIRECT_URL=`

`USE_SECURE_COOKIES=`false // set true if https

#### API Keys

`TMDB_TOKEN=`

`SITE_URL=`

## Related Projects

Here are some related projects:

- [Tracker v1](https://github.com/dukeofsoftware/series-tracker)
- [TMDB](https://www.themoviedb.org/)

## Feedback

If you have any feedback, please contact us at kozanfurkanemre@gmail.com.
