import { SwiperSlide } from 'swiper/react';
import ProjectCardView from './ProjectCardView';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination, Mousewheel, HashNavigation } from 'swiper/modules';

import { link } from '../Types/types';
import LinksCard from './LinksCard';
import ProjectList from './ProjectList';
import { useContext, useEffect } from 'react';
import CustomSwiper from './CustomSwiper';
import { SlidesContext } from './AppView';

const WindView = (props: {
    language: string, 
    setIsHomePage: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const { language, setIsHomePage } = props;

    const {getTranslatedText, slides} = useContext(SlidesContext)

    const currentYear = new Date().getFullYear();

    const gradient = ' bg-clip-text text-transparent bg-gradient-to-br from-[#0089fe] from-0% to-[#15c31e] to-100%'

    const contactsItems: link[] = [
        {text: getTranslatedText('resume'), url: '/ResumePatch.pdf'},
        {text: getTranslatedText('email'), url: 'mailto:patch.rodriguez.medina@gmail.com'},
        {text: 'LinkedIn', url: 'https://www.linkedin.com/in/lnpatchrodriguezmedina/'},
        {text: 'GitHub', url: 'https://github.com/XKeeXE'},
        {text: getTranslatedText('sourceCode'), url: 'https://github.com/XKeeXE/pl-patch'}
    ];

    // Activates only when starting in the homepage and when moving from projects --> home
    useEffect(() => {
        // console.log("home")
        setIsHomePage(true);
        const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.style.setProperty('--swiper-pagination-color', darkMode ? "#f0f0f0" : "#0f0f0f");
    }, [])

    const GetJP = (props: {className: string, text: string, furigana: string}) => {
        const { className, text, furigana } = props;
        if (language === 'ja') {
            return <ruby className={className}>{text}<rt>{furigana}</rt></ruby>
        }
        return <span className={className}>{text}</span>
    } 

    const Home = () => {
        return (
             <div className='flex flex-col justify-center items-center h-full'>
                <div className='font-text'>
                    <span className={`text-4xl font-title font-bold`}>{getTranslatedText('greetings')}</span>
                    <div className={'flex flex-row gap-1 items-center'}>
                        <span className={language === 'ja' ? 'pt-3' : 'text-base md:text-xl'}>{getTranslatedText('introName')}</span>
                        <GetJP className='text-sm md:text-xl font-bold font-title' text='Sebastian' furigana='セバスチャン'/>
                        <GetJP className='text-sm md:text-xl font-bold font-title' text='Rodriguez' furigana='ロドリゲス'/>
                        <GetJP className='text-sm md:text-xl font-bold font-title' text='Medina' furigana='メディナ'/>
                    </div>
                    <div className='flex flex-row gap-1 items-center'>
                        <span className='pt-1 text-base md:text-xl'>{getTranslatedText('introPenname')}</span>
                        <GetJP className={`text-2xl font-bold font-title`} text='Patch' furigana='パッチ'/>
                        <span className='pt-5'>{getTranslatedText('endPenname')}</span>
                    </div>
                </div>
            </div>
        )
    }

    const AboutMe = () => {
        //<div className='flex flex-col h-full font-text gap-4 justify-center md:items-center '>
        return (
            <div className='flex flex-col h-full font-text gap-4 items-center justify-center '>
                <div className='flex flex-col md:w-[60vw] lg:w-[35vw] gap-2'>
                    <span className={`font-title text-4xl self-center`}>{getTranslatedText('aboutHeader')}</span>
                        <div className='flex flex-col gap-1 text-sm md:text-base '>
                            <span>{getTranslatedText('aboutIntro')}</span>
                            <span>{`${getTranslatedText('aboutExp1')} ${(currentYear - 2017)} ${getTranslatedText('aboutExp2')}`}</span>
                            <span>{getTranslatedText('aboutEnd')}</span>
                        </div>
                </div>
                <div className='flex flex-col gap-2 text-xs border-2 p-2 rounded-lg md:w-[60vw] lg:w-[35vw] border-[#f0f0f0] dark:border-[#0f0f0f] '>
                    <span className='font-bold'>{getTranslatedText('skillsIntro')}</span>
                    <span>
                    Apache Spark, Blender, C, C#, C++, CSS, Discord.py, Docker, Electron, 
                    FFmpeg, F#, GDScript, GitHub, Go, Godot 4, HTML, Java, JavaScript, 
                    jQuery, LavaPlayer, MongoDB, Next.js, Node.js, Oracle, PHP, Python, 
                    Rabbit MQ, React, Ruby, Scrum, SQL, SWI-Prolog, T-SQL, Tauri, 
                    Technical Writing, Trello, UE5, Unity, Vite, XML
                    </span>
                </div>
            </div>
        )
    }

    return (
        <CustomSwiper className={'max-h-[92.8vh] lg:max-h-[94vh] xl:max-h-[95.5vh]'} swiperProps={{
            modules: [Mousewheel, HashNavigation, Pagination],
            spaceBetween: 50,
            hashNavigation: {
                watchState: true
            },
        }}>
            <SwiperSlide data-hash="home">
                <Home/>
                {/* <section>
                    <div className='air air1'/>
                    <div className='air air2'/>
                    <div className='air air3'/>
                    
                </section> */}
            </SwiperSlide>
            <SwiperSlide data-hash="about">
                <AboutMe/>
            </SwiperSlide>
            <SwiperSlide data-hash="projects" >
                <ProjectList errorView={false}/>
            </SwiperSlide>
            {slides.map(project => (
                <SwiperSlide data-hash={project.name} key={project.name}>
                    <ProjectCardView
                        getTranslatedText={getTranslatedText} 
                        slide={true}
                        color={project.color}
                        gradient={project.gradient}
                        name={project.name}
                        logo={project.logo}
                        images={project.images}
                        />
                </SwiperSlide>
            ))}
            <SwiperSlide data-hash="portfolio">
                <ProjectCardView
                    getTranslatedText={getTranslatedText} 
                    slide={false}
                    color={'#2E8B57'}
                    gradient={gradient}
                    name={"PORTFOLIO"}
                    logo={undefined}
                    images={undefined}
                    />
            </SwiperSlide>

            <SwiperSlide data-hash="contacts">
                <LinksCard headerText={getTranslatedText('contacts')} color={` border-[#f0f0f0] dark:border-[#0f0f0f] `} gradient={undefined} linkItems={contactsItems}/>
            </SwiperSlide>
        </CustomSwiper>
    );
}

export default WindView;