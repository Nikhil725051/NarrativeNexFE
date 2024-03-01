import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "../common/components/Button";
import { useDispatch, useSelector } from "react-redux";
import { addChapterThunk } from "../redux/chapter/chapterThunks";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "../common/components/Loader";
import { loadingStateReset } from "../redux/apiStatus/apiStatusSlice";
import { toast } from "react-toastify";

export const AddChapter = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();
  const titleRef = useRef("");
  const navigate = useNavigate();
  const addChapterStatus = useSelector((store) => store.apiStatus.addChapter)

  useEffect(() => {
    if(addChapterStatus?.success === true){
      navigate(`/story/${id}`);
      dispatch(loadingStateReset({
        apiStatusKey: 'addChapter'
      }));
      toast.success("Chapter added successfully!", {
        position: 'bottom-right'
      })
    }
  }, [addChapterStatus?.success])
  return (
    <div className="mx-auto mt-32 max-w-full min-h-[750px] p-8 border border-orange-500 rounded-lg flex flex-col items-center gap-y-8">
       <Loader showBackdropLoader = {addChapterStatus?.isLoading === true}/>
      <h1 className="text-4xl text-gray-600 leading-[3rem] font-mono">
        Write Chapter
      </h1>
      <div className="border-t-2 border-orange-500 w-full"></div>
      <div className="w-full">
        <input
          ref={titleRef}
          type="text"
          name="chapterName"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          placeholder="Type chapter name here"
          required
        />
      </div>
      <ReactQuill
        placeholder="Write Chapter..."
        style={{ width: "100%" }}
        theme="snow"
        value={value}
        onChange={setValue}
      />
      <div className="w-full text-right">
        <Button
          title={"ADD CHAPTER"}
          onClick={() => {
            dispatch(
              addChapterThunk({
                storyId: id,
                chapterTitle: titleRef.current.value,
                content: value,
              })
            );
          }}
        />
      </div>
    </div>
  );
};
