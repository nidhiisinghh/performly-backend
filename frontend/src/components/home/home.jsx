import React from "react";
import LoaderText from "../animate/loader";
import Picture from "../animate/lottie";
import { useNavigate } from "react-router-dom";
import Cardsele from "../card/uf"
import Footer from "../footer/footer"

const Home = () => {
  const navigateto = useNavigate();
  const handlenavigate = () => {
    navigateto("/signin");
  };

  let stackArea = document.querySelector(".third-page");

  window.addEventListener("scroll", ()=>{
    let distance = window.innerHeight/2;
    let topval = stackArea.getBoundingClientRect().top;
    let index = -1 * (topval/distance +1);
    index,Math.floor
  });

  const images = [
    { src: "bands.webp", name: "Bands" },
    { src: "comedian.jpg", name: "Comedians" },
    { src: "dancer.jpg", name: "Dancers" },
    { src: "DJS.webp", name: "DJs" },
    { src: "magician.jpg", name: "Magicians" },
    { src: "musician.webp", name: "Musicians" },
  ];
  const secondSlideText = [
    " BANDS ",
    " COMEDIANS ",
    " DANCERS ",
    " DJS ",
    " MAGICIAN ",
    "MUSICIANS",
    "RAPPERS",
    "ENTERTAINERS",
    "LYRICISTS",
    "VOCALISTS",
    "PAINTERS",
    "ACTORS",
  ];

  return (
    <div className="main h-full">
     <div>
  <header className="head fixed top-0 z-50 h-20 w-screen flex items-center justify-between bg-black/10 backdrop-blur-md border-b border-white/10">

    <div className="logo flex items-center pl-10">
      <img src="./logoo.png" alt="Logo" className="h-12" />
    </div>

    {/* Login button on the right */}
    <div className="flex pr-10 items-center">
      <button
        className="h-10 px-6 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:scale-105 transition-all duration-300 ease-in-out"
        onClick={handlenavigate}
      >
        LOGIN
      </button>
    </div>
  </header>
</div>

      <div className="home-container overflow-x-hidden min-h-screen w-screen relative bg-black text-white">
        <div className="service-text flex flex-col lg:flex-row h-screen w-full relative z-10">
          <div className="w-full lg:w-2/5 h-full flex flex-col justify-center p-10 lg:pl-20">
            <div className="text-pos w-full mb-8">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                FIND YOUR PERFORMER
              </h1>
            </div>
            <div className="textaniamte flex w-full mb-8">
              <LoaderText />
            </div>
            <div className="third w-full">
              <h1 className=" text-gray-300 text-2xl lg:text-3xl font-light leading-relaxed">
                Your Gateway to Incredible Gigs and Unforgettable Events!
              </h1>
            </div>
          </div>
          <div className="second h-screen w-3/5 flex items-center relative overflow-hidden">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-l from-black via-transparent to-transparent z-20 pointer-events-none"></div>
            
            <div className="slider w-1/3 h-[120%] -rotate-6 transform translate-y-[-10%] opacity-80">
              <div className="w-full relative h-full">
                <div className="animate-slide absolute left-0">
                  {[...images, ...images].map((item, i) => (
                    <div
                      key={i}
                      className="w-full p-2"
                    >
                      <div className="rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/20">
                        <img
                          src={item.src}
                          className="h-64 w-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="slider2 w-1/3 h-[120%] -rotate-6 transform translate-y-[-20%] opacity-60 mx-4">
              <div className="w-full relative h-full">
                <div className="animate-slide2 absolute left-0">
                  {[...images, ...images, ...images].map((item, i) => (
                    <div
                      key={i}
                      className="w-full p-2"
                    >
                      <div className="rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/20">
                        <img
                          src={item.src}
                          className="h-64 w-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
             <div className="slider3 w-1/3 h-[120%] -rotate-6 transform translate-y-[-5%] opacity-40">
              <div className="w-full relative h-full">
                 <div className="animate-slide absolute left-0" style={{animationDuration: '25s'}}>
                  {[...images, ...images].map((item, i) => (
                    <div
                      key={i}
                      className="w-full p-2"
                    >
                      <div className="rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/20">
                        <img
                          src={item.src}
                          className="h-64 w-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}

      
      <div className="second-page min-h-screen w-screen bg-black relative py-20">
        <div className="one h-20 bg-blue-900/10 border-y border-blue-900/30 flex items-center overflow-hidden mb-20 backdrop-blur-sm">
          <div className="secondslide-text space-x-20 font-bold text-2xl text-blue-400/50 whitespace-nowrap items-center tracking-widest">
            {[...secondSlideText, ...secondSlideText, ...secondSlideText].map(
              (text, index) => (
                <span key={index}>✦ {text}</span>
              )
            )}
          </div>
        </div>
        
        <div className="container mx-auto px-10">
          <div className="mb-16">
            <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-500 mb-4 appearanimation">
              What We Do
            </h1>
            <p className="text-2xl text-gray-400 max-w-2xl secondtext">
              Connecting artists and organizers effortlessly to spotlight and discover talent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="appearanimation2 p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-lg hover:bg-white/10 transition-all duration-500 group">
              <h1 className="text-4xl font-bold text-blue-400 mb-6 group-hover:text-blue-300">Performers</h1>
              <p className="text-gray-300 text-lg leading-relaxed">
                We empower performers with a platform to showcase their talent, manage gigs effortlessly, and secure fast, hassle-free payments. Build a captivating brand, grow your reputation with verified reviews, and stay connected with a supportive community.
              </p>
            </div>

            <div className="appearanimation p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-lg hover:bg-white/10 transition-all duration-500 group">
              <h1 className="text-4xl font-bold text-blue-400 mb-6 group-hover:text-blue-300">Clients & Organizers</h1>
              <p className="text-gray-300 text-lg leading-relaxed">
                Clients and event organizers can discover exceptional local talent, from musicians and magicians to comedians and dancers. Effortlessly browse and filter by category, price, availability, and location. Enjoy hassle-free bookings with instant gig requests.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="third-page h- w-full">
                 <Cardsele/>
       
</div>

<div className="w-full ">
  <Footer/>
</div>
      
    </div>
  );
};

export default Home;
