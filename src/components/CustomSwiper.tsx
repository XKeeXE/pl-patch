import { ReactNode, useEffect} from 'react';
import { Swiper, SwiperProps, useSwiper } from 'swiper/react';

const CustomSwiper = (props: {children: ReactNode; className: string, swiperProps: React.PropsWithChildren<SwiperProps>}) => {
    const {children, className, swiperProps} = props;
    return (
        <Swiper className={className} {...swiperProps}
            direction='vertical'
            mousewheel={true}
            pagination={{
                clickable: true,
                dynamicBullets: true
            }}
            >
            { children }
            <KeyboardControl />
        </Swiper>
    );
}

const KeyboardControl = () => {
    const swiper = useSwiper();

    useEffect(() => {
        const validKeys: string[] = ['w', 's', 'ArrowUp', 'ArrowDown'];
    
        const OnKeyDown = (e: KeyboardEvent) => {
            if (!validKeys.includes(e.key)) {
                return;
            }
            if (e.key == 'w' || e.key == 'ArrowUp') {
                swiper.slidePrev();
            } else { // Down key was pressed
                swiper.slideNext();
            }
        };

        window.addEventListener("keydown", OnKeyDown);

        return () => {
            window.removeEventListener('keydown', OnKeyDown);
            };
    }, [swiper])

    return null;
}

export default CustomSwiper;