import { Carousel } from 'flowbite-react';

import '@/app/css/about-us-style.css';

function AboutUsPageComponent() {
  return (
    <div>
        <div className="flex justify-center h-56 sm:h-64 xl:h-80 2xl:h-96 m-10 opacity-0 animate-appear transition-opacity duration-500 delay-300 h-screen">
          <Carousel className='w-5/6'>
              <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..." />
              <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="..." />
              <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..." />
              <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." />
              <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." />
          </Carousel>
        </div>
    </div>
  );
}

export default AboutUsPageComponent;