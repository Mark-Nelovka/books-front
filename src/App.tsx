import { Loader } from "ui/Loader/Loader";
import HomePage from "pages/Home/HomePage";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "routes/PrivateRoute";
import PublickRoute from "routes/PublicRoute";
import RegistrationPage from "pages/Auth/RegistrationPage";
import LoginPage from "pages/Auth/LoginPage";

// const ErrorPage = lazy(
//   () => import("pages/ErrorPage" /* webpackChunkName: "Error page" */)
// );

function App() {
  console.log("Appasdfsafs");
  return (
    <>
      <main>
        <div className="container">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route
                path="/"
                element={
                  <PublickRoute>
                    <LoginPage />
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
            </Routes>
          </Suspense>
        </div>
      </main>
    </>
  );
}

export default App;
