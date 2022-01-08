import axios from "axios";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import moment from "moment";
import LoadingSpinner from "../components/LoadingSpinner";
import Header from "../components/Header";
import LikeButton from "../components/LikeButton";

export default function Home({ data }) {
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [likeImage, setLikeImage] = useState(false);
  const [date, setDate] = useState(() => {
    let initialDate = new moment();
    return initialDate;
  });

  useEffect(() => {
    let formattedDate = date;
    console.log(formattedDate);
    let formattedDateClone = formattedDate.clone().format("YYYY-MM-DD");
    console.log(formattedDateClone);

    axios
      .get(
        `https://api.nasa.gov/planetary/apod?date=${formattedDateClone}&api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}`
      )
      .then(function (response) {
        setImages(response.data);
        console.log(response.data);
        setTimeout(() => {
          setLoading(false);
        }, 1100);
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
        {images ? (
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center h-auto mt-2 rounded-md shadow-lg m-4">
              <Image
                className="rounded-md p-4 "
                width={500}
                height={500}
                src={images.url}
              />
            </div>
            <section className="max-w-xl p-4">
              <div className="flex justify-between">
                <h4 className="font-[700] text-xl">{images.title}</h4>
                <button
                  className="text-[#aeb0b5]"
                  onClick={decrementDate}
                  title="next image"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex gap-4 items-center">
                <h4 className="text-gray-400 font-semibold py-2">
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
        ) : null}
      </main>
    </div>
  );
}
