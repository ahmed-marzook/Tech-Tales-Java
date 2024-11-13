import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import CreateArticlePage from "./pages/create-article/CreateArticlePage";
import NotFoundPage from "./pages/not-found/ErrorPage";
import AuthorPage from "./pages/author/AuthorPage";
import ArticlePage from "./pages/article/ArticlePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: (
      <NotFoundPage
        title="Page Not Found"
        message="Oops! The page you're looking for doesn't exist."
        errorCode="404"
      />
    ),
  },
  {
    path: "/article/editor",
    element: <CreateArticlePage />,
    errorElement: (
      <NotFoundPage
        title="Page Not Found"
        message="Oops! The page you're looking for doesn't exist."
        errorCode="404"
      />
    ),
  },
  {
    path: "/article/editor/:articleId",
    element: <CreateArticlePage />,
    errorElement: (
      <NotFoundPage
        title="Page Not Found"
        message="Oops! The page you're looking for doesn't exist."
        errorCode="404"
      />
    ),
  },
  {
    path: "/authors",
    element: <AuthorPage />,
    errorElement: (
      <NotFoundPage
        title="Page Not Found"
        message="Oops! The page you're looking for doesn't exist."
        errorCode="404"
      />
    ),
  },
  {
    path: "/articles/author/:authorId",
    element: <Home />,
    errorElement: (
      <NotFoundPage
        title="Page Not Found"
        message="Oops! The page you're looking for doesn't exist."
        errorCode="404"
      />
    ),
  },
  {
    path: "/article/:articleId",
    element: <ArticlePage />,
    errorElement: (
      <NotFoundPage
        title="Page Not Found"
        message="Oops! The page you're looking for doesn't exist."
        errorCode="404"
      />
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Header />
    <RouterProvider router={router} />
  </StrictMode>
);
