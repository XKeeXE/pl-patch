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
import { useEffect, useMemo, useRef, useState } from 'react';
import LinksCard from './LinksCard';
import UIButton from './UIButton';
import ProjectDemoView from './ProjectDemoView';

const ProjectView = (props: { setIsHomePage: React.Dispatch<React.SetStateAction<boolean>>, getTranslatedText: TranslatedText, slides: slide[]}) => {
    const { setIsHomePage, getTranslatedText, slides } = props;

    const { projectName } = useParams();
    const project = useMemo(() => {
        return slides.find(project => project.name === projectName);
    }, [projectName])

    useEffect(() => {
        setIsHomePage(false);
    }, [])

    const projectLinks: link[] = [
        {text: 'Download', url: project?.downloadLink as string, icon: <QuestionMarkIcon/>},
        {text: 'Source Code', url: project?.sourceCode as string, icon: <QuestionMarkIcon/>}
    ];

    const Header = (props: any) => {
        const { headerText } = props;
        return <span className={`text-4xl font-title bg-clip-text text-transparent bg-gradient-to-b ${project?.gradient}`}>{headerText}</span>
    }

    const Slide = (props: any) => {
        const { children } = props;
        return (
            <div className='flex flex-col gap-4 justify-center items-center h-full'>
                { children }
            </div>
        )
    }

    const ViewPage = (): JSX.Element => {
        if (project === undefined) { 
            return <ErrorView setIsHomePage={setIsHomePage} getTranslatedText={getTranslatedText}/>
        }
        return (
            <Swiper
            className='max-h-[95.5vh]'
            modules={[Mousewheel, Pagination]}
            direction='vertical'
            spaceBetween={10}
            mousewheel={true}
            pagination={{
                clickable: true,
                dynamicBullets: true,
            }}
            >
                <SwiperSlide>
                    <Slide>
                        <div className='flex flex-col items-center'>
                        <Header headerText={project.name}/>
                            <span className={`text-sm md:text-lg font-text bg-clip-text text-transparent bg-gradient-to-b ${project.gradient}`}>{getTranslatedText(`title${project.name}`)}</span>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <span>{getTranslatedText(`details${project.name}1`)}</span>
                            <span>{getTranslatedText(`details${project.name}2`)}</span>
                        </div>
                    </Slide>
                </SwiperSlide>

                <SwiperSlide>
                    <Slide>
                        <Header headerText={getTranslatedText('demoHeader')}/>
                        <ProjectDemoView getTranslatedText={getTranslatedText} project={project}/>
                    </Slide>
                </SwiperSlide>

                <SwiperSlide>
                    <Slide>
                        <Header headerText={getTranslatedText('videoHeader')}/>
                        <video tabIndex={-1} controls className='md:w-[80vw] xl:w-[50vw] rounded-lg' src={`${process.env.PUBLIC_URL}/${project?.video}`}><source type="video/mp4"/></video>
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
                    <LinksCard headerText={getTranslatedText('linksHeader')} linkItems={projectLinks} color={project.color} gradient={project.gradient}/>
                </SwiperSlide>
            </Swiper>
        )
    }

    return (<>{ViewPage()}</>)
}

export default ProjectView;