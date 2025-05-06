import { useEffect, useState } from 'react';

// Custom hook for handling scroll logic
export const useCarouselScroll = (carouselRef: any) => {
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollLeft = carouselRef?.current?.scrollLeft;
      const maxScrollLeft =
        carouselRef?.current?.scrollWidth - carouselRef?.current?.clientWidth;
        const tolerance = 1;
      setIsAtStart(scrollLeft === 0);
      setIsAtEnd(scrollLeft + tolerance >= maxScrollLeft);
    };
    const handleResize = () => {
      // Call handleScroll on resize
      handleScroll();
    };

    carouselRef?.current?.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      carouselRef?.current?.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [carouselRef]);

  return { isAtStart, isAtEnd };
};
