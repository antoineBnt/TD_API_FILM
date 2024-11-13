import React, { useState, useEffect } from "react";
import SoonCard from "./SoonCard";

export default function Soon() {
    const [dataSoon, setDataSoon] = useState([]);
    const [dataSoon2, setDataSoon2] = useState([]); 

    useEffect(() => {
        fetch("https://api.tvmaze.com/shows")
        .then((response) => response.json())
        .then((data) => {
            setDataSoon(data);

            const highRatedMovies = data.filter((item) => item.rating.average > 7);
            setDataSoon2(highRatedMovies); 
        })
        .catch((error) => {
            console.error("Erreur lors de la récupération des données :", error);
        });
    }, []);

    return (
        <>
          <section className="w-full">
            <div className="flex overflow-x-scroll overflow-y-hidden pl-10 gap-8">
              {dataSoon2.slice(0, 20).map((item, index) => (
                <SoonCard
                  key={index}
                  img={item.image ? item.image.original : null}
                  titre={item.name}
                />
              ))}
            </div>
          </section>
        </>
      );}
