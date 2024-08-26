import { Button, Card, CardBody, CardFooter, CardHeader, Image } from "@nextui-org/react";
import { image, slide, TranslatedText } from "../Types/types";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from "react-router-dom";
import UIButton from "./UIButton";

const ProjectCardView = (props: {getTranslatedText: TranslatedText, slide: boolean, color: string, gradient: string, name: string, logo: string | undefined, images: image[] | undefined}) => {
	const { getTranslatedText, slide, color, gradient, name, logo, images, } = props;

    const CheckValidText = (text: string): JSX.Element => {
        if (text !== 'Text not found') {
            return <span>{text}</span>;
        } 
        return <></>
    }
    
    return (
        <div className='flex justify-center h-full'>
            <Card className="self-center sm:w-[100vw] md:w-[80vw] lg:w-[60vw] xl:w-[35vw] bg-[#E7E6E6]/20 dark:bg-[#181919]/40" shadow="none">
                <CardHeader className="flex flex-col justify-center gap-1">
                    <span className={`text-4xl font-title bg-clip-text text-transparent bg-gradient-to-b ${gradient}`}>{name.toUpperCase()}</span>
                    <span className="font-text text-xs">{getTranslatedText(`summary${name}`).toUpperCase()}</span>
                    {/* {logo && (<img className="w-[10%] md:w-[20%] border-2" src={logo} alt={`${name}'s logo`}/>)} */}
                </CardHeader>
                <CardBody className="flex flex-col gap-2 items-center">
                    <div className="flex flex-col gap-4 justify-start font-text text-xs md:text-sm">
                        {CheckValidText(getTranslatedText(`details${name}1`))}
                        {CheckValidText(getTranslatedText(`details${name}2`))}
                        {CheckValidText(getTranslatedText(`details${name}3`))}
                    </div>
                    {images && (
                        <Swiper
                            className=""
                            loop
                            allowTouchMove={false}
                            mousewheel={false}
                            slidesPerView={3}
                            spaceBetween={10}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                            }}
                            modules={[Autoplay]}
                        >
                        {images.map(image => (
                            <SwiperSlide key={image.title}>
                                <Image
                                    className="object-cover aspect-square"
                                    shadow="none"
                                    radius="lg"
                                    alt={image.title}
                                    src={image.url}
                                    />
                            </SwiperSlide>
                        ))}
                        </Swiper>)}
                </CardBody>
                <CardFooter className="border-t-2 flex justify-center border-[#f0f0f0] dark:border-[#0f0f0f]" >
                    {slide ?
                        <Link tabIndex={-1} to={`/projects/${name}`}>
                            <UIButton color={color} card={true}>
                                <span className={`bg-clip-text text-transparent bg-gradient-to-b ${gradient}`}>{getTranslatedText('viewPage')}</span>
                            </UIButton>
                        </Link>
                    :
                        <UIButton color={color} link={"https://github.com/XKeeXE/pl-patch"} card={true}>
                            <span className={`text-xs sm:text-sm bg-clip-text text-transparent bg-gradient-to-b ${gradient}`}>{getTranslatedText('sourceCode')}</span>
                        </UIButton>
                    }
                </CardFooter>
            </Card>
        </div>
    )
}

export default ProjectCardView;