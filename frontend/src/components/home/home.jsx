import React, { useState, useEffect } from "react";
import Lenis from 'lenis'
import LoaderText from "../animate/loader";
import Picture from "../animate/lottie";
import { useNavigate } from "react-router-dom";
import Cardsele from "../card/uf"
import Footer from "../footer/footer"

const InfoCard = ({ title, description }) => (
  <div className="bg-white w-full min-h-[400px] rounded-2xl shadow-xl border border-black/5 overflow-hidden hover:scale-[1.02] transition-transform duration-300 group">
    <div className="flex p-4 gap-2 bg-white border-b border-black/5">
      <span className="bg-gray-300 w-3 h-3 rounded-full"></span>
      <span className="bg-gray-300 w-3 h-3 rounded-full"></span>
      <span className="bg-gray-300 w-3 h-3 rounded-full"></span>
    </div>
    <div className="p-12 flex flex-col justify-center h-full">
      <h1 className="text-5xl font-bold text-black mb-8">{title}</h1>
      <p className="text-black/80 text-xl leading-relaxed">{description}</p>
    </div>
  </div>
);

const Home = () => {
  const navigateto = useNavigate();
  const handlenavigate = () => {
    navigateto("/signup");
  };



  const images = [
    { src: "bands.webp", name: "Bands" },
    { src: "comedian.jpg", name: "Comedians" },
    { src: "dancer.jpg", name: "Dancers" },
    { src: "DJS.webp", name: "DJs" },
    { src: "magician.jpg", name: "Magicians" },
    { src: "musician.webp", name: "Musicians" },
  ];
  /* Parallax Logic */
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const lenis = new Lenis()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])

  const parallaxImages = [
    { src: "bands.webp", top: "10%", left: "10%", speed: 2 },
    { src: "comedian.jpg", top: "20%", right: "15%", speed: -3 },
    { src: "dancer.jpg", bottom: "15%", left: "15%", speed: 1.5 },
    { src: "DJS.webp", bottom: "20%", right: "10%", speed: -2 },
    { src: "magician.jpg", top: "50%", left: "5%", speed: 1 },
    { src: "musician.webp", top: "45%", right: "5%", speed: -1.5 },
  ];

  return (
    <div className="main min-h-screen w-full bg-white relative">
      <div>
        <header className="head fixed top-0 z-50 h-20 w-screen flex items-center justify-between bg-transparent">

          <div className="logo flex items-center pl-10">
            <img src="./logoo.png" alt="Logo" className="h-12" />
          </div>

          {/* Login button on the right */}
          <div className="flex pr-10 items-center">
            <button
              className="h-10 px-6 rounded-full bg-transparent border border-black text-black font-semibold hover:bg-black hover:text-white hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:scale-105 transition-all duration-300 ease-in-out"
              onClick={handlenavigate}
            >
              LOGIN
            </button>
          </div>
        </header>
      </div>

      <div className="home-container overflow-x-hidden min-h-screen w-screen relative bg-white text-black flex items-center justify-center">
        {/* Parallax Background Images */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {parallaxImages.map((img, index) => (
            <img
              key={index}
              src={img.src}
              alt="floating"
              className="absolute w-32 md:w-48 lg:w-60 object-cover rounded-xl shadow-2xl opacity-60 hover:opacity-100 transition-opacity duration-300"
              style={{
                top: img.top,
                left: img.left,
                right: img.right,
                bottom: img.bottom,
                transform: `translate(${mousePos.x * img.speed}px, ${mousePos.y * img.speed}px)`,
                transition: "transform 0.1s ease-out",
              }}
            />
          ))}
        </div>
        <div className="service-text flex flex-col items-center justify-center h-screen w-full relative z-10 text-center px-4">
          <div className="max-w-4xl flex flex-col items-center justify-center">
            <div className="mb-4">
              <h1 className="text-[13rem] font-bold tracking-tighter  text-black ">
                FIND YOUR PERFORMER
              </h1>
            </div>
            <div>
              <h2 className="text-gray-700 text-2xl lg:text-3xl font-light leading-relaxed">
                Your gateway to incredible gigs and unforgettable events!
              </h2>
            </div>
          </div>
        </div>
      </div>{" "}


      <div className="second-page min-h-screen w-screen bg-white relative py-20">
        <div className="one h-20 flex items-center overflow-hidden mb-20 bg-transparent">
        </div>

        <div className="container mx-auto px-10">
          <div className="mb-16">
            <h1 className="text-7xl font-bold text-black mb-6 appearanimation">
              What We Do
            </h1>
            <p className="text-2xl text-black/60 max-w-2xl secondtext">
              Connecting artists and organizers effortlessly to spotlight and discover talent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="appearanimation2">
              <InfoCard
                title="Performers"
                description="We empower performers with a platform to showcase their talent, manage gigs effortlessly, and secure fast, hassle-free payments. Build a captivating brand, grow your reputation with verified reviews, and stay connected with a supportive community."
              />
            </div>

            <div className="appearanimation">
              <InfoCard
                title="Clients & Organizers"
                description="Clients and event organizers can discover exceptional local talent, from musicians and magicians to comedians and dancers. Effortlessly browse and filter by category, price, availability, and location. Enjoy hassle-free bookings with instant gig requests."
              />
            </div>
          </div>
        </div>
      </div>
      <div className="third-page min-h-screen w-full">
        <Cardsele />

      </div>

      <div className="w-full ">
        <Footer />
      </div>

    </div>
  );
};

export default Home;
