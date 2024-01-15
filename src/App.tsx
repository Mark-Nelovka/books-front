import { Loader } from "ui/Loader/Loader";
import HomePage from "pages/Home/HomePage";
import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "routes/PrivateRoute";
import PublickRoute from "routes/PublicRoute";
import AuthPage from "pages/Auth/AuthPage";

const SearchPage = lazy(
  () => import("pages/SearchPage" /* webpackChunkName: "SearchPage" */)
);

const FullCategoryPage = lazy(
  () => import("pages/FullCategoryPage" /* webpackChunkName: "FullCategoryPage" */)
);

const BooksListPage = lazy(
  () => import("pages/BooksListPage" /* webpackChunkName: "BooksListPage" */)
);

const DetailsPage = lazy(
  () => import("pages/DetailsPage" /* webpackChunkName: "DetailsPage" */)
);

const BasketPage = lazy(
  () => import("pages/BasketPage" /* webpackChunkName: "BasketPage" */)
);

function App() {
  console.log("Appasdfsafs");
  return (
    <>
      <main>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route
                path="/"
                element={
                  <PublickRoute>
                    <AuthPage />
                  </PublickRoute>
                }
              />
              <Route
                path="/home"
                element={
                  <PrivateRoute>
                    <HomePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/categories"
                element={
                  <PrivateRoute>
                    <FullCategoryPage />
                  </PrivateRoute>
                }
              />
               <Route
                path="/books/:page/*"
                element={
                  <PrivateRoute>
                    <BooksListPage />
                  </PrivateRoute>
                }
              />
               <Route
                path="/book/:bookId"
                element={
                  <PrivateRoute>
                    <DetailsPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/user/basket"
                element={
                  <PrivateRoute>
                    <BasketPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/search"
                element={
                  <PrivateRoute>
                    <SearchPage />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Suspense>
      </main>
    </>
  );
}

export default App;
