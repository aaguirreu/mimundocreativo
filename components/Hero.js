import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import cactus from "../public/assets/cactus.png";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="flex flex-col max-w-6xl py-1 mx-auto space-y-1 md:space-y-12 md:py-12 md:flex-row">
      <div className="flex flex-col items-center justify-center w-full md:w-1/2">
        <div className="w-5/6 max-w-xs mx-auto space-y-1 text-center lg:max-w-md md:w-full md:text-left">
          <h1 className="text-3xl font-extrabold text-white font-primary sm:text-4xl md:text-5xl md:leading-tight">
            Personaliza <span className="text-success">agendas, </span>stickers, {" "}
            <span className="text-success">decoración, </span>encintados, {" "}
            <span className="text-success">estampados, </span> y más...{" "}
          </h1>
          <p className="text-base text-gray-500 font-secondary md:text-lg lg:text-xl">
            Busca eso que deseas en nuestra
          </p>
          <Link href= "/products"className="items-center block text-base font-semibold text-gray-500 md:text-lg lg:text-xl">
            tienda!
          </Link>
          <div className="flex space-x-4">
          </div>
        </div>
      </div>
      <motion.div
        className="w-full transform scale-x-125 md:w-1/2 lg:scale-x-100"
        initial={{ opacity: 0, translateY: 60 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.8, translateY: 0 }}
      >
        <Image
          alt="hero-img"
          src={cactus}
          className="object-cover w-full mx-auto shadow rounded-tr-extraLarge rounded-bl-extraLarge h-96 sm:h-112 md:h-120"
        />
      </motion.div>
    </div>
  );
};

export default Hero;
