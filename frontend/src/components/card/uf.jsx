import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const uf = () => {

  const navigateto = useNavigate();
  const handlenavigate = () => {
    navigateto("/signin");
  };
  const rotateCards = () => {
    const cards = document.querySelectorAll(".cards");
    let angle = 0;
    cards.forEach((card, index) => {
      if (card.classList.contains("away")) {
        card.style.transform = `translateY(-120vh) rotate(-48deg)`;
      } else {
        card.style.transform = `rotate(${angle}deg)`;
        angle -= 10;
        card.style.zIndex = cards.length - index;
      }
    });
  };

  useEffect(() => {
    rotateCards();
  }, []);

  useEffect(() => {
    const stackArea = document.querySelector(".stackarea");
    const cards = document.querySelectorAll(".cards");

    const handleScroll = () => {
      const distance = window.innerHeight / 2;
      const topval = stackArea.getBoundingClientRect().top;
      let index = -1 * (topval / distance + 1);
      index = Math.floor(index);

      for (let i = 0; i < cards.length; i++) {
        if (i <= index) {
          cards[i].classList.add("away");
        } else {
          cards[i].classList.remove("away");
        }
      }

      rotateCards();
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <div className="stackarea h-[300vh] w-full bg-black flex relative">
         {/* Background Gradients */}
         <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="w-1/2  basis-[50%] sticky top-0 h-dvh z-10">
          <div className="h-full w-full  flex items-center justify-center">
            <h1 className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400">What we OFFER !!</h1>
          </div>
        </div>
        <div className="w-1/2  basis-[50%] relative sticky top-0 h-dvh z-10">
          <div className="cards shadow-2xl h-140 w-140 absolute top-1/5 shadow-blue-900/20 left-1/5 border border-white/10 rounded-3xl flex justify-center backdrop-blur-xl bg-white/5 text-xl font-medium text-white items-center p-10">
            <p className="text-center leading-relaxed">
            <span className="text-blue-400 font-bold block mb-4 text-2xl">For Performers</span>
            Create a captivating profile with images, videos, and a compelling
            bio that highlights your talent and experience. Manage Your Gigs:
            Easily track your bookings, update availability, and get real-time
            notifications. Get Paid Securely: Receive hassle-free, timely
            payments with seamless integrations. Grow Your Reputation: Collect
            ratings and reviews to enhance your visibility in the gig community.
            </p>
          </div>
          <div className="cards h-140 w-140 absolute shadow-blue-900/20 bg-white/5 backdrop-blur-xl top-1/5 left-1/5 border border-white/10 rounded-3xl shadow-2xl flex justify-center text-xl font-medium text-white items-center p-10">
            <p className="text-center leading-relaxed">
              <span className="text-blue-400 font-bold block mb-4 text-2xl">For Clients</span>
              Browse a wide range of performers—musicians, magicians, comedians,
              dancers, and more. Filter & Find: Search by category, price,
              availability, and location to find your perfect match. Hassle-free
              Bookings: Send gig requests, confirm availability, and make secure
              payments—all in one place.
            </p>
          </div>
          
          <div className="cards h-140 w-140 bg-gradient-to-br from-blue-900 to-black shadow-blue-900/50 absolute top-1/5 left-1/5 shadow-2xl rounded-3xl flex justify-center items-center border border-white/10">
            {" "}
            <button    onClick={handlenavigate} className="px-12 py-6 rounded-2xl shadow-2xl hover:scale-105 bg-gradient-to-r from-blue-600 to-blue-400 text-white text-3xl font-bold transition-all border-0 ease-in-out duration-300 hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]">
              LOGIN
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default uf;
