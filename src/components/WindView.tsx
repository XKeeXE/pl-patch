import { Swiper, SwiperSlide } from 'swiper/react';
import ProjectCardView from './ProjectCardView';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination, Mousewheel, HashNavigation } from 'swiper/modules';

import { slide, TranslatedText, link } from '../Types/types';
import UINavbar from './UINavbar';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinksCard from './LinksCard';
import ProjectList from './ProjectList';
import { useEffect } from 'react';

const WindView = (props: {language: string, setIsHomePage: React.Dispatch<React.SetStateAction<boolean>>, getTranslatedText: TranslatedText, slides: slide[]}) => {
    const { language, setIsHomePage, getTranslatedText, slides } = props;

    const currentYear = new Date().getFullYear();

    const gradient = ' bg-clip-text text-transparent bg-gradient-to-br from-[#0089fe] from-0% to-[#15c31e] to-100%'

    const contactsItems: link[] = [
        {text: getTranslatedText('resume'), url: '/Resume Patch.pdf', icon: <ContactPageIcon />},
        {text: getTranslatedText('email'), url: 'mailto:patch.rodriguez.medina@gmail.com', icon: <EmailIcon />},
        {text: 'LinkedIn', url: 'https://www.linkedin.com/in/lnpatchrodriguezmedina/', icon: <LinkedInIcon/>},
        {text: 'GitHub', url: 'https://github.com/XKeeXE', icon: <GitHubIcon/>},
        {text: 'Source Code', url: 'https://github.com/XKeeXE/pl-patch', icon: <GitHubIcon/>}
    ];

    useEffect(() => {
        setIsHomePage(true);
        const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.style.setProperty('--swiper-pagination-color', darkMode ? "#f0f0f0" : "#0f0f0f");
    }, [])

    const Home = () => {
        return (
            <div className='flex flex-col justify-center items-center h-full'>
                <div className='font-text'>
                    <span className={`text-4xl font-title `}>{getTranslatedText('greetings')}</span>
                    <div className={'flex flex-row gap-1 items-center'}>
                        <span className={language === 'ja' ? 'pt-3' : 'text-base md:text-xl'}>{getTranslatedText('introName')}</span>
                        {language === 'ja' ? 
                        <>
                            <ruby className='text-xl font-bold'>Sebastian<rt>セバスチャン</rt></ruby>
                            <ruby className='text-xl font-bold'>Rodriguez<rt>ロドリゲス</rt></ruby>
                            <ruby className='text-xl font-bold'>Medina<rt>メディナ</rt></ruby>
                            <span className='pt-3'>ですが</span>
                        </>
                        : <span className={`text-sm md:text-xl font-bold font-title ${gradient}`}>Sebastian Rodriguez Medina</span>}
                    </div>
                    <div className='flex flex-row gap-1 items-center'>
                        {language === 'ja' ? <></> : <span className='pt-1 text-base md:text-xl'>{getTranslatedText('introPenname')}</span>}
                        {language === 'ja' ? 
                        <>
                            <ruby className='text-xl font-bold'>Patch<rt>パッチ</rt></ruby>
                            <span className='pt-2'>と呼んでいただいてもいいです</span>
                        </>
                        : <span className={`text-2xl font-bold font-title ${gradient}`}>Patch</span>}
                    </div>
                </div>
            </div>
        )
    }

    const AboutMe = () => {
        return (
            <div className='flex flex-col h-full font-text gap-4 justify-center md:items-center '>
                <div className='flex flex-row gap-4 sm:justify-between md:w-[60vw] lg:w-[35vw]'>
                    <div className='flex flex-col gap-2 '>
                        <span className={`font-title text-4xl self-center `}>{getTranslatedText('aboutHeader')}</span>
                        <div className='flex flex-col gap-1 text-sm md:text-base '>
                            <span>{getTranslatedText('aboutIntro')}</span>
                            <span>{`${getTranslatedText('aboutExp1')} ${(currentYear - 2017)} ${getTranslatedText('aboutExp2')}`}</span>
                            <span>{getTranslatedText('aboutEnd')}</span>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-2 text-xs border-2 p-2 rounded-lg md:w-[60vw] lg:w-[35vw] border-[#f0f0f0] dark:border-[#0f0f0f] '>
                    <span className='font-bold'>{getTranslatedText('skillsIntro')}</span>
                    <span>
                    Blender, C#, C++, CSS, Discord.py, Docker, Electron, 
                    FFmpeg, Fabric API, GDScript, GitHub, Godot 4, HTML, 
                    Java, JavaScript, jQuery, LavaPlayer, MongoDB, Next.js, 
                    Node.js, Oracle, PHP, Python, Rabbit MQ, React, Ruby, 
                    Scrum, SQL, Apache Spark, T-SQL, Tauri, Technical Writing, 
                    Trello, UE5, Unity, Vite, XML.
                    </span>
                </div>
            </div>
        )
    }

    const HomeFP = () => {
        return (
            <div className='flex flex-col items-center'>
                <div className='flex flex-col justify-center h-full'>
                    <span className={`text-4xl font-title text-left`}>{getTranslatedText('greetings')}</span>
                    <div className={'flex flex-row gap-1 items-center'}>
                        <span className={language === 'ja' ? 'pt-3' : 'text-base md:text-xl'}>{getTranslatedText('introName')}</span>
                        <span className={`text-sm md:text-xl font-bold font-title ${gradient}`}>Sebastian Rodriguez Medina</span>
                    </div>
                    <div>
                        <span className='pt-1 text-base md:text-xl'>{getTranslatedText('introPenname')}</span>
                        <span className={`text-2xl font-bold font-title ${gradient}`}>Patch</span>
                    </div>
                </div>

            </div>
        )
    }

    const AboutMeFP = () => {
        return (
            <div className='flex flex-col h-full font-text gap-4 justify-center md:items-center'>
                <div className='flex flex-row gap-4 sm:justify-between md:w-[60vw] lg:w-[35vw]'>

                    <div className='flex flex-col gap-2 '>
                        <span className={`font-title text-4xl self-center `}>{getTranslatedText('aboutHeader')}</span>
                        <div className='flex flex-col gap-1 text-sm md:text-base '>
                            <span>{getTranslatedText('aboutIntro')}</span>
                            <span>{`${getTranslatedText('aboutExp1')} ${(currentYear - 2017)} ${getTranslatedText('aboutExp2')}`}</span>
                            <span>{getTranslatedText('aboutEnd')}</span>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 text-xs border-2 p-2 rounded-lg md:w-[60vw] lg:w-[35vw] border-[#f0f0f0] dark:border-[#0f0f0f] '>
                        <span className='font-bold'>{getTranslatedText('skillsIntro')}</span>
                        <span>
                        Blender, C#, C++, CSS, Discord.py, Docker, Electron, 
                        FFmpeg, Fabric API, GDScript, GitHub, Godot 4, HTML, 
                        Java, JavaScript, jQuery, LavaPlayer, MongoDB, Next.js, 
                        Node.js, Oracle, PHP, Python, Rabbit MQ, React, Ruby, 
                        Scrum, SQL, Apache Spark, T-SQL, Tauri, Technical Writing, 
                        Trello, UE5, Unity, Vite, XML.
                        </span>
                    </div>
                </div>
            </div>
        )
    }

    // const Fullpage = () => (
    //     <ReactFullpage
    //     credits={{enabled: false, label: 'test', position: 'right'}}
    //     //fullpage options
    //     licenseKey = {'PUM08-P35SH-8JP9I-CNN4J-LJAWN'}
    //     scrollingSpeed = {600} /* Options here */
    //     slidesNavigation={true}
    //     // slidesNavPosition="bottom" 
    //     // controlArrows={false}
    //     // anchors={AddHashUrl()}
    //     // lockAnchors={false} 
    //     // continuousVertical={true}
    //     dragAndMove={true}
    //     animateAnchor={true}
    //     render={({ state, fullpageApi }) => {
    //         return (
    //         <ReactFullpage.Wrapper>
    //             <div className="section">
    //                 <Home/>
    //             </div>
    //             <div className="section">
    //                 <AboutMe/>
    //             </div>
    //             {slides.map(project => (
    //                 <div className="section" key={project.name}>
    //                     <ProjectCardView
    //                     getTranslatedText={getTranslatedText} 
    //                     slide={true}
    //                     color={project.color}
    //                     gradient={project.gradient}
    //                     name={project.name}
    //                     logo={project.logo}
    //                     images={project.images}
    //                     />
    //                 </div>
    //             ))}
    //             <div className="section">
    //                 <ProjectCardView
    //                 getTranslatedText={getTranslatedText} 
    //                 slide={false}
    //                 color={'#2E8B57'}
    //                 gradient={gradient}
    //                 name={"PORTFOLIO"}
    //                 logo={undefined}
    //                 images={undefined}
    //                 />
    //             </div>
    //             <div className="section">
    //                 <LinksCard headerText={getTranslatedText('contacts')} color={` border-[#f0f0f0] dark:border-[#0f0f0f] `} gradient={undefined} linkItems={contactsItems}/>
    //             </div>
    //         </ReactFullpage.Wrapper>
    //         );
    //     }}
    //     />
    //   );

    return (
        <Swiper
            className='max-h-[92.8vh] lg:max-h-[94vh] xl:max-h-[95.5vh] '
            modules={[Mousewheel, HashNavigation, Pagination]}
            direction='vertical'
            spaceBetween={50}
            hashNavigation={{
                watchState: true,
            }}
            mousewheel={true}
            pagination={{
                clickable: true,
                dynamicBullets: true,
            }}
            >
            <SwiperSlide data-hash="home">
                <Home/>
            </SwiperSlide>
            <SwiperSlide data-hash="about">
                <AboutMe/>
            </SwiperSlide>
            <SwiperSlide data-hash="projects" >
                <ProjectList getTranslatedText={getTranslatedText} slides={slides} gradient={gradient}/>
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
        </Swiper>
    );
}

export default WindView;