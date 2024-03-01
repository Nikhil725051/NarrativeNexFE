import { useState } from "react";
import Login from "./pages/Login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import { Navbar } from "./common/components/Navbar";
import { Home } from "./pages/home/Home";
import { useSelector } from "react-redux";
import { selectAuth } from "./redux/auth/authSelector";
import { Story } from "./pages/story/Story";
import { AddChapter } from "./pages/AddChapter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const auth = useSelector(selectAuth);

  const ProtectedRoute = ({ children }) => {
    const auth = useSelector(selectAuth);

    if (!auth.isLoggedIn) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <ToastContainer />
      <Navbar />
      <div className="max-w-5xl mx-auto px-3">
        <Routes>
          <Route
            exact
            path="/login"
            element={auth.isLoggedIn ? <Navigate to={"/"} /> : <Login />}
          ></Route>
          <Route
            exact
            path="/signup"
            element={auth.isLoggedIn ? <Navigate to={"/"} /> : <SignUp />}
          ></Route>
          <Route
            exact
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/story/:id"
            element={
              <ProtectedRoute>
                <Story />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/story/:id/chapter"
            element={
              <ProtectedRoute>
                <AddChapter />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
