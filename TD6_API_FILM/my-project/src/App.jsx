import React, { useState } from "react";
import SmallCard from "./components/SmallCard";
import Card from "./components/Card";
import BG from "./components/BG";
import Soon from "./components/Soon";
import {
  motion,
  useViewportScroll,
  useSpring,
  useTransform,
} from "framer-motion";

function TvMazeSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (searchTerm.trim() === "") return;
    setLoading(true);
    fetch(
      `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(searchTerm)}`
    )
      .then((response) => response.json())
      .then((data) => {
        setShows(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
        setLoading(false);
      });
  };

  const { scrollY } = useViewportScroll();

  const springY = useSpring(scrollY, {
    stiffness: 150,
    damping: 20,
    mass: 0.5,
  });

  const y = useTransform(springY, [0, 1000], [0, -200]);

  return (
    <section className="relative">
      <section className="flex justify-center flex-col gap-4 items-center h-screen w-screen relative">
        <BG />
        <Card />
      </section>

      <motion.section style={{ y }} className="w-full">
        <h1 className="text-[2rem] font-regular font-sf-pro mb-8 ml-20 text-white bg-GrisInter p-6 rounded-3xl w-min whitespace-nowrap">
          Série les mieux noté
        </h1>
        <div className="flex overflow-x-scroll overflow-y-hidden pl-10 gap-8">
          <Soon />
        </div>
      </motion.section>
      <section className="w-full h-full flex flex-col items-center gap-32 py-8 z-10 mt-60">
        <motion.div
          style={{ y }}
          className="mb-12 text-center z-10 flex w-3/5 flex-col items-start gap-4"
        >
          <h1 className="text-2xl font-bold mb-4 text-white pl-6 font-sf-pro">
            Recherche de Films et Séries TV
          </h1>
          <div className="flex flex-row gap-4 p-6 bg-GrisInter rounded-[2.2rem] w-full justify-between">
            <input
              type="text"
              placeholder="Entrez le nom de la serie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              className="bg-transparent text-white w-full"
            />
            <button onClick={handleSearch} className=" text-white p-2 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </div>
        </motion.div>
        <section className="flex flex-wrap items-center justify-center gap-16 m-2">
          {loading && <p className="text-white">Chargement...</p>}
          {shows.length > 0
            ? shows.map((item, index) => (
                <SmallCard
                  key={item.show.id}
                  index={index}
                  springY={springY}
                  name={item.show.name}
                  genres={item.show.genres}
                  runtime={item.show.runtime}
                  rating={item.show.rating.average}
                  summary={item.show.summary}
                  image={item.show.image ? item.show.image.medium : null}
                />
              ))
            : !loading && (
                <p className="text-white">
                  Aucun résultat trouvé. Veuillez effectuer une recherche.
                </p>
              )}
        </section>
      </section>
    </section>
  );
}

export default TvMazeSearch;
