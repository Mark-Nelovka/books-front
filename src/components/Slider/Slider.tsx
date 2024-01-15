import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

function ControlledCarousel({images}:{images: string[]}) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel className='details__book-image_list' variant='dark' activeIndex={index} onSelect={handleSelect} as={'ul'} wrap={false}> 
        {images.map((el, inx) => {
            return <Carousel.Item key={inx}>
                 <li className='details__book-image_list-item first'>
                    <img src={el} alt='Image book' />
                </li>
          </Carousel.Item>
        })}
    </Carousel>
  );
}

export default ControlledCarousel;