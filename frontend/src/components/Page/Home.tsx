import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Slider, { type Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ArrowControls from '@/components/ArrowControls';
import { carouselItems } from '@/data/home';

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
  const [isMobile, setIsMobile] = useState(false);
  const sliderRef = useRef<Slider | null>(null);

  // Check for mobile view on mount and window resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Memoize settings to prevent unnecessary recalculations
  const settings: Settings = useMemo(() => ({
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    beforeChange: (_, next) => setCurrentSlide(next),
    pauseOnHover: false,
    cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
    fade: true,
    pauseOnFocus: false,
    swipeToSlide: true,
    draggable: false,
    touchThreshold: 10,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          speed: 800, // Slightly faster transition on mobile
        }
      }
    ]
  }), []);

  // Memoize the animation variants
  const getImageAnimation = useCallback((index: number) => ({
    initial: {
      scale: index % 2 === 0 ? 1.2 : 1,
      willChange: 'transform'
    }
  }), []);

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
                  {...getImageAnimation(index)}
                  animate={{
                    scale: 1.1,
                    transition: {
                      duration: isMobile ? 3 : 5,
                      ease: 'linear'
                    }
                  }}
                  className="w-full h-full object-cover will-change-transform"
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
                      className="text-2xl md:text-3xl font-roboto text-white drop-shadow-lg uppercase"
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