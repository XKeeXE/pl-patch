import { Button, Card, CardBody, CardFooter, CardHeader, Image } from "@nextui-org/react";
import { slide, TranslatedText } from "../Types/types";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from "react-router-dom";

const ProjectCardView = (props: {darkMode: boolean, language: string, getTranslatedText: TranslatedText, currentSlide: slide}) => {
	const { darkMode, language, getTranslatedText, currentSlide } = props;
    
    return (
        <Card className="w-[40vw] self-center" shadow="none">
            <CardHeader className="justify-center">
                <div className="flex flex-col items-center gap-2">
                    <p className="font-title text-2xl">{getTranslatedText('title' + currentSlide.name)}</p>
                    <p className="font-text text-sm">{getTranslatedText('summary' + currentSlide.name).toUpperCase()}</p>
                    <Image className="w-[50%]" src={currentSlide.logo}/>
                </div>
            </CardHeader>
            <CardBody className="flex flex-col gap-3 items-center">
                <p className="font-text">{getTranslatedText('details' + currentSlide.name)}</p>
                <div className="w-[60%]">
                    <Swiper
                        loop
                        allowTouchMove={false}
                        slidesPerView={3}
                        spaceBetween={20}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        modules={[Autoplay]}
                    >
                        {currentSlide.images.map((image: { title: string; url: string }) => (
                            <SwiperSlide>
                                <Image
                                    className="object-cover aspect-square"
                                    shadow="sm"
                                    radius="lg"
                                    alt={image.title}
                                    src={image.url}
                                    />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </CardBody>
            <CardFooter className="border-t-2 flex justify-center">
                <Link to={'/projects/' + currentSlide.name}>
                    <button className="border-2 p-2 rounded-lg">
                        <p>{getTranslatedText('viewPage')}</p>
                    </button>
                </Link>
            </CardFooter>
        </Card>
    )
}

export default ProjectCardView;