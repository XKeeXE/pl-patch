import { ReactNode, useContext, useEffect} from 'react';
import { Swiper, SwiperProps } from 'swiper/react';
import { SlidesContext } from './AppView';

const CustomSwiper = (props: {
    children: ReactNode; 
    className: string, 
    swiperProps: React.PropsWithChildren<SwiperProps>
    OnKeyDown?: (e: KeyboardEvent) => void, 
}) => {
    const {children, className, swiperProps, OnKeyDown} = props;

    const {swiper} = useContext(SlidesContext)
    
    const OnSlideChanged = new CustomEvent('OnSlideChanged', {}); // Located at UINavbar

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
        <Swiper className={`startup ${className}`} {...swiperProps}
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