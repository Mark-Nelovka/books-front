import { Loader } from "ui/Loader/Loader";
import HomePage from "pages/Home/HomePage";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "routes/PrivateRoute";
import PublickRoute from "routes/PublicRoute";
import AuthPage from "pages/Auth/AuthPage";
import CategoriesPage from "pages/CategoriesPage";

// const ErrorPage = lazy(
//   () => import("pages/ErrorPage" /* webpackChunkName: "Error page" */)
// );

function App() {
  console.log("Appasdfsafs");
  return (
    <>
      <main>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route
                path="/books-front"
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
                    <CategoriesPage />
                  </PrivateRoute>
                }
              />
               <Route
                path="/categories/:category"
                element={
                  <PrivateRoute>
                    <CategoriesPage />
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
