import React, { useState } from "react";
import { HiOutlineChevronLeft } from "react-icons/hi";
import { HiOutlineChevronRight } from "react-icons/hi";
import LikeButton from "../components/LikeButton";
import GalleryButton from "../components/GalleryButton";
import Image from "next/image";

function MainSection({
  images,
  likeImage,
  incrementDate,
  decrementDate,
  setLikeImage,
  imageDate,
  showLeftChevron,
}) {
  return (
    <main className="relative w-full min-h-screen font-titilluum">
      {images && (
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center h-auto m-4 mt-2 rounded-md shadow-lg">
            {/*APOD sometimes is actually a video, conditionally render an iframe 
            instead of image to support them*/}
            {images.media_type === "image" ? (
              <Image
                alt={images.title}
                className="p-4 rounded-md "
                width={500}
                height={500}
                src={images.media_type === "image" ? images.url : noVideo}
              />
            ) : (
              <iframe
                className="sm:w-[560px] w-[375px] h-[500px]"
                src={images.url}
                title="YouTube video player"
                frameBorder={0}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            )}
          </div>
          <section className="max-w-xl p-4">
            <div className="flex justify-between">
              {/* seems hacky but used a counter to conditionally render the left chevron,
            to avoid the bugs when clicking it on initial render */}
              {showLeftChevron > 0 ? (
                <GalleryButton
                  data-testid="previous-image"
                  changeDate={incrementDate}
                  chevron={
                    <HiOutlineChevronLeft
                      title="previous image"
                      className="w-8 h-8"
                    />
                  }
                />
              ) : (
                <div className="w-6 h-6"></div>
              )}
              <h2 className="font-[700] text-2xl">{images.title}</h2>
              <GalleryButton
                changeDate={decrementDate}
                chevron={
                  <HiOutlineChevronRight
                    title="next image"
                    className="w-8 h-8"
                  />
                }
              />{" "}
            </div>
            <div className="flex items-center gap-4">
              <h3 className="dark:text-gray-300 text-gray-500 font-[600] py-2">
                {imageDate}
              </h3>
              <LikeButton
                likeImage={likeImage}
                setLikeImage={() => setLikeImage(!likeImage)}
              />
            </div>
            <p className="text-gray-900 dark:text-gray-300 text-lg font-[400] text-center">
              {images.explanation}
            </p>
          </section>
        </div>
      )}
    </main>
  );
}

export default MainSection;
