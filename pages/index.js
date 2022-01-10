import axios from "axios";
import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useState, useEffect, useReducer } from "react";
import moment from "moment";
import LoadingSpinner from "../components/LoadingSpinner";
import Header from "../components/Header";
import LikeButton from "../components/LikeButton";
import noVideo from "../public/assets/no_video.webp";
import GalleryButton from "../components/GalleryButton";
import { HiOutlineChevronLeft } from "react-icons/hi";
import { HiOutlineChevronRight } from "react-icons/hi";
export const nasaUrl = "https://api.nasa.gov/planetary/apod?date=";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [likeImage, setLikeImage] = useState(false);
  const [date, setDate] = useState(() => {
    let initialDate = new moment();
    return initialDate;
  });

  //Used client side data fetching since the image changes daily.
  useEffect(() => {
    let formattedDate = date;
    let formattedDateClone = formattedDate.clone().format("YYYY-MM-DD");

    axios
      .get(
        `${nasaUrl}${formattedDateClone}&api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}`
      )
      .then((response) => {
        setImages(response.data);
        console.log(response.data);
        setTimeout(() => {
          setLoading(false);
        }, 900);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  }, [date]);

  const setNewDate = (todayClone) => {
    setDate(todayClone);
    setLikeImage(false);
    setLoading(true);
  };

  const decrementDate = () => {
    let today = date;
    let todayClone = today.clone().subtract(1, "day");
    setNewDate(todayClone);
  };

  const incrementDate = () => {
    let today = date;
    let todayClone = today.clone().add(1, "day");
    setNewDate(todayClone);
  };

  if (images) {
    const imageDate = moment(images.date).format("M-D-YYYY");
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // To avoid hydration mismatch errors when loading dark/light theme, since it's impossible to know the theme
  // on the server -->

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="relative dark:bg-[#111827] bg-gray-200 transition duration-500 ease-in-out">
      {loading && <LoadingSpinner />}
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="relative w-full h-auto font-titilluum">
        {images && (
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center h-auto m-4 mt-2 rounded-md shadow-lg">
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
                <GalleryButton
                  changeDate={incrementDate}
                  chevron={
                    <HiOutlineChevronLeft
                      title="previous image"
                      className="w-8 h-8"
                    />
                  }
                />
                <h4 className="font-[700] text-2xl">{images.title}</h4>
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
                <h4 className="dark:text-gray-300 text-gray-500 font-[600] py-2">
                  {imageDate}
                </h4>
                <LikeButton
                  likeImage={likeImage}
                  setLikeImage={() => setLikeImage(!likeImage)}
                />
              </div>
              <p className="text-gray-900 dark:text-gray-300 text-lg font-[400]">
                {images.explanation}
              </p>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
