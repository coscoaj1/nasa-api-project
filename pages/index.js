import axios from "axios";
import { useTheme } from "next-themes";
import React, { useState, useEffect, useReducer } from "react";
import moment from "moment";
import LoadingSpinner from "../components/LoadingSpinner";
import Header from "../components/Header";
import MainSection from "../components/MainSection";
import Footer from "../components/Footer";

export const nasaUrl = "https://api.nasa.gov/planetary/apod?date=";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showLeftChevron, setShowLeftChevron] = useState(0);
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
    setShowLeftChevron(showLeftChevron + 1);
  };

  const incrementDate = () => {
    let today = date;
    let todayClone = today.clone().add(1, "day");
    setNewDate(todayClone);
    setShowLeftChevron(showLeftChevron - 1);
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
      <MainSection
        images={images}
        likeImage={likeImage}
        setLikeImage={setLikeImage}
        incrementDate={incrementDate}
        decrementDate={decrementDate}
        imageDate={imageDate}
        showLeftChevron={showLeftChevron}
      />
      <Footer />
    </div>
  );
}
