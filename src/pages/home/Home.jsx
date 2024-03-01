import React, { Fragment, useEffect, useState } from "react";
import { StoryCard } from "../../common/components/StoryCard";
import { AddStory } from "./components/AddStory";
import { useDispatch, useSelector } from "react-redux";
import { selectStories } from "../../redux/story/storySelectors";
import { storiesThunk } from "../../redux/story/storyThunks";
import { StoryAdded } from "./components/StoryAdded";
import { setAddStoryModal } from "../../redux/modal/modalSlice";
import { Loader } from "../../common/components/Loader";
import { Button } from "../../common/components/Button";

export const Home = () => {
  const stories = useSelector(selectStories);
  const dispatch = useDispatch();
  const addStoryStatus = useSelector((store) => store.apiStatus.createStory)
  const storiesStatus = useSelector((store) => store.apiStatus.stories)
  useEffect(() => {
    dispatch(storiesThunk({}));
  }, []);
  return (
    <div className="mx-auto text-center my-32 max-w-6xl">
      <AddStory />
      <StoryAdded />
      <h1 className=" mb-8 text-4xl font-bold leading-[3rem] font-mono text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-yellow-500">
        Narrative Nex
        <br /> Create Stories Together!
      </h1>
      <Button
        onClick={() => dispatch(setAddStoryModal(true))}
        title={'ADD NEW STORY'} />
      <div className=" flex flex-wrap gap-5 justify-center mt-8">
        {stories?.map((story, i) => {
          return <Fragment key={i}>
            <StoryCard story={story} />
          </Fragment>;
        })}
      </div>
      <Loader showBackdropLoader = {storiesStatus?.isLoading === true}/>
    </div>
  );
};
