import { Loader } from "ui/Loader/Loader";
import Registration from "pages/Auth/RegistrationPage";
import HomePage from "pages/Home/HomePage";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "routes/PrivateRoute";
import PublickRoute from "routes/PublicRoute";

// const ErrorPage = lazy(
//   () => import("pages/ErrorPage" /* webpackChunkName: "Error page" */)
// );

function App() {
  console.log("Appasdfsafs")
  return (
    <>
      <main>
        <Suspense fallback={<Loader />}>
          <Routes>
          <Route
            path="/registration"
            element={
              <PublickRoute>
               <Registration /> 
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
      </main>
    </>
  );
}

export default App;
