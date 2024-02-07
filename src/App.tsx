import { Loader } from "ui/Loader/Loader";
import HomePage from "pages/Home/HomePage";
import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "routes/PrivateRoute";
import PublickRoute from "routes/PublicRoute";
import AuthPage from "pages/Auth/AuthPage";
import { RoutesEndpoints } from "API/endpoints";

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
  return (
    <>
      <main>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route
                path={RoutesEndpoints.base}
                element={
                  <PublickRoute>
                    <AuthPage />
                  </PublickRoute>
                }
              />
              <Route
                path={RoutesEndpoints.home}
                element={
                  <PrivateRoute>
                    <HomePage />
                  </PrivateRoute>
                }
              />
              <Route
                path={RoutesEndpoints.categories}
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
                path={RoutesEndpoints.details}
                element={
                  <PrivateRoute>
                    <DetailsPage />
                  </PrivateRoute>
                }
              />
              <Route
                path={RoutesEndpoints.basket}
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
