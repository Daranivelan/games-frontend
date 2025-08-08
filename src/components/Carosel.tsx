import { useState } from "react";
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
    <div className="relative w-full">
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
            <div className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[90vh] relative overflow-hidden">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30 sm:from-black/80 sm:via-black/40 sm:to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-center">
              <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
                <div className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl text-left text-white">
                  {/* Badge */}
                  <div className="mb-2 sm:mb-3 lg:mb-4">
                    <span
                      className={`${slide.badgeColor} text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wide shadow-lg`}
                    >
                      {slide.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-bold mb-2 sm:mb-3 lg:mb-4 leading-tight">
                    {slide.title}
                  </h1>

                  {/* Subtitle */}
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-2 sm:mb-3 lg:mb-4 leading-relaxed">
                    {slide.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-400 mb-4 sm:mb-5 lg:mb-6 leading-relaxed max-w-xs sm:max-w-sm lg:max-w-lg line-clamp-2 sm:line-clamp-3">
                    {slide.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Custom Navigation Dots */}
      <div className="absolute bottom-3 sm:bottom-4 lg:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
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
        className="absolute left-2 sm:left-3 lg:left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-2.5 lg:p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <svg
          className="w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6"
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
        className="absolute right-2 sm:right-3 lg:right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-2.5 lg:p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <svg
          className="w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6"
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
      <div className="absolute top-3 sm:top-4 lg:top-6 right-3 sm:right-4 lg:right-6 bg-black/50 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm backdrop-blur-sm">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );
};

export default Carosel;
