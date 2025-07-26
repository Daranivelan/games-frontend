import { useState, useEffect } from "react";
import GOW from "../assets/God_of_War.jpg";
import ER from "../assets/Elden_Ring.jpg";
import BMW from "../assets/Black_Myth_Wukong.jpeg";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Carosel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: BMW,
      title: "Black Myth: Wukong",
      subtitle: "An action RPG rooted in Chinese mythology",
      price: "$59.99",
      originalPrice: "$79.99",
      description:
        "Experience the legendary tale of the Monkey King in this visually stunning action RPG.",
      badge: "NEW RELEASE",
      badgeColor: "bg-red-600",
    },
    {
      image: ER,
      title: "Elden Ring",
      subtitle: "A new fantasy action RPG adventure",
      price: "$49.99",
      originalPrice: "$59.99",
      description:
        "Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring.",
      badge: "AWARD WINNER",
      badgeColor: "bg-yellow-600",
    },
    {
      image: GOW,
      title: "God of War",
      subtitle: "His vengeance against the Gods of Olympus years behind him",
      price: "$39.99",
      originalPrice: "$49.99",
      description:
        "Kratos and his son Atreus embark on a deeply personal journey through Norse mythology.",
      badge: "BESTSELLER",
      badgeColor: "bg-blue-600",
    },
  ];

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative">
      <Carousel
        selectedItem={currentSlide}
        onChange={handleSlideChange}
        autoPlay
        infiniteLoop
        interval={5000}
        stopOnHover
        showStatus={false}
        showThumbs={false}
        showArrows={false}
        showIndicators={false}
        className="carousel-container"
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            {/* Background Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-6 lg:px-12">
                <div className="max-w-2xl text-left text-white">
                  {/* Badge */}
                  <div className="mb-4">
                    <span
                      className={`${slide.badgeColor} text-white px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wide`}
                    >
                      {slide.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="text-2xl lg:text-6xl font-bold mb-4 leading-tight">
                    {slide.title}
                  </h1>

                  {/* Subtitle */}
                  <p className="text-lg lg:text-xl text-gray-300 mb-4 leading-relaxed">
                    {slide.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-base lg:text-lg text-gray-400 mb-6 leading-relaxed max-w-lg">
                    {slide.description}
                  </p>

                  {/* Price */}
                  {/* <div className="flex items-center space-x-4 mb-8">
                      <span className="text-3xl lg:text-4xl font-bold text-[#ff4e08]">
                        {slide.price}
                      </span>
                      <span className="text-lg text-gray-400 line-through">
                        {slide.originalPrice}
                      </span>
                      <span className="bg-green-600 text-white px-2 py-1 rounded text-sm font-medium">
                        Save{" "}
                        {Math.round(
                          ((parseFloat(slide.originalPrice.replace("$", "")) -
                            parseFloat(slide.price.replace("$", ""))) /
                            parseFloat(slide.originalPrice.replace("$", ""))) *
                            100
                        )}
                        %
                      </span>
                    </div> */}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2">
                      <span>Learn More</span>
                    </button>
                    <button className="bg-[#ff4e08] hover:bg-[#e63e00] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 4H4m4 9v6a1 1 0 001 1h10a1 1 0 001-1v-6M9 19.5h.01M20 19.5h.01"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Custom Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "bg-[#ff4e08] scale-125"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Custom Navigation Arrows */}
      <button
        onClick={() =>
          goToSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1)
        }
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={() =>
          goToSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1)
        }
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Slide Counter */}
      <div className="absolute top-6 right-6 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );
};

export default Carosel;
