import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function RouteErrorFallback() {
  const error = useRouteError();

  let message = "Something went wrong.";
  if (isRouteErrorResponse(error)) {
    message = `${error.status} ${error.statusText}`;
  }

  return (
    <div className="text-center p-6 text-red-600">
      <h1 className="text-2xl font-bold mb-2">Oops!</h1>
      <p>{message}</p>
      <button
        className="mt-4 underline text-blue-500"
        onClick={() => (window.location.href = "/")}
      >
        Go back home
      </button>
    </div>
  );
}
