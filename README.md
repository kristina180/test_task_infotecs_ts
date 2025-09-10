This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## About
This project is a web application for a user database, designed to display, filter, and sort user data in a dynamic and user-friendly way.

It allows users to:
* Search users by name
* Filter by age, gender, phone code, and city
* Sort columns (e.g., last name, age, city)
* View contact details: phone, email, etc.
* Navigate through paginated user data

## Preview
![App Screenshot Main Page](<img width="1852" height="842" alt="image" src="https://github.com/user-attachments/assets/1cb8713f-16c9-479c-abc4-5a4aa854cada" />)
![App Screenshot User Page].(<img width="1852" height="857" alt="image" src="https://github.com/user-attachments/assets/484727ad-ecd4-458e-9202-4834720c41b5" />
)

## Features

-  Live search and filtering by name, age, gender, phone code, and city  
-  Sorting by columns (ascending and descending)  
-  Pagination for user-friendly data navigation  
-  View full user contact info (email, phone, etc.)  
-  **Resizable columns** – adjust column width by dragging to fit your preferences  
-  Clean and responsive UI

## Tech Stack

| Technology         | Purpose                                      |
|--------------------|----------------------------------------------|
| **Next.js**        | React framework with SSR/SSG                 |
| **React**          | UI library                                   |
| **TypeScript**     | Static typing and type safety                |
| **SCSS**           | Styling with modular and nested CSS          |
| **MobX**           | State management                             |
| **Fetch**          | API requests                                 |
| **dummyjson.com**  | Mock API for user data                       |




## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
