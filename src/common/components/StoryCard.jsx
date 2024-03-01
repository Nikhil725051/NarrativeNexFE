import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import {faHeart, faComment} from "@fortawesome/free-solid-svg-icons"

export const StoryCard = ({story}) => {

  const navigate = useNavigate();
  return (
    <div className="max-w-xs bg-white rounded-xl px-4 py-5 flex flex-col justify-around shadow-md w-96">
      <p className="text-lg font-bold font-sans">{story?.title}</p>
      <div className="py-3">
        <p className="text-gray-400 text-sm">
          {story?.description}
        </p>
      </div>
      <div className="flex justify-between">
        <div className="text-sm flex gap-2">
          <button onClick={() => {
            navigate(`/story/${story.id}`);
          }} className="bg-slate-200 px-5 rounded-xl hover:bg-slate-400 transition-colors ease-in-out">
            Read
          </button>
        </div>
        <div className="flex gap-5">
          <div className="text-center">
           <FontAwesomeIcon size="lg" color="#ff0000ed" icon={faHeart}></FontAwesomeIcon>

            <p className=" font-extralight text-sm text-gray-500">{story.likeCount}</p>
          </div>
          <div className="text-center">
          <FontAwesomeIcon size="lg" color="#2e37d0d1" icon={faComment}></FontAwesomeIcon>

            <p className="font-extralight text-sm text-gray-500">{story.commentCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
