import { Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { signUpThunk } from "../redux/auth/authThunks";
import { Loader } from "../common/components/Loader";

const SignUp = () => {
  const loginSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    username: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  const dispatch = useDispatch();
  const signupStatus = useSelector((store) => store.apiStatus.signUp);

  const handleSubmit = (values) => {
    dispatch(signUpThunk(values))
  };
  return (
    <div className="mt-32 mx-auto max-w-md bg-gradient-to-b from-white to-blue-50 rounded-3xl p-10 border-5 border-white shadow-lg">
       <Loader showBackdropLoader={signupStatus?.isLoading === true} />
      <div className="heading text-center font-bold text-2xl text-blue-500">
        Sign Up
      </div>
      <Formik
        validationSchema={loginSchema}
        initialValues={{
          name: "",
          username: "",
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
              className="input bg-white rounded-2xl px-5 shadow-md w-full py-4 border-none mb-4 focus:outline-none focus:border-blue-500"
              type="text"
              name="name"
              id="ename"
              placeholder="Full Name"
              value={values.name}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.name && touched.name && (
              <span className="text-red-500 p-2">{errors.name}</span>
            )}
            <input
              required
              className="input bg-white rounded-2xl px-5 shadow-md w-full py-4 border-none mb-4 focus:outline-none focus:border-blue-500"
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              value={values.username}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.username && touched.username && (
              <span className="text-red-500 p-2">{errors.username}</span>
            )}
            <input
              required
              className="input bg-white rounded-2xl px-5 shadow-md w-full py-4 border-none mb-4 focus:outline-none focus:border-blue-500"
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
              className="input w-full bg-white border-none px-5 py-4 rounded-2xl mb-4 shadow-md focus:outline-none focus:border-blue-500"
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
            <input
              className="cursor-pointer login-button block w-full font-bold bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-4 mt-8 mx-auto rounded-2xl shadow-md border-none transition-all duration-200 ease-in-out hover:transform hover:scale-103 active:scale-95 focus:outline-none"
              type="submit"
              value="Sign Up"
            />
          </form>
        )}
      </Formik>
      <p className="text-center mt-4 text-xs">
        Already have an account?{" "}
        <span className="forgot-password block mt-4 ml-2">
          <a
            href="/login"
            className="text-blue-500 text-xs no-underline hover:underline"
          >
            Sign In
          </a>
        </span>
      </p>
    </div>
  );
};

export default SignUp;
