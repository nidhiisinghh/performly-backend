import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-16 relative border-t border-white/10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start">
            <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400">PERFORMLY</h1>
            <img src="logoo.png" alt="Logo" className="w-40 h-auto mb-6 opacity-80 hover:opacity-100 transition-opacity" />
        </div>
        <div>
          <h2 className="text-xl font-bold mb-6 text-blue-400">COMPANY</h2>
          <ul className="space-y-4 text-gray-400">
            <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">About Us</li>
            <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">Terms & Conditions</li>
            <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">Careers</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-6 text-blue-400">QUICK LINKS</h2>
          <ul className="space-y-4 text-gray-400">
            <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">Home</li>
            <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">Features</li>
            <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">Pricing</li>
            <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">Support</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-6 text-blue-400">FOLLOW US</h2>
          <div className="space-y-4 text-gray-400">
            <a href="#" className="hover:text-white hover:translate-x-1 transition-all block">Twitter</a>
            <a href="#" className="hover:text-white hover:translate-x-1 transition-all block">Instagram</a>
            <a href="#" className="hover:text-white hover:translate-x-1 transition-all block">LinkedIn</a>
            <a href="#" className="hover:text-white hover:translate-x-1 transition-all block">Facebook</a>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="mt-16 pt-8 border-t border-white/10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Performly. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
