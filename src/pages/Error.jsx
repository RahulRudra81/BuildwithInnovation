import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="h-screen flex flex-col gap-6 justify-center items-center">
      <h1 className="text-5xl">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      
      <p className="flex flex-col justify-center items-center font-semibold">
        <i>{error.status || error.message}</i>
        <i>{error.statusText}</i>
      </p>
    </div>
  );
}