import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CircleChevronLeft, CircleChevronRight } from 'lucide-react';

const PrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <button
      className={`${className} !flex items-center justify-center w-10 h-10 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition-all duration-200 !z-10`}
      style={{ ...style, left: '20px', bottom: '0px' }}
      onClick={onClick}
      aria-label="Previous slide"
    >
      <CircleChevronLeft className="text-white" />
    </button>
  );
};

const NextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <button
      className={`${className} !flex items-center justify-center w-10 h-10 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition-all duration-200 !z-10`}
      style={{ ...style, left: '70px', bottom: '0px' }}
      onClick={onClick}
      aria-label="Next slide"
    >
      <CircleChevronRight className="text-white" />
    </button>
  );
};

const carouselItems = [
  {
    image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&w=1920&q=80',
    head: 'The issue',
    title: 'Reading a book shouldn’t break the bank.',
    subtitle: "The publishing industry is broken. Books cost a lot, despite the Government making books tax- free.Reading will die, or remain an act for the elite few who could afford those exorbitant prices."
  },
  {
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1920&q=80',
    head: 'The solution',
    title: 'Free books, & libraries everywhere!',
    subtitle: "We’re on a mission to make books available for free to read, and have libraries pop-up everywhere. So, we, the people, can try books, read, return, repeat. And reading can become for the masses. "
  },
  {
    image: 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?auto=format&fit=crop&w=1920&q=80',
    head: 'Join the movement',
    title: 'Calling all fellow readers to join us & save the world.',
    subtitle: 'We’re on a lookout for readers, who’d support us in our mission to get free books and libraries everywhere. Join us if you have books, money, or best wishes to give us.'
  },
];

const Home: React.FC = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    pauseOnHover: false,
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="h-screen w-full relative">
        <Slider {...settings} className="h-full">
          {carouselItems.map((item, index) => (
            <div key={index} className="relative h-screen w-full">
              <div className="absolute inset-0 bg-black bg-opacity-50">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative z-10 flex flex-col items-start justify-center h-full text-left pl-20">
                <h2 className="text-2xl font-poppins font-bold text-white mb-6 drop-shadow-lg">
                  {item.head}
                </h2>
                <h1 className="text-5xl font-poppins md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                  {item.title}
                </h1>
                <p className="text-xl font-comic md:text-2xl text-white mb-8 max-w-2xl drop-shadow">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Home;