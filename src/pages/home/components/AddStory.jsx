import React, { useEffect } from "react";
import { Modal } from "../../../common/components/Modal";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { selectCreateStory } from "../../../redux/story/storySelectors";
import {
  setAddStoryModal,
  setStoryAddedModal,
} from "../../../redux/modal/modalSlice";
import { createStoryThunk } from "../../../redux/story/storyThunks";
import { loadingStateReset } from "../../../redux/apiStatus/apiStatusSlice";
import { Loader } from "../../../common/components/Loader";

export const AddStory = () => {
  const isOpen = useSelector((store) => store.modal.addStoryModal);
  const dispatch = useDispatch();
  const addStoryStatus = useSelector((store) => store.apiStatus.createStory);
  const handleClose = () => {
    dispatch(setAddStoryModal(false));
  };
  const storySchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
  });
  const createStory = useSelector(selectCreateStory);
  const handleSubmit = (values) => {
    dispatch(createStoryThunk(values));
  };
  useEffect(() => {
    if (addStoryStatus?.success) {
      dispatch(setStoryAddedModal(true));
      dispatch(setAddStoryModal(false));
      dispatch(loadingStateReset({ apiStatusKey: "createStory" }));
    }
  }, [addStoryStatus?.success]);
  return (
    <Modal title={"ADD A NEW STORY"} isOpen={isOpen} handleClose={handleClose}>
      <Loader showBackdropLoader={addStoryStatus?.isLoading === true} />
      <Formik
        validationSchema={storySchema}
        initialValues={{
          title: "",
          description: "",
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
          <form onSubmit={handleSubmit} className="p-4 md:p-5">
            <div className="flex flex-col gap-5 text-left">
              <div>
                <label
                  for="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Type story title"
                  required=""
                  value={values.title}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.title && touched.title && (
                  <span className="text-red-500 p-2">{errors.title}</span>
                )}
              </div>

              <div>
                <label
                  for="description"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Write story description here..."
                  name="description"
                  value={values.description}
                  onBlur={handleBlur}
                  onChange={handleChange}
                ></textarea>
                {errors.description && touched.description && (
                  <span className="text-red-500 p-2">{errors.description}</span>
                )}
              </div>
            </div>
            <button className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5">
              <svg
                className="me-1 -ms-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Add Story
            </button>
          </form>
        )}
      </Formik>
    </Modal>
  );
};
