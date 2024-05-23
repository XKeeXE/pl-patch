import { Swiper, SwiperSlide } from 'swiper/react';
import { useParams } from 'react-router-dom';
import { link, slide, TranslatedText } from '../Types/types';
import { Button, Card, CardBody, CardFooter, CardHeader, Image, Link, Spinner, Textarea } from '@nextui-org/react';
import ErrorView from './ErrorView';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

import { Pagination, Mousewheel, EffectCoverflow, Navigation } from 'swiper/modules';
import UINavbar from './UINavbar';
import { useEffect, useRef, useState } from 'react';
import LinksCard from './LinksCard';

const ProjectView = (props: {darkMode: boolean, language: string, showMenuDropdown: boolean, showProjectDropdown: boolean, setLanguage: React.Dispatch<React.SetStateAction<string>>, 
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>, setShowMenuDropdown: React.Dispatch<React.SetStateAction<boolean>>, 
    setShowProjectDropdown: React.Dispatch<React.SetStateAction<boolean>>, getTranslatedText: TranslatedText, slides: slide[]}) => {
    const { darkMode, language, showMenuDropdown, showProjectDropdown, setDarkMode, setLanguage, setShowMenuDropdown, setShowProjectDropdown, getTranslatedText, slides } = props;
    const videoRef = useRef<any>(null);

    const { projectName } = useParams();
    const project = slides.find(project => project.name === projectName);

    function DemoComponent(currentProject: slide): JSX.Element {
        if (currentProject.demoComponent !== undefined) {
            return currentProject.demoComponent;
        }
        return <p>NoDemo</p>
    }

    const projectLinks: link[] = [
        {text: 'Download', url: '', icon: <QuestionMarkIcon/>},
        {text: 'GitHub', url: project?.sourceCode as string, icon: <QuestionMarkIcon/>}
    ];

    useEffect(() => {
        videoRef.current.src = process.env.PUBLIC_URL + '/' + project?.video;
    }, [projectName])

    const ViewPage = (): JSX.Element => {
        if (project === undefined) { 
            return <ErrorView/>
        }
        return (
            <>
            <UINavbar darkMode={darkMode} language={language} showMenuDropdown={showMenuDropdown} showProjectDropdown={showProjectDropdown} 
            setDarkMode={setDarkMode} setLanguage={setLanguage} setShowMenuDropdown={setShowMenuDropdown} setShowProjectDropdown={setShowProjectDropdown} 
            getTranslatedText={getTranslatedText} slides={slides}/>
            <Swiper
            className='max-h-[95.5vh]'
            onClick={() => {setShowMenuDropdown(false); setShowProjectDropdown(false)}}
            modules={[Mousewheel, Pagination]}
            direction='vertical'
            mousewheel={true}
            pagination={{
                clickable: true,
                dynamicBullets: true,
            }}
            >
                <SwiperSlide>
                    <p>{project.name}</p>
                </SwiperSlide>

                <SwiperSlide>
                    <div className='flex justify-center'>
                        {/* {DemoComponent(project)} */}
                        <p>Demo</p>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <video controls ref={videoRef}><source type="video/mp4"/></video>
                </SwiperSlide>

                <SwiperSlide>
                    <Swiper
                        className='max-w-[80vw] '
                        // effect={'coverflow'}
                        loop
                        grabCursor
                        slidesPerView={1}
                        coverflowEffect={{
                            rotate: 90,
                            // stretch: -500,
                            depth: 0,
                            modifier: 1,
                            // slideShadows: true,
                        }}
                        navigation={true}
                        modules={[EffectCoverflow, Navigation]}
                    >
                        {project.images.map(image => (
                            <SwiperSlide>
                                <Card className='pt-10 bg-transparent' shadow='none'>
                                    <div className='flex justify-center'>
                                        <Image
                                        className="object-cover max-w-[45vw] self-center" 
                                        // shadow="sm"
                                        radius="lg"
                                        alt={image.title}
                                        src={process.env.PUBLIC_URL + '/' + image.url}
                                        />
                                    </div>
                                    <CardFooter className=''>
                                        <div className='flex flex-col items-center  w-full'>
                                            <p>{getTranslatedText('title' + image.title + project.name)}</p>
                                            <Textarea className='w-[50%]' isReadOnly value={getTranslatedText('desc' + image.title + project.name)}/>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </SwiperSlide>
                        ))}

                    </Swiper>
                </SwiperSlide>

                <SwiperSlide>
                    <LinksCard headerText={"Links"} linkItems={projectLinks}/>
                </SwiperSlide>
            </Swiper>
            </>
        )
    }

    return (<>{ViewPage()}</>)
}

export default ProjectView;