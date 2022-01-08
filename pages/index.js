import axios from "axios";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import moment from "moment";
import LoadingSpinner from "../components/LoadingSpinner";
import Header from "../components/Header";
import LikeButton from "../components/LikeButton";
import noVideo from "../public/assets/no_video.webp";
import DecrementButton from "../components/DecrementButton";

export default function Home() {
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [likeImage, setLikeImage] = useState(false);
  const [date, setDate] = useState(() => {
    let initialDate = new moment();
    return initialDate;
  });

  //Used client side data fetching since SSG/SSR wasnt really feasible here

  useEffect(() => {
    let formattedDate = date;
    let formattedDateClone = formattedDate.clone().format("YYYY-MM-DD");

    axios
      .get(
        `https://api.nasa.gov/planetary/apod?date=${formattedDateClone}&api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}`
      )
      .then((response) => {
        setImages(response.data);
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

  const decrementDate = () => {
    let today = date;
    let todayClone = today.clone().subtract(1, "day");
    setDate(todayClone);
    setLikeImage(false);
    setLoading(true);
  };

  if (images) {
    const imageDate = moment(images.date).format("M-D-YYYY");
  }

  return (
    <div className="relative">
      {loading && <LoadingSpinner />}
      <Header />
      <main className="h-auto w-screen relative font-titilluum">
        {images && (
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center h-auto mt-2 rounded-md shadow-lg m-4">
              <Image
                alt={images.title}
                className="rounded-md p-4 "
                width={500}
                height={500}
                src={images.media_type === "image" ? images.url : noVideo}
              />
            </div>
            <section className="max-w-xl p-4">
              <div className="flex justify-between">
                <h4 className="font-[700] text-xl">{images.title}</h4>
                <DecrementButton decrementDate={decrementDate} />
              </div>
              <div className="flex gap-4 items-center">
                <h4 className="text-gray-500 font-semibold py-2">
                  {imageDate}
                </h4>
                <LikeButton
                  likeImage={likeImage}
                  setLikeImage={() => setLikeImage(!likeImage)}
                />
              </div>
              <p>{images.explanation}</p>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
