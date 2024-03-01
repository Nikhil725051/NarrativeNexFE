import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCommentsModal } from "../../../redux/modal/modalSlice";
import { Modal } from "../../../common/components/Modal";
import { selectAllComments } from "../../../redux/comments/commentsSelector";
import { addCommentThunk } from "../../../redux/comments/commentsThunks";
import { Loader } from "../../../common/components/Loader";
import { useParams } from "react-router-dom";
import { selectAuth } from "../../../redux/auth/authSelector";
import { allComments as allCommentsAction } from "../../../redux/comments/commentsSlice";

export const Comments = ({ chapterId }) => {
  const isOpen = useSelector((store) => store.modal.commentsModal);
  const allComments = useSelector(selectAllComments);
  const dispatch = useDispatch();
  const commentRef = useRef("");
  const { id } = useParams();
  const auth = useSelector(selectAuth);
  const oldCommentsRef = useRef();
  const addCommentStatus = useSelector((store) => store.apiStatus.addComment);
  const allCommentsStatus = useSelector((store) => store.apiStatus.comments);
  const handleClose = () => {
    dispatch(setCommentsModal(false));
  };

  //Optimistic update for comment
  const updateCommentOptimistic = () => {
    oldCommentsRef.current = allComments;
    const newComments = JSON.parse(JSON.stringify(allComments));
    newComments.push({
      User: {
        name: auth.name,
        username: auth.username,
        email: auth.email,
      },
      content: commentRef.current?.value,
      chapterId,
    });
    dispatch(allCommentsAction(newComments));
  };

  const postComment = () => {
    updateCommentOptimistic();
    dispatch(
      addCommentThunk({
        storyId: id,
        chapterId: chapterId,
        content: commentRef.current?.value,
      })
    );
  };

  //Revert to old state if API fails
  useEffect(() => {
    if (addCommentStatus?.success === false) {
      dispatch(allCommentsAction(oldCommentsRef.current));
    }
  }, [addCommentStatus]);


  return (
    <Modal title={"COMMENTS"} isOpen={isOpen} handleClose={handleClose}>
      <Loader showBackdropLoader={allCommentsStatus?.isLoading === true} />
      <div className="min-h-[500px] p-5 space-y-5 overflow-y-auto max-h-[600px]">
        {allComments?.map((comment, i) => {
          return (
            <div key={i} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-start space-x-4">
                <div>
                  <div className=" w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center">
                    <span className="text-lg font-semibold uppercase">
                      {comment.User.username.slice(0, 2)}
                    </span>
                  </div>
                </div>

                <div className="flex-grow">
                  <p className="text-gray-800 text-sm">{comment.content}</p>
                  <p className="text-gray-500 text-sm text-right">
                    {comment?.User?.name}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex gap-1 p-5 justify-center">
        <input
          ref={commentRef}
          type="text"
          name="comment"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          placeholder="Type your comment here"
          required
        />
        <svg
          onClick={postComment}
          className="cursor-pointer"
          width={80}
          height={50}
          version="1.1"
          id="Layer_1"
          viewBox="0 0 24 24"
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop
                offset="0%"
                style={{ stopColor: "rgb(255, 255, 59)", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "rgb(255, 0, 0)", stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
          <g id="surface1">
            <path
              d="M2,3v7.8L18,12L2,13.2V21l20-9L2,3z"
              fill="url(#gradient)"
            />
          </g>
        </svg>
      </div>
    </Modal>
  );
};
