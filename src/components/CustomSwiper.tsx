import { useEffect, useRef } from 'react';
import { Mousewheel, Pagination } from 'swiper/modules';
import { Swiper } from 'swiper/react';

const CustomSwiper = (props: {children: any; className: any,swiperProps: any}) => {
    const {children, className, swiperProps} = props;

    const slideChanging = useRef<boolean>(false);

    useEffect(() => {
        const validKeys: string[] = ['w', 's', 'ArrowUp', 'ArrowDown'];
       
        const OnKeyDown = (e: KeyboardEvent) => {
            // console.log('Key pressed:', e.key);
            if (!validKeys.includes(e.key)) {
                return;
            }
            if (slideChanging.current) {
                return;
            }
            slideChanging.current = true;
            console.log('test');
            if (e.key == 'w' || e.key == 'ArrowUp') {
                
            } else { // The pressed key was down

            }
        };

        window.addEventListener("keydown", OnKeyDown);

        return () => {
            window.removeEventListener('keydown', OnKeyDown);
            };
    }, [])

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
        <Swiper className={className} {...swiperProps}
            onSlideChange={(e: any) => {
                
            }}
            onSlideChangeTransitionEnd={(e: any) => {
                // console.log('ended');
                slideChanging.current = false;
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