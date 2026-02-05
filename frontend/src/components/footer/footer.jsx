import React from 'react';

export default function Footer() {
  return (
    <div
      className="relative h-[500px]"
      style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
    >
      <div className="fixed bottom-0 h-[500px] w-full">
        <Content />
      </div>
    </div>
  )
}

function Content() {
  return (
    <div className="bg-black py-8 px-12 h-full w-full flex flex-col justify-between text-white border-t border-white/10">
      <Section1 />
      <Section2 />
    </div>
  )
}

function Section1() {
  return (
    <div>
      <Nav />
    </div>
  )
}

function Section2() {
  return (
    <div className="flex justify-between items-end">
      <h1 className="text-[14vw] leading-[0.8] mt-10 font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
        PERFORMLY
      </h1>
      <p className="text-gray-500">© {new Date().getFullYear()} Performly. All rights reserved.</p>
    </div>
  )
}

function Nav() {
  return (
    <div className="flex shrink-0 gap-20">
      <div className="flex flex-col gap-2">
        <h3 className="mb-2 uppercase text-gray-500 font-bold">Company</h3>
        <p className="hover:text-gray-300 cursor-pointer">About Us</p>
        <p className="hover:text-gray-300 cursor-pointer">Terms & Conditions</p>
        <p className="hover:text-gray-300 cursor-pointer">Privacy Policy</p>
        <p className="hover:text-gray-300 cursor-pointer">Careers</p>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="mb-2 uppercase text-gray-500 font-bold">Quick Links</h3>
        <p className="hover:text-gray-300 cursor-pointer">Home</p>
        <p className="hover:text-gray-300 cursor-pointer">Features</p>
        <p className="hover:text-gray-300 cursor-pointer">Pricing</p>
        <p className="hover:text-gray-300 cursor-pointer">Support</p>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="mb-2 uppercase text-gray-500 font-bold">Follow Us</h3>
        <p className="hover:text-gray-300 cursor-pointer">Twitter</p>
        <p className="hover:text-gray-300 cursor-pointer">Instagram</p>
        <p className="hover:text-gray-300 cursor-pointer">LinkedIn</p>
        <p className="hover:text-gray-300 cursor-pointer">Facebook</p>
      </div>
    </div>
  )
}
