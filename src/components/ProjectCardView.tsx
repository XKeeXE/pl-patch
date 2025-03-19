import { Card, CardBody, CardFooter, CardHeader, Image } from "@nextui-org/react";
import { slide } from "../util/types";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay } from 'swiper/modules';
import { Link } from "react-router-dom";
import UIButton from "./UIButton";
import { useContext } from "react";
import { SlidesContext } from "./AppView";

const ProjectCardView = (props: {
    viewable: boolean, 
    currentSlide: slide
}) => {
	const { viewable, currentSlide } = props;

    const {getTranslatedText, getTranslatedParagraph} = useContext(SlidesContext)
    
    return (
        <div className='flex justify-center h-full'>
            <Card className="self-center sm:w-[100vw] md:w-[80vw] lg:w-[60vw] xl:w-[35vw] 2xl:w-[30vw] border-2 border-[#f0f0f0] dark:border-[#0f0f0f]" shadow="none" style={{
                // borderColor: color
            }}>
                <CardHeader className="flex flex-col justify-center gap-1">
                    {viewable ? 
                    (currentSlide.header ?
                        <img className="w-[50%]" src={`${process.env.PUBLIC_URL}/${currentSlide.header}`}/>
                        :
                    <span className={`text-4xl font-title bg-clip-text text-transparent bg-gradient-to-b ${currentSlide.gradient}`}>{currentSlide.name.toUpperCase()}</span>
                    )
                    :
                    <span className={`text-4xl font-title bg-clip-text text-transparent bg-gradient-to-b ${currentSlide.gradient}`}>{getTranslatedText(`title${currentSlide.name}`).toUpperCase()}</span>
                    }
                    <span className="font-text text-xs">{getTranslatedText(`summary${currentSlide.name}`).toUpperCase()}</span>
                    {currentSlide.icon}

                </CardHeader>
                <CardBody className="flex flex-col gap-2 items-center">
                    {getTranslatedParagraph(`details${currentSlide.name}`, 'flex flex-col gap-2 font-text text-xs md:text-sm')}
                    {currentSlide.images && (
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
                        {currentSlide.images.map(image => (
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
                    {viewable ?
                        <Link tabIndex={-1} to={`/projects/${currentSlide.name.toLowerCase()}`}>
                            <UIButton color={currentSlide.color} card={true}>
                                <span className={`bg-clip-text text-transparent bg-gradient-to-b ${currentSlide.gradient}`}>{getTranslatedText('viewPage')}</span>
                            </UIButton>
                        </Link>
                    :
                        <UIButton color={currentSlide.color} link={"https://github.com/XKeeXE/pl-patch"} card={true}>
                            <span className={`text-xs sm:text-sm bg-clip-text text-transparent bg-gradient-to-b ${currentSlide.gradient}`}>{getTranslatedText('sourceCode')}</span>
                        </UIButton>
                    }
                </CardFooter>
            </Card>
        </div>
    )
}

export default ProjectCardView;