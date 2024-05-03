import { Button, Card, CardBody, CardFooter, CardHeader, Image } from "@nextui-org/react";
import { slide, TranslatedText } from "../Types/types";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from "react-router-dom";

const ProjectCardView = (props: {darkMode: boolean, language: string, getTranslatedText: TranslatedText, slides: slide[], currentSlide: slide}) => {
	const { darkMode, language, getTranslatedText, slides, currentSlide } = props;
    
    return (
        <Card className="w-[40%] h-[100%]">
            <CardHeader className="justify-center">
                <div className="flex flex-col items-center">
                    <p className="font-title text-4xl">{getTranslatedText('title' + currentSlide.name)}</p>
                    <p>{getTranslatedText('summary' + currentSlide.name)}</p>
                    <Image src={currentSlide.icon}/>
                </div>
            </CardHeader>
            <CardBody className="flex flex-col gap-3">
                <p className="self-center">{getTranslatedText('details' + currentSlide.name)}</p>
                <div className="w-[60%] self-center">
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
            <CardFooter className="justify-center border-t-2">
                <Link to={'/' + currentSlide.name}>
                    <Button variant="ghost" radius="sm" size="md" aria-label="demo">
                            <p>{getTranslatedText('viewPage')}</p>
                    </Button>
                </Link>
            </CardFooter>
        </Card>

    )
}

export default ProjectCardView;