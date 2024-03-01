import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllChaptersThunk } from "../../redux/chapter/chapterThunks";
import { useNavigate, useParams } from "react-router-dom";
import { selectChapters } from "../../redux/chapter/chapterSelectors";
import { Button } from "../../common/components/Button";
import { addOrRemoveLikeThunk } from "../../redux/likes/likeThunks";
import { setCommentsModal } from "../../redux/modal/modalSlice";
import { Comments } from "./components/Comments";
import {
  addCommentThunk,
  allCommentsThunk,
} from "../../redux/comments/commentsThunks";
import { Loader } from "../../common/components/Loader";
import { fetchAllChapters } from "../../redux/chapter/chapterSlice";
import { selectAuth } from "../../redux/auth/authSelector";
import { loadingStateReset } from "../../redux/apiStatus/apiStatusSlice";
import { selectAllComments } from "../../redux/comments/commentsSelector";

export const Story = () => {
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  const { id } = useParams();
  const chapters = useSelector(selectChapters);
  const allComments = useSelector(selectAllComments);
  const navigate = useNavigate();
  const [currentChapter, setCurrentChapter] = useState(0);
  const oldChapterRef = useRef();
  const fetchAllChaptersStatus = useSelector(
    (store) => store.apiStatus.chapters
  );
  const addOrRemoveLikeStatus = useSelector(
    (store) => store.apiStatus.addOrRemoveLike
  );

  useEffect(() => {
    dispatch(
      fetchAllChaptersThunk({
        storyId: id,
      })
    );
  }, [dispatch]);

  const addOrRemoveLike = () => {
    //Optimistic update for like
    oldChapterRef.current = chapters;
    const newChapters = JSON.parse(JSON.stringify(chapters));
    if (
      chapters?.chapters?.[currentChapter]?.likedBy?.some(
        (userId) => userId === auth?.userId
      )
    ) {
      newChapters.chapters[currentChapter].likedBy = newChapters.chapters[
        currentChapter
      ].likedBy.filter((userId) => userId !== auth?.userId);
    } else {
      newChapters.chapters[currentChapter].likedBy = [
        ...newChapters.chapters[currentChapter].likedBy,
        auth?.userId,
      ];
    }
    dispatch(fetchAllChapters(newChapters));
    dispatch(
      addOrRemoveLikeThunk({
        storyId: id,
        chapterId: chapters?.chapters?.[currentChapter]?.id,
      })
    );
  };

  const openAddCommentModal = () => {
    dispatch(setCommentsModal(true));
  };

  //Revert to old state if API fails
  useEffect(() => {
    if (addOrRemoveLikeStatus?.success === false) {
      dispatch(fetchAllChapters(oldChapterRef.current));
    }
  }, [addOrRemoveLikeStatus]);

  //Fetch all comments
  useEffect(() => {
    if (chapters && chapters?.chapters?.length > 0) {
      dispatch(
        allCommentsThunk({
          chapterId: chapters?.chapters?.[currentChapter]?.id,
        })
      );
    }
  }, [chapters, currentChapter]);
  return (
    <div className="mx-auto mt-28 max-w-full m-3">
      <Loader showBackdropLoader={fetchAllChaptersStatus?.isLoading === true} />
      <Comments chapterId={chapters?.chapters?.[currentChapter]?.id} />
      <div className="text-right mb-2">
        <Button
          title={"ADD NEW CHAPTER"}
          onClick={() => navigate(`/story/${id}/chapter`)}
        />
      </div>
      <div className="min-h-[600px] p-8 border border-orange-500 rounded-lg flex flex-col items-center gap-y-5">
        <h1 className="text-4xl text-gray-600 leading-[3rem] font-mono text-center">
          {chapters?.story?.title}
        </h1>
        <p className="text-gray-600 text-sm text-center">
          {chapters?.story?.description}
        </p>
        <div className="flex items-center gap-5">
          <div
            onClick={addOrRemoveLike}
            className="text-center border bg-red-100 px-3 py-2 rounded-full flex gap-2 items-center cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-red-600"
            >
              <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
            </svg>

            <span className=" font-extralight text-sm text-red-500">
              {chapters?.chapters?.[currentChapter]?.likedBy?.length} Likes
            </span>
          </div>
          <div
            onClick={openAddCommentModal}
            className="text-center flex gap-2 border bg-blue-100 px-3 py-2 rounded-full items-center cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-blue-500"
            >
              <path
                fillRule="evenodd"
                d="M5.337 21.718a6.707 6.707 0 0 1-.533-.074.75.75 0 0 1-.44-1.223 3.73 3.73 0 0 0 .814-1.686c.023-.115-.022-.317-.254-.543C3.274 16.587 2.25 14.41 2.25 12c0-5.03 4.428-9 9.75-9s9.75 3.97 9.75 9c0 5.03-4.428 9-9.75 9-.833 0-1.643-.097-2.417-.279a6.721 6.721 0 0 1-4.246.997Z"
                clipRule="evenodd"
              />
            </svg>

            <span className=" font-extralight text-sm text-blue-500">
              {allComments?.length ||
                chapters?.chapters?.[currentChapter]?.commentsCount}{" "}
              Comments
            </span>
          </div>
        </div>
        <div className="border-t-2 border-orange-500 w-full"></div>
        {chapters?.chapters?.length === 0 ? (
          <div className="flex flex-col gap-8 items-center h-[300px]">
            <p className="text-gray-600 text-sm">
              This story doesn't have any chapters added.
            </p>
            <Button
              title={"ADD CHAPTER"}
              onClick={() => navigate(`/story/${id}/chapter`)}
            />
          </div>
        ) : (
          <>
            <div className="w-full flex justify-between items-center">
              <h3 className="text-xl text-gray-600 font-mono text-center md:text-left">
                {chapters?.chapters?.[currentChapter]?.chapterTitle}
              </h3>
              <div className="flex gap-2 items-center">
                <div className=" w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
                  <span className="text-lg font-semibold uppercase">
                    {chapters?.chapters?.[currentChapter]?.User.username.slice(
                      0,
                      2
                    )}
                  </span>
                </div>
                <span className=" text-sm font-semibold text-gray-600">
                  {chapters?.chapters?.[currentChapter]?.User.username}
                </span>
              </div>
            </div>
            <div
              className="text-center md:text-left"
              dangerouslySetInnerHTML={{
                __html: chapters?.chapters?.[currentChapter]?.content,
              }}
            ></div>
          </>
        )}
        <div className="border-t-2 border-orange-500 w-full"></div>
        <div className="flex justify-between items-center w-full">
          <Button
            onClick={() => setCurrentChapter(currentChapter - 1)}
            disabled={currentChapter === 0}
            title={"PREV CHAPTER"}
          />
          <Button
            onClick={() => setCurrentChapter(currentChapter + 1)}
            disabled={currentChapter === chapters?.chapters?.length - 1}
            title={"NEXT CHAPTER"}
          />
        </div>
      </div>
    </div>
  );
};
