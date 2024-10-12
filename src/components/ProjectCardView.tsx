import { Card, CardBody, CardFooter, CardHeader, Image } from "@nextui-org/react";
import { image } from "../Types/types";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay } from 'swiper/modules';
import { Link } from "react-router-dom";
import UIButton from "./UIButton";
import { useContext } from "react";
import { SlidesContext } from "./AppView";
import SvgAssets from "./SvgAssets";

const ProjectCardView = (props: {
    slide: boolean, 
    color: string, 
    icon: JSX.Element | undefined,
    gradient: string, 
    name: string 
    images?: image[]}
) => {
	const { slide, color, icon, gradient, name, images, } = props;

    const {getTranslatedText, getTranslatedParagraph} = useContext(SlidesContext)
    
    return (
        <div className='flex justify-center h-full'>
            <Card className="self-center sm:w-[100vw] md:w-[80vw] lg:w-[60vw] xl:w-[35vw] 2xl:w-[25vw] border-2 border-[#f0f0f0] dark:border-[#0f0f0f]" shadow="none" style={{
                // borderColor: color
            }}>
                <CardHeader className="flex flex-col justify-center gap-1">
                    <span className={`text-4xl font-title bg-clip-text text-transparent bg-gradient-to-b ${gradient}`}>{name.toUpperCase()}</span>
                    <span className="font-text text-xs">{getTranslatedText(`summary${name}`).toUpperCase()}</span>
                    {icon}

                </CardHeader>
                <CardBody className="flex flex-col gap-2 items-center">
                    {getTranslatedParagraph(`details${name}`, 'flex flex-col gap-2 font-text text-xs md:text-sm')}
                    {images && (
                        <Swiper
                            className=""
                            loop
                            allowTouchMove={false}
                            mousewheel={false}
                            slidesPerView={3}
                            spaceBetween={6}
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