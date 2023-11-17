import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Hero from '@/pages/hero';
import Navbar from '@/components/Navbar';

const Home = () => {
  return (
    <div className='bg-container'>
      <Head>
        <title>Baby Wolfie</title>
        <meta
          name="description"
          content="Baby Wolfie Game on Aptos"
        />
      </Head>

      <Hero />
    </div>
  )
}

export default Home;

