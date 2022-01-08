import Head from "next/head";
import axios from "axios";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import moment from "moment";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Home() {
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
    const imageDate = moment(images.date).format("MM-D-YYYY");
  }

  return (
    <main className="h-auto w-screen relative font-sans">
      {loading && <LoadingSpinner />}
      {images ? (
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-screen h-auto p-4 rounded-md">
            <Image
              className="rounded-md shadow-md"
              width={500}
              height={500}
              src={images.url}
            />
          </div>
          <section className="max-w-xl p-4">
            <div className="flex justify-between">
              <h4 className="font-[700] text-lg">{images.title}</h4>
              <button
                className="text-[#aeb0b5]"
                onClick={decrementDate}
                title="next image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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
              <h4 className="text-[#aeb0b5] font-semibold py-2">{imageDate}</h4>
              <button
                className="h-8 w-8 text-[#02bfe7]"
                title="like"
                onClick={() => setLikeImage(!likeImage)}
              >
                {likeImage ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
            <p>{images.explanation}</p>
          </section>
        </div>
      ) : null}
    </main>
  );
}
