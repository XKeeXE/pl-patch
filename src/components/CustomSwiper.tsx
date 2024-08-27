import { Mousewheel, Pagination } from 'swiper/modules';
import { Swiper } from 'swiper/react';

const CustomSwiper = (props: {children: any; swiperProps: any}) => {
    const {children, swiperProps} = props;

    // home
    // className='max-h-[92.8vh] lg:max-h-[94vh] xl:max-h-[95.5vh] '
    //         modules={[Mousewheel, HashNavigation, Pagination]}
    //         direction='vertical'
    //         spaceBetween={50}
    //         hashNavigation={{
    //             watchState: true,
    //         }}
    //         mousewheel={true}
    //         pagination={{
    //             clickable: true,
    //             dynamicBullets: true,
    //         }}

    // Project
    // className='max-h-[95.5vh]'
    //         modules={[Mousewheel, Pagination]}
    //         direction='vertical'
    //         spaceBetween={10}
    //         mousewheel={true}
    //         pagination={{
    //             clickable: true,
    //             dynamicBullets: true,
    //         }}
    //         >
    return (
        <Swiper className='' {...swiperProps}
            onSlideChange={(e: any) => {
                console.log('test');
            }}
            modules={[Mousewheel, Pagination]}
            direction='vertical'
            mousewheel={true}
            pagination={{
                clickable: true,
                dynamicBullets: true
            }}
            >
            { children }
        </Swiper>
    );
}

export default CustomSwiper;