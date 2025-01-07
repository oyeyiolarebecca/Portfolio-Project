// Landing Page 
import React from 'react'
import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  return (

    <div>
      <Head>
        <title>MEDILAB</title>
        <meta name="description" content="Improving health care better together" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center">
            <Image src="/medi.png" alt="Medilab Logo" width={50} height={50} />
            <h1 className="text-xl font-bold text-blue-600 ml-2">Medilab</h1>
          </div>
          <nav className="flex space-x-4">
            <a href="#" className="text-gray-700 hover:text-blue-600">Home</a>
            <a href="#about" className="text-gray-700 hover:text-blue-600">About</a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600">Contact</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="bg-gray-100 py-12">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-center md:text-left">
              <h2 className="text-4xl font-bold text-gray-800">Making Health Care Better Together</h2>
              <p className="text-gray-600 mt-4">
                Our goal is to provide user-friendly interface for both patients and healthcare professionals
              </p>
              <div className="mt-6 space-x-4">
                <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
                  Get Started
                </button>
                <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded hover:bg-gray-300">
                  Learn More
                </button>
              </div>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <Image
                src="/image.png"
                alt="Doctor Image"
                width={500}
                height={500}
                className="rounded-lg"
              />
            </div>
          </div>
        </section>

        <section className="bg-white py-12">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Image src="/Primary-care.png"
               alt="Primary Care" width={100} height={100} />
              <h3 className="text-xl font-bold text-gray-800 mt-4">Primary Care</h3>
              <p className="text-gray-600 mt-2">Comprehensive primary care services for all ages.</p>
            </div>
            <div className="text-center">
              <Image src="/Emergency.png" alt="Emergency Cases" width={100} height={100} />
              <h3 className="text-xl font-bold text-gray-800 mt-4">Emergency Cases</h3>
              <p className="text-gray-600 mt-2">24/7 emergency support and care for urgent needs.</p>
            </div>
            <div className="text-center">
              <Image src="/online appointment.png" alt="Online Appointment" width={100} height={100} />
              <h3 className="text-xl font-bold text-gray-800 mt-4">Online Appointment</h3>
              <p className="text-gray-600 mt-2">Schedule your appointments conveniently online.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Medilab. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
