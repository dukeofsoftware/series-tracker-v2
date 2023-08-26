# Tracker v2

The aim of the project is to facilitate the tracking of TV series, movies, and perhaps many other things in the future. I used to use Notion to keep track of what I've watched, but doing it manually was quite cumbersome. Although there were similar applications, they had their issues. They didn't suffice to meet my needs. So, I wanted to develop an application like this.

## Roadmap

- Coming Soon
- Creating lists
- Commenting
- Blog
- Payment system (supabase, stripe)
- Real-time chat with friends
- Notification system
- Support

## Basic Technologies Used

**Client:** React, Firebase, Zustand, TailwindCSS, Shadcn-ui, Valibot, React Hook Form, React CSV, Next Themes, Query String

**Server:** Next.js, next-firebase-auth-edge, Firebase Admin

## Lessons Learned

While preparing the project, I encountered many challenges. One of the biggest was likely the multi-language support. Setting up both user authentication and multi-language interface took 5 days. The user login/logout system and Firebase Admin setup were challenging.

## Features

- Dark/light mode switch with `next-themes`
- Real-time data changes with `firebase`
- Pagination with `@tanstack/react-query`
- Full control over the profile with `firebase` (adding profile picture, username, display name, changing password, changing email)
- Mobile responsive
- Multi-language support (tr, en, de) with `next-intl`
- Secure authentication with `next-firebase-auth-edge`
- Data export with `react-csv`
- Table functionality with `@tanstack/react-table`
- User following
- Adding to favorites, rating, adding status
- SEO support
- Accessible components with Shadcn-ui
- Form validation with `react-hook-form` and `valibot`
- Rate limiting
- `react-icons`
- Debouncing with `use-debounce`

## Screenshots

![Ekran Görüntüsü - 2023-08-23 10-35-00](https://github.com/dukeofsoftware/series-tracker-v2/assets/89215036/da96ca30-fabd-47d6-b72c-4af34718b816)
![Ekran Görüntüsü - 2023-08-23 14-14-36](https://github.com/dukeofsoftware/series-tracker-v2/assets/89215036/992bc261-4795-4f40-a017-c0abf097bf1e)
![Ekran Görüntüsü - 2023-08-23 14-14-18](https://github.com/dukeofsoftware/series-tracker-v2/assets/89215036/c4c71cb7-36b6-4131-b7cc-047f5af67baf)
![Ekran Görüntüsü - 2023-08-23 14-13-28](https://github.com/dukeofsoftware/series-tracker-v2/assets/89215036/31179e16-4aa4-46bf-86ca-a208b56938ac)
![Ekran Görüntüsü - 2023-08-23 14-13-50](https://github.com/dukeofsoftware/series-tracker-v2/assets/89215036/ca084fbf-d105-4e9a-97bc-97ef93da3a02)
![Ekran Görüntüsü - 2023-08-23 14-14-52](https://github.com/dukeofsoftware/series-tracker-v2/assets/89215036/d97b9cfc-7054-4663-ae6b-f049ecac34ff)



## Optimization

Using `next/dynamic` for import, server-side rendering (SSR), and react-query

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

To run this project, you'll need to add the following environment variables to your `.env` file. You can find them in the `.env.example` file.

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
