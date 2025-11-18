import { type CarouselItem } from '@/types';
import Slide_1 from '@/assets/sliders/slide-1.webp';
import Slide_2 from '@/assets/sliders/slide-2.webp';
import Slide_3 from '@/assets/sliders/slide-3.webp';

export const carouselItems: CarouselItem[] = [
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