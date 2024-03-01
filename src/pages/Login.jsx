import { Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { logInThunk } from "../redux/auth/authThunks";
import { selectAuth } from "../redux/auth/authSelector";
import { toast } from "react-toastify";
import { Loader } from "../common/components/Loader";

const Login = () => {
  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const authStatus = useSelector((store) => store.apiStatus.logIn);

  const handleSubmit = (values) => {
    dispatch(logInThunk(values));
  };
  return (
    <div className="mt-32 mx-auto max-w-md bg-gradient-to-b from-white to-blue-50 rounded-3xl p-10 border-5 border-white shadow-lg">
       <Loader showBackdropLoader={authStatus?.isLoading === true} />
      <div className="heading text-center font-bold text-2xl text-blue-500">
        Sign In
      </div>
      <Formik
        validationSchema={loginSchema}
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit} className="form mt-8">
            <input
              required
              className="input bg-white rounded-2xl px-5 shadow-md w-full py-4 border-none focus:outline-none focus:border-blue-500"
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.email && touched.email && (
              <span className="text-red-500 p-2">{errors.email}</span>
            )}
            <input
              required
              className="input w-full bg-white border-none px-5 py-4 rounded-2xl mt-4 shadow-md focus:outline-none focus:border-blue-500"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.password && touched.password && (
              <span className="text-red-500 p-2">{errors.password}</span>
            )}
            <span className="forgot-password block mt-4 ml-2">
              <a
                href="#"
                className="text-blue-500 text-xs no-underline hover:underline"
              >
                Forgot Password?
              </a>
            </span>
            <input
              className="login-button cursor-pointer block w-full font-bold bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-4 mt-8 mx-auto rounded-2xl shadow-md border-none transition-all duration-200 ease-in-out hover:transform hover:scale-103 active:scale-95 focus:outline-none"
              type="submit"
              value="Sign In"
            />
          </form>
        )}
      </Formik>
      <p className="text-center mt-4 text-xs">
        Don't have an account?{" "}
        <span className="forgot-password block mt-4 ml-2">
          <a
            href="/signup"
            className="text-blue-500 text-xs no-underline hover:underline cursor-pointer"
          >
            Sign Up
          </a>
        </span>
      </p>
    </div>
  );
};

export default Login;
