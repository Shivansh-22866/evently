# Event Finder App

An event finder application that allows users to create, search, and filter events with a seamless payment and authentication process. Built with Next.js (TypeScript), TailwindCSS, and MongoDB, this app integrates Stripe for payments and Clerk for user authentication. 

## Features

- **User Authentication**: Secure user authentication using [Clerk](https://clerk.dev).
- **Event Creation**: Users can upload events with details and an image poster.
- **Event Search & Filtering**: Easily search and filter events based on categories, dates, etc.
- **Payments**: Secure payments integration using [Stripe](https://stripe.com).
- **Image Uploading**: Upload images as posters using [UploadThing](https://uploadthing.com) and store them as URLs.
- **Database Management**: MongoDB for event data storage and retrieval.

## Technologies Used

- **Frontend**: Next.js (TypeScript), TailwindCSS
- **Backend**: Node.js, Express (if applicable)
- **Database**: MongoDB
- **Authentication**: Clerk
- **Payments**: Stripe
- **Image Upload**: UploadThing

## Getting Started

To get a local copy of the project up and running, follow these steps.

### Prerequisites

- Node.js (>= 14.x)
- MongoDB Atlas account (or local MongoDB setup)
- Stripe account
- Clerk account
- UploadThing account

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/event-finder-app.git
   cd event-finder-app
   ```

2. Install the dependencies:

  ```bash
  npm i
  ```

3. Create a .env.local file in the root directory and add your environment variables:

  ```bash
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_CLERK_PUBLIC_KEY
  CLERK_SECRET_KEY=secret_clerk_key
  NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
  NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
  NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
  NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
  NEXT_PUBLIC_MONGODB_URI=your_database_uri
  WEBHOOK_SECRET=stripe_webhook_secret
  UPLOADTHING_TOKEN=your_uploadthing_token
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_public_key
  STRIPE_SECRET_KEY=stripe_secret_key
  NEXT_PUBLIC_SERVER_URL=http://localhost:3000
  STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
  ```

4. Start the development server:

  ```bash
  npm run dev
  ```

5. Open your browser and go to http://localhost:3000 to see the app in action.

### Usage
- Creating Events: Users can create an event by filling out a form with the event details and uploading an image.
- Searching Events: Use the search bar to find events by name or category.
- Filtering Events: Apply filters based on date, location, or other criteria to narrow down the results.
- Hosting your own events: Create your own events for users to see
- Keep a record of tickets: Anyone that joins your event generates a ticket that you can see on order details

### Acknowledgments
- Next.js
- TailwindCSS
- MongoDB
- Stripe
- Clerk
- UploadThing
