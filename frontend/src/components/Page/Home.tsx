import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Slider, { type Settings } from 'react-slick';
import { type CarouselItem } from '@/types';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slide_1 from '@/assets/slide-1.webp';
import Slide_2 from '@/assets/slide-2.webp';
import Slide_3 from '@/assets/slide-3.webp';
import ArrowControls from '@/components/ArrowControls';

const carouselItems: CarouselItem[] = [
  {
    image: Slide_1,
    head: 'The issue',
    title: 'Reading a book shouldn’t break the bank.',
    subtitle: "The publishing industry is broken. Books cost a lot, despite the Government making books tax-free. Reading will die, or remain an act for the elite few who could afford those exorbitant prices."
  },
  {
    image: Slide_2,
    head: 'The solution',
    title: 'Free books, & libraries everywhere!',
    subtitle: "We're on a mission to make books available for free to read, and have libraries pop-up everywhere. So, we, the people, can try books, read, return, repeat. And reading can become for the masses."
  },
  {
    image: Slide_3,
    head: 'Join the movement',
    title: 'Calling all fellow readers to join us & save the world.',
    subtitle: 'We’re on a lookout for readers who’d support us in our mission to get free books and libraries everywhere. Join us if you have books, money, or best wishes to give us.'
  }
];

// Animation variants for text elements
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.1, when: 'afterChildren' },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, y: -30, transition: { duration: 0.3 } },
};

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderRef = useRef<Slider | null>(null);

  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    beforeChange: (_, next) => setCurrentSlide(next),
    pauseOnHover: false,
    cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
    fade: true,
    pauseOnFocus: false,
    swipeToSlide: true,
    draggable: false,
    touchThreshold: 10,
  };

  return (
    <div className="min-h-screen bg-gray-100 overflow-x-hidden">
      <div className="h-screen w-full relative">
        <Slider ref={sliderRef} {...settings} className="h-full">
          {carouselItems.map((item, index) => (
            <div key={`slide-${index}`} className="relative h-screen w-full">
              <div className="absolute inset-0 bg-black bg-opacity-50">
                <motion.img
                  key={`bg-${index}-${currentSlide}`}
                  src={item.image}
                  alt={item.title}
                  initial={{ scale: 1.1 }}
                  animate={{
                    scale: 1,
                    transition: {
                      duration: 8,
                      ease: 'linear'
                    }
                  }}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="relative z-10 flex flex-col items-start justify-center h-full text-left px-6 sm:px-12 md:pl-20 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`content-${index}-${currentSlide}`}
                    variants={containerVariants}
                    initial="hidden"
                    animate="show" exit="exit"
                    className="space-y-4 md:space-y-6 max-w-4xl"
                  >
                    <motion.h2
                      variants={itemVariants}
                      className="text-2xl md:text-3xl font-roboto font-bold text-white drop-shadow-lg uppercase"
                    >
                      {item.head}
                    </motion.h2>
                    <motion.h1
                      variants={itemVariants}
                      className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white drop-shadow-lg leading-tight"
                    >
                      {item.title}
                    </motion.h1>
                    <motion.p
                      variants={itemVariants}
                      className="text-lg md:text-xl lg:text-2xl font-roboto text-white drop-shadow leading-relaxed max-w-3xl"
                    >
                      {item.subtitle}
                    </motion.p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          ))}
        </Slider>
        <div className="absolute inset-x-0 bottom-36 z-20 pl-6 sm:pl-12 md:pl-20">
          <ArrowControls
            onPrev={() => sliderRef.current?.slickPrev()}
            onNext={() => sliderRef.current?.slickNext()}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;