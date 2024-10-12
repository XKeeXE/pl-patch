import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { useParams } from 'react-router-dom';
import ErrorView from './ErrorView';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

import { Pagination, Mousewheel, EffectCoverflow, Navigation } from 'swiper/modules';
import { ReactNode, useContext, useEffect, useMemo, useRef, useState } from 'react';
import LinksCard from './LinksCard';
import CustomSwiper from './CustomSwiper';
import React from 'react';
import { SlidesContext } from './AppView';
import UIButton from './UIButton';

const validKeys: string[] = ['w', 's', 'a', 'd', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

const OnProjectEnter = new CustomEvent('OnProjectEnter', {});
const OnWindChanged = new CustomEvent('OnWindChanged', {});

const ProjectView = (props: { 
    setIsHomePage: React.Dispatch<React.SetStateAction<boolean>>, 
    currentColor: React.MutableRefObject<string>
}) => {
    const { setIsHomePage, currentColor } = props;

    const { slides, swiper, getTranslatedText, getTranslatedParagraph} = useContext(SlidesContext);

    const swiperImageRef = useRef<SwiperRef>(null);

    const { projectName } = useParams();
    const project = useMemo(() => {
        return slides.find(project => project.name === projectName);
    }, [projectName])

    // Activates only when starting in the project or (home --> projects) (If switching from project to another project will not activate)
    useEffect(() => {
        // console.log("Im on project view");
        // window.dispatchEvent(OnWindChanged);
        setIsHomePage(false);
    }, [])

    // Defines the available way to navigate through Swiper using keyboard keys
    const OnKeyDown = (e: KeyboardEvent) => {
        if (!validKeys.includes(e.key)) {
            return;
        }
        if (e.key === 'w' || e.key === 'ArrowUp') { // Move up in main swiper
            swiper?.current?.swiper.slidePrev();
        } else if (e.key === 's' || e.key === 'ArrowDown') { // Move down in main swiper
            swiper?.current?.swiper.slideNext();
        } else if (e.key === 'a' || e.key === 'ArrowLeft') { // Move to the left image in image swiper
            swiperImageRef.current?.swiper.slidePrev();
        } else { // Move to the right image in image swiper
            swiperImageRef.current?.swiper.slideNext();
        }
    };

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

    const ProjectDemoView = () => {
        const [demoActive, setDemoActive] = useState<boolean>(false);
    
        const DemoButton = (props: any) => {
            const { text, dashed, onClick } = props;
            return (
                <UIButton card={false} color={project!.color} dashed={dashed} onClick={onClick}>
                    <span>{text}</span>
                </UIButton>
            )
        }
        
        const DemoComponent = (): JSX.Element => {
            if (!project?.demoComponent) {
                return <DemoButton text={getTranslatedText('demoAvailable')} dashed={false} onClick={() => {setDemoActive(true)}}/>
            }
            return <DemoButton text={getTranslatedText('demoError')} dashed={true}/>
        }
    
        return (
            <>
                {demoActive ? project?.demoComponent
                :
                <div className='w-[50vw] sm:w-[25vw] lg:w-[20vw] xl:w-[10vw] flex justify-center'>
                    {DemoComponent()}
                </div>
                }
            </>
        )
    }

    const ViewPage = (): JSX.Element => {
        if (!project) { 
            return <ErrorView setIsHomePage={setIsHomePage}/>
        }
        currentColor.current = project.color;
        window.dispatchEvent(OnProjectEnter);
        window.dispatchEvent(OnWindChanged);
        return (
            <CustomSwiper className={'max-h-[95.5vh]'} swiperProps={{
                modules: [Mousewheel, Pagination],
                spaceBetween: 10,
            }} OnKeyDown={OnKeyDown}>
                <SwiperSlide>
                     <div className='flex flex-col h-full font-text items-center justify-center '>
                        <div className='flex flex-col w-[80vw] md:w-[60vw] lg:w-[40vw] 2xl:w-[20vw] items-center font-text '>
                            <span className={`text-4xl font-title bg-clip-text text-transparent bg-gradient-to-b ${project.gradient}`}>{project.name}</span>
                            <span className={`text-sm md:text-lg bg-clip-text text-transparent bg-gradient-to-b ${project.gradient}`}>{getTranslatedText(`title${project.name}`)}</span>
                            <span className="font-text text-xs md:text-sm pb-2">{getTranslatedText(`summary${project.name}`).toUpperCase()}</span>
                            {project.icon}
                            {getTranslatedParagraph(`details${project.name}`, 'pt-5 flex flex-col gap-2')}
                        </div>
                     </div>
                </SwiperSlide>

                {/* <SwiperSlide>
                    <Slide>
                        <Header headerText={getTranslatedText('demoHeader')}/>
                        <ProjectDemoView/>
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
                            ref={swiperImageRef}
                            loop
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