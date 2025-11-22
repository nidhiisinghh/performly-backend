
import React, { useState, useEffect } from "react";

const words = [
  "Musicians", "DJ's", "Dancers", "Magicians", "Comedians", "Singers",
  "Entertainers", "Models", "Actors", "Actresses", "Performers", "Artists", "Celebrities",
  "Influencers", "Impersonators", "Voice Over Artists", "Musical Artists", "Vocalists",
  "Rappers", "Songwriters", "Lyricists", "Producers", "Directors", "Writers", "DJs", "Dancers",
  "Magicians", "Comedians", "Singers", "Entertainers", "Models", "Actors", "Actresses",
  "Performers", "Artists", "Celebrities", "Influencers", "Impersonators", "Voice Over Artists",
  "Musical Artists", "Vocalists", "Rappers", "Songwriters", "Lyricists", "Producers", "Directors"
];

const Loader = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedText("");
      setTimeout(() => {
        setDisplayedText(words[currentIndex]);
        setCurrentIndex((prev) => (prev + 1) % words.length);
      }, 100); 
    }, 1000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="background-screen h-full w-full ">
      <div className="typewriter-text h-90 w-full flex items-center 
       border-black text-sky-900 text-8xl font-bold">
        {displayedText}
      </div>
    </div>
  );
};

export default Loader;