export const nextButton = (carouselRef: any, movableSpeed: number) => {
  carouselRef &&
    carouselRef.current &&
    carouselRef.current.scrollTo({
      behavior: 'smooth',
      top: 0,
      left:
        carouselRef.current.scrollLeft +
        carouselRef.current.clientWidth * (movableSpeed || 1.0),
    });
};
