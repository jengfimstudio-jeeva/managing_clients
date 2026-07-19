# jengFilm Studio CRM Setup

This is a Next.js 14 App Router project using MongoDB, NextAuth, and TailwindCSS.

## Environment Variables
Create a `.env.local` file in the root directory with the following variables:

```env
MONGODB_URI="your_mongodb_atlas_connection_string"
NEXTAUTH_SECRET="your_nextauth_secret_key"
NEXTAUTH_URL="http://localhost:3000"

# Optional Cloudinary (for Logo uploads)
CLOUDINARY_URL="cloudinary://api_key:api_secret@cloud_name"
```

## First Time Setup

1. Run `npm install`
2. Configure `.env.local`
3. Run `npm run dev`
4. Visit `http://localhost:3000/api/seed` in your browser to seed the 3 default service packages into your MongoDB database.
5. Go to `http://localhost:3000/signup` and create an admin account.
6. Login and manage your enterprise clients!

## Deployment

Deploy for free on Vercel:
1. Push this code to GitHub.
2. Import the project in Vercel.
3. Add the Environment Variables in the Vercel dashboard.
4. Deploy!
