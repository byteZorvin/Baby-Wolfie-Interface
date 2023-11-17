import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Hero = () => {
  const [buttonText, setButtonText] = useState('Enter the Forest');
  const handleButtonClick = () => {
    setButtonText('Go Back to the main menu')
  };

  return (
    <div className="bg-container bg-opacity-40">
      <header className="absolute inset-x-0 top-0 z-50">
        <Navbar buttonText = {buttonText} handleButtonClick = {handleButtonClick} buttonLink="/welcome"/>       </header>
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-28 lg:py-32">
          <div className="text-center">
            <h1 className="text-8xl font-headline text-[#00a0fce7] tracking-tight" >
              Baby Wolfie
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-800 font-text">
              Play, Share, Earn and enjoy the cutest experience available on Aptos
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
                <button
                  className="rounded-xl bg-gray-800 px-3.5 py-2.5 text-lg font-text text-white shadow-sm hover:bg-black-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                >
                  Launch Game <span aria-hidden="true">→</span>
                </button>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>

  )
}

export default Hero;