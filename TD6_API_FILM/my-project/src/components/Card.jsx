import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function Card() {
  const { scrollY } = useScroll();

  const springY = useSpring(scrollY, {
    stiffness: 200,
    damping: 25,
    mass: 0.5,
  });

  const y = useTransform(springY, [0, 1000], [0, -150]);

  const [movieData, setMovieData] = useState(null);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    const fetchRandomMovie = () => {
      if (attempts >= 5) {
        console.error(
          "Impossible de récupérer un film aléatoire après plusieurs tentatives."
        );
        return;
      }

      const randomId = Math.floor(Math.random() * 20000) + 1;

      fetch(`https://api.tvmaze.com/shows/${randomId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Film non trouvé");
          }
          return response.json();
        })
        .then((data) => {
          setMovieData(data);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération du film :", error);
          setAttempts((prev) => prev + 1);
          fetchRandomMovie();
        });
    };

    fetchRandomMovie();
  }, [attempts]);

  if (!movieData) {
    return <p>Chargement du film aléatoire...</p>;
  }

  const title = movieData.name;
  const rating = movieData.rating.average;
  const imageSrc = movieData.image ? movieData.image.original : null;
  const description = movieData.summary;
  const duration = movieData.runtime;
  const style = movieData.type;
  const genre =
    movieData.genres.length > 0 ? movieData.genres.join(", ") : "N/A";

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    const truncated = text.substr(0, maxLength);
    return truncated.substr(0, truncated.lastIndexOf(" ")) + "...";
  };

  const cleanDescription = description
    ? truncateText(description.replace(/<[^>]+>/g, ""), 300)
    : "Pas de description disponible.";

  return (
    <section
      className="h-full w-full flex flex-row justify-center items-center gap-6 z-10"
    >
      <article className="w-[657px] h-[418px] flex flex-col gap-6">
        <article className="flex gap-6">
          <motion.div style={{ y }} className="bg-card w-4/6">
            <h2 className="p-4 bg-clrBleu rounded-3xl title-style whitespace-nowrap">
              {title}
            </h2>
          </motion.div>
          <motion.div
            style={{ y }}
            className="flex items-center w-2/6 p-4 bg-clrOrange rounded-3xl bg-card"
          >
            <p className="title-style">{rating ? rating : "N/A"}</p>
            <img src="" alt="" />
          </motion.div>
        </article>

        <motion.article style={{ y }} className="relative">
          <div className="w-full h-[23rem] overflow-hidden rounded-3xl">
            {imageSrc && (
              <img
                src={imageSrc}
                className="w-full h-full object-cover filter blur-sm"
                alt={title}
              />
            )}
          </div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-[23rem] flex justify-center items-center">
            {imageSrc && (
              <img
                src={imageSrc}
                className="h-full object-contain"
                alt={title}
              />
            )}
          </div>
        </motion.article>
      </article>

      <article className="flex flex-col justify-start items-start w-[390px] h-[418px] gap-6">
        <motion.div style={{ y }} className="bg-card w-full">
          <h2 className="title-style">Description</h2>
          <p className="text-style">{cleanDescription}</p>
        </motion.div>
        <article className="flex flex-row gap-6 w-full">
          <motion.div style={{ y }} className="w-3/5 bg-card">
            <h2 className="title-style">Durée</h2>
            <p className="text-style">
              {duration ? `${duration} minutes` : "N/A"}
            </p>
          </motion.div>
          <motion.div style={{ y }} className="w-2/5 bg-card">
            <h2 className="title-style">Style</h2>
            <p className="text-style">{style ? style : "N/A"}</p>
          </motion.div>
        </article>
        <motion.div style={{ y }} className="bg-card w-full">
          <h2 className="title-style">Genre</h2>
          <p className="text-style">{genre}</p>
        </motion.div>
      </article>
    </section>
  );
}
