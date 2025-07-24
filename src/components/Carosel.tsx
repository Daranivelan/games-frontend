import HK from "../assets/Hollow_Knight.jpeg";
import ER from "../assets/Elden_Ring.jpeg";
import BMW from "../assets/Black_Myth_Wukong.jpeg";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Carosel = () => {
  const images = [HK, ER, BMW];
  return (
    <div>
      <Carousel
        width={"100%"}
        autoPlay
        infiniteLoop
        stopOnHover={false}
        // centerMode={true}
        centerSlidePercentage={90}
        showIndicators={false}
        showStatus={false}
        showThumbs={false}
      >
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Slide ${index}`} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Carosel;
