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
        <div className="mx-auto max-w-2xl lg:py-44">
          <div className="text-center">
            <h1 className="text-8xl font-headline text-[#0583d7e7] drop-shadow-2xl tracking-tight" >
              Baby Wolfie
            </h1>
            <h4 className="mt-6 text-xl leading-8 text-white font-text">
              Play, Share, Earn and enjoy the cutest experience available on Aptos
            </h4>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/welcome">
                <button
                  className="rounded-xl bg-gray-800 px-3.5 py-2.5 text-lg font-text text-white shadow-sm hover:bg-black-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"                
                >
                  Launch Game <span aria-hidden="true">→</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>

  )
}

export default Hero;