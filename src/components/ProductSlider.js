"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const banners = [
  {
    id: 1,
    title: "Premium Ceiling Fans",
    subtitle: "Energy efficient & high speed",
    image: "/Ceiling-Fan.jpg",
  },
  {
    id: 2,
    title: "Bright LED Lights",
    subtitle: "Save power, light more",
    image: "/lights.webp",
  },
  {
    id: 3,
    title: "Fiber Plastic Chairs",
    subtitle: "Flexible and durable chairs",
    image: "/chair.jpg",
  },
  {
    id: 4,
    title: "Modern Electrical Table Fan",
    subtitle: "Safe, durable & stylish",
    image: "/tablefan.webp",
  },
  {
    id: 5,
    title: "Fiber Plastic Switches",
    subtitle: "Flexible and long-lasting switches",
    image: "/switch.webp",
  },
];

export default function ProductSlider() {
  const [current, setCurrent] = useState(0);

  // ✅ Auto slide (stable)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? banners.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % banners.length);
  };

  return (
    <section className="relative w-full h-[200px] sm:h-[280px] md:h-[380px] overflow-hidden">
      {/* SLIDER TRACK */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="relative min-w-full h-full"
          >
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              priority={banner.id === 1}
              className="object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 flex items-center">
              <div className="px-6 md:px-16 text-white max-w-xl">
                <h2 className="text-xl md:text-3xl font-bold">
                  {banner.title}
                </h2>
                <p className="mt-2 text-sm md:text-lg">
                  {banner.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Left Arrow (desktop only) */}
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 text-white w-10 h-10 rounded-full items-center justify-center z-10"
      >
        ‹
      </button>

      {/* Right Arrow (desktop only) */}
      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 text-white w-10 h-10 rounded-full items-center justify-center z-10"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full ${
              i === current ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
