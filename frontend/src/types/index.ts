export type CarouselItem = {
  image: string;
  head: string;
  title: string;
  subtitle: string;
};

export type ArrowControlsProps = {
  onPrev: () => void;
  onNext: () => void;
  className?: string;
};

export type WaitlistFormData = {
  name: string;
  email: string;
  supportType: string;
};
