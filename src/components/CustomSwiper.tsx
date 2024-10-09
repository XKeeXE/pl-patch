import { LegacyRef, ReactNode, useEffect} from 'react';
import { Swiper, SwiperProps, SwiperRef } from 'swiper/react';

const CustomSwiper = (props: {
    children: ReactNode; 
    className: string, 
    swiper?: LegacyRef<SwiperRef>,
    swiperProps: React.PropsWithChildren<SwiperProps>
    OnKeyDown?: (e: KeyboardEvent) => void, 
}) => {
    const {children, className, swiper, swiperProps, OnKeyDown} = props;

    const OnSlideChanged = new CustomEvent('OnSlideChanged', {});

    useEffect(() => {
        if (!OnKeyDown) {
            return;
        }
        window.addEventListener("keydown", OnKeyDown);
        return () => {
            window.removeEventListener('keydown', OnKeyDown);
            };
    }, [])

    return (
        <Swiper className={className} {...swiperProps}
            ref={swiper}
            onSlideChange={() => {
                document.dispatchEvent(OnSlideChanged);
            }}
            direction='vertical'
            mousewheel={true}
            pagination={{
                clickable: true,
                dynamicBullets: true
            }}>
                { children }
        </Swiper>
    );
}

export default CustomSwiper;