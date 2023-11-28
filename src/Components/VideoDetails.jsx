import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiOutlineLink } from "react-icons/ai";
import { abbreviateNumber } from "js-abbreviation-number";
import { fetchDataFromApi } from "../utils/api";
import { Context } from "../context/contextApi";
import SuggestedVideoCard from "./SuggestedVideoCards";

const VideoDetails = () => {
  const [video, setvideo] = useState();
  const [relatedVideos, setrelatedVideos] = useState();
  const { id } = useParams();
  const { setLoading } = useContext(Context);

  const fetchVideoDetails = () => {
    setLoading(true);
    fetchDataFromApi(`video/details/?id=${id}`).then((data) => {
      setvideo(data);
      setLoading(false);
    });
  };

  const fetchRelatedVideos = () => {
    setLoading(true);
    fetchDataFromApi(`video/related-contents/?id=${id}`).then((data) => {
      setrelatedVideos(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchVideoDetails();
    fetchRelatedVideos();
  }, [id]);

  return (
    <div className="flex justify-center p-4 flex-row h-[calc(100%-56px)] bg-black ">
      <div className="w-full max-w-[1280px] flex flex-col lg:flex-row ">
        <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 overflow-y-auto s">
          <div className="h-[200px] md:h-[40px] lg:h-[400px] xl:h-[550px] ml-[-16px] lg;ml-0 mr-[-16px] lg:mr-0 s ">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              controls
              width="100%"
              height="100%"
              style={{ backgroundColor: "black" }}
              playing={true}
            />
          </div>
          <div className="text-white font-bold text-sm md:text-xl mt-4 line-clamp-2">
            {video?.title}
          </div>
        <div className="flex justify-between flex-col md:flex-row mt-4">
          <div className="flex">
            <div className="flex items-start">
              <div className="flex h-9 w-9 rounded-full overflow-hidden">
                <img
                  src={video?.author?.avatar[0]?.url}
                  alt="avatar"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col ml-3">
              <div className="text-white text-md font-semibold flex items-center ">
              {video?.author?.title}
                {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                  <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
                )}
              </div>
              <div className="text-white/[0.7] text-sm">
                {video?.author?.stats?.subscribersText}
              </div>
            </div>
          </div>
          <div className="flex text-white mt-4 md:mt-0">
            <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15] ">
              <AiOutlineLink className="text-white text-xl mr-2" />
              <span>{`${abbreviateNumber(video?.stats?.likes, 2)} Likes`}</span>
            </div>
            <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15] ml-4 ">
              <AiOutlineLink className="text-white text-xl mr-2" />
              <span className="cursor-pointer">{`${abbreviateNumber(video?.stats?.views, 2)} Views`}</span>
            </div>
          </div>
        </div>
        </div>
        <div className="flex flex-col py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px] scrollbar-hide  "> 
          {relatedVideos?.contents?.map((item, index) => {
            if (item?.type !== "video") return false;
            return <SuggestedVideoCard video={item?.video} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
