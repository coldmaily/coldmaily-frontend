"use client";

import { redirectToGoogleLogin } from "@/libapi/api";

const Header = () => {
    return (
      <header className="bg-gray-900 text-white py-4 px-6 sticky w-full top-0 z-50 shadow-md backdrop-blur-lg">
        <div className="max-w-7xl mx-auto flex items-center w-full">
          
          {/* Left - Logo (Pushed More Left) */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold">ColdMaily</h1>
          </div>
  
          {/* Center - Navigation Tabs (Centered) */}
          <nav className="flex-1 flex justify-center">
            <ul className="flex space-x-8 text-lg">
              <li><a href="#" className="hover:text-[#89D2DC]">How It Works</a></li>
              <li><a href="#" className="hover:text-[#89D2DC]">Use Cases</a></li>
              <li><a href="#" className="hover:text-[#89D2DC]">FAQ</a></li>
            </ul>
          </nav>
  
          {/* Right - Buttons (Pushed More Right) */}
          <div className="flex-1 flex justify-end space-x-4">
            <button onClick={redirectToGoogleLogin} className="px-3 py-0.8 cursor-pointer text-lg hover:text-[#89D2DC]">
              Login
            </button>
            <button onClick={redirectToGoogleLogin} className="px-5 py-1.25 bg-gray-400 cursor-pointer text-gray-900 text-lg font-semibold rounded-full transition-all duration-300 hover:bg-white">
              Get Started - It's free
            </button>
          </div>
  
        </div>
      </header>
    );
  };
  
  export default Header;
  