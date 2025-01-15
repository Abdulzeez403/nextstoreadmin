// app/404.tsx
import Head from "next/head";
import Link from "next/link";
import React from "react";

const NotFoundPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>404 - Page Not Found</title>
        <meta
          name="description"
          content="The page you are looking for cannot be found."
        />
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <img src="/404.jpg" alt="Page Not Found" className="w-96" />
        <p className="text-lg mb-4">
          Oops! The page you re looking for doesn t exist.
        </p>
        <Link href="/admin" className="text-blue-500 underline">
          Go back to the homepage
        </Link>
      </div>
    </>
  );
};

export default NotFoundPage;
