import React from 'react';
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {

    const error = useRouteError();
    console.error(error);

  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-6">
        <h1 className="text-3xl font-semibold">Sorry, an unexpected error has occurred.</h1>
        <p>{error.statusText || error.message}</p>
    </div>
  )
}

export default ErrorPage