import { Swiper, SwiperSlide } from 'swiper/react';
import { useParams } from 'react-router-dom';
import { link, slide, TranslatedText } from '../Types/types';
import ErrorView from './ErrorView';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

import { Pagination, Mousewheel, EffectCoverflow, Navigation } from 'swiper/modules';
import UINavbar from './UINavbar';
import { memo, ReactNode, useContext, useEffect, useMemo, useRef, useState } from 'react';
import LinksCard from './LinksCard';
import UIButton from './UIButton';
import ProjectDemoView from './ProjectDemoView';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import CustomSwiper from './CustomSwiper';
import React from 'react';
import { SlidesContext } from './AppView';

const ProjectView = (props: { 
    setIsHomePage: React.Dispatch<React.SetStateAction<boolean>>, 
    currentColor: React.MutableRefObject<string>
}) => {
    const { setIsHomePage, currentColor } = props;

    const { getTranslatedText, slides } = useContext(SlidesContext);

    const OnProjectEnter = new CustomEvent('OnProjectEnter', {});

    const { projectName } = useParams();
    const project = useMemo(() => {
        return slides.find(project => project.name === projectName);
    }, [projectName])

    // Activates only when starting in the project and when moving from home --> projects (If switching from project to another project will not activate)
    useEffect(() => {
        // console.log("Im on project view");
        setIsHomePage(false);
    }, [])

    const Header = (props: {headerText: string}) => {
        const { headerText } = props;
        return <span className={`text-4xl font-title bg-clip-text text-transparent bg-gradient-to-b ${project?.gradient}`}>{headerText}</span>
    }

    const Slide = (props: {children: ReactNode}) => {
        const { children } = props;
        return (
            <div className='flex flex-col gap-4 justify-center items-center h-full'>
                { children }
            </div>
        )
    }

    const Video = (props: {projectVideo: string}): JSX.Element => {
        const { projectVideo } = props;
        console.log('video rerendered');
        return (
            <video tabIndex={-1} controls className='md:w-[80vw] xl:w-[50vw] rounded-lg' src={`${process.env.PUBLIC_URL}/${projectVideo}`}><source type="video/mp4"/></video>
            // <video tabIndex={-1} controls className='md:w-[80vw] xl:w-[50vw] rounded-lg' src={``}><source type="video/mp4"/></video>

        );
    };

    const ViewPage = (): JSX.Element => {
        if (project === undefined) { 
            return <ErrorView setIsHomePage={setIsHomePage}/>
        }
        currentColor.current = project?.color;
        window.dispatchEvent(OnProjectEnter);
        return (
            <CustomSwiper className={'max-h-[95.5vh]'} swiperProps={{
                modules: [Mousewheel, Pagination],
                spaceBetween: 10,
            }}>
                <SwiperSlide>
                    <div className='flex justify-center h-full'>
                        <Card className="self-center sm:w-[100vw] md:w-[80vw] lg:w-[60vw] xl:w-[35vw] bg-[#f0f0f0] dark:bg-[#181919]/40" shadow="none" style={{
                        }}>
                            <CardHeader className="flex flex-col justify-center gap-1">
                                <Header headerText={project.name}/>
                                <span className={`text-sm md:text-lg font-text bg-clip-text text-transparent bg-gradient-to-b ${project.gradient}`}>{getTranslatedText(`title${project.name}`)}</span>
                                <span className="font-text text-xs">{getTranslatedText(`summary${project.name}`).toUpperCase()}</span>
                            </CardHeader>
                            <CardBody className="flex flex-col gap-2 items-center">
                                <div className="flex flex-col gap-4 justify-start font-text text-xs md:text-sm">
                                    <span>{getTranslatedText(`extraDetails${project.name}1`)}</span>
                                    <span>{getTranslatedText(`extraDetails${project.name}2`)}</span>
                                    <span>{getTranslatedText(`extraDetails${project.name}3`)}</span>
                                    <span>{getTranslatedText(`extraDetails${project.name}4`)}</span>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                    {/* <div className='grid grid-cols-2 gap-2 justify-center h-full'>
                        <Card className=''>
                            <CardHeader>
                                test
                            </CardHeader>
                        </Card>
                        <Card className=' row-span-2'>
                            <CardHeader>
                                Summary
                            </CardHeader>
                        </Card>
                        <Card>
                            <CardHeader>
                                Why
                            </CardHeader>
                        </Card>
                    </div> */}
                </SwiperSlide>

                {/* <SwiperSlide>
                    <Slide>
                        <Header headerText={getTranslatedText('demoHeader')}/>
                        <ProjectDemoView getTranslatedText={getTranslatedText} project={project}/>
                    </Slide>
                </SwiperSlide> */}

                <SwiperSlide>
                    <Slide>
                        <Header headerText={getTranslatedText('videoHeader')}/>
                        <Video projectVideo={project.video}/>
                    </Slide>
                </SwiperSlide>

                <SwiperSlide>
                    <div className=' flex flex-col h-full'>
                        <Swiper
                            className=' '
                            loop
                            grabCursor
                            slidesPerView={1}
                            coverflowEffect={{
                                rotate: 90,
                                depth: 0,
                                modifier: 1,
                            }}
                            navigation={true}
                            modules={[EffectCoverflow, Navigation]}
                        >
                            {project.images.map(image => (
                                <SwiperSlide key={image.title}>
                                    <Slide>
                                        <img
                                        className="object-cover w-[80vw] lg:w-[70vw] xl:w-[40vw] rounded-lg" 
                                        alt={image.title}
                                        src={`${process.env.PUBLIC_URL}/${image.url}`}
                                        />
                                        <span className={`font-title text-sm sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-center lg:w-[80vw] xl:w-[40vw] bg-clip-text text-transparent bg-gradient-to-b ${project.gradient}`}>{getTranslatedText(`title${image.title + project.name}`).toUpperCase()}</span>
                                        <span className='border-2 w-[90vw] text-sm md:text-base lg:text-lg min-h-[10%] rounded-lg p-2 bg-[#E7E6E6] dark:bg-[#181919] md:w-[90vw] lg:w-[70vw] xl:w-[40vw]' style={{borderColor: project.color}}>{getTranslatedText(`desc${image.title + project.name}`)}</span>
                                    </Slide>
                                </SwiperSlide>
                            ))}

                        </Swiper>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <LinksCard headerText={getTranslatedText('linksHeader')} linkItems={project.links} color={project.color} gradient={project.gradient}/>
                </SwiperSlide>
            </CustomSwiper>
            
        )
    }

    return (<>{ViewPage()}</>)
}

export default ProjectView;