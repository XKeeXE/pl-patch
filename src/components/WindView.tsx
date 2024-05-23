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
import { Button, Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';
import LinksCard from './LinksCard';

const WindView = (props: {darkMode: boolean, language: string, showMenuDropdown: boolean, showProjectDropdown: boolean, setLanguage: React.Dispatch<React.SetStateAction<string>>, 
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>, setShowMenuDropdown: React.Dispatch<React.SetStateAction<boolean>>, 
    setShowProjectDropdown: React.Dispatch<React.SetStateAction<boolean>>, getTranslatedText: TranslatedText, slides: slide[]}) => {
        const { darkMode, language, showMenuDropdown, showProjectDropdown, setDarkMode, setLanguage, setShowMenuDropdown, setShowProjectDropdown, getTranslatedText, slides } = props;

    const pagination = {
        clickable: true,
        renderBullet: function (index: number, className: string) {
          return '<span class="' + className + '">' + '</span>';
        },
    };

    const contactsItems: link[] = [
        {text: getTranslatedText('resume'), url: '/Resume Patch.pdf', icon: <ContactPageIcon />},
        {text: getTranslatedText('email'), url: 'mailto:patch.rodriguez.medina@gmail.com', icon: <EmailIcon />},
        {text: 'LinkedIn', url: 'https://www.linkedin.com/in/lnpatchrodriguezmedina/', icon: <LinkedInIcon/>},
        {text: 'GitHub', url: 'https://github.com/XKeeXE', icon: <GitHubIcon/>},
        {text: 'Source Code', url: 'https://github.com/XKeeXE/pl-patch', icon: <GitHubIcon/>}
    ];

    return (
        <>
        <UINavbar darkMode={darkMode} language={language} showMenuDropdown={showMenuDropdown} 
        showProjectDropdown={showProjectDropdown} setDarkMode={setDarkMode} setLanguage={setLanguage} 
        setShowMenuDropdown={setShowMenuDropdown} setShowProjectDropdown={setShowProjectDropdown} 
        getTranslatedText={getTranslatedText} slides={slides}/>
        <Swiper
            className='max-h-[95.5vh]'
            onClick={() => {setShowMenuDropdown(false); setShowProjectDropdown(false)}}
            modules={[Mousewheel, HashNavigation, Pagination]}
            direction='vertical'
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
                <div className='flex flex-col justify-center items-center h-full'>
                    <div className='font-text'>
                        <p className='text-4xl font-bold'>{getTranslatedText('greetings')}</p>
                        <div className='flex flex-row gap-1 items-center'>
                            <p className={language === 'ja' ? 'pt-3' : ''}>{getTranslatedText('introName')}</p>
                            {language === 'ja' ? 
                            <>
                                <ruby className='text-xl font-bold'>Sebastian<rt>セバスチャン</rt></ruby>
                                <ruby className='text-xl font-bold'>Rodriguez<rt>ロドリゲス</rt></ruby>
                                <ruby className='text-xl font-bold'>Medina<rt>メディナ</rt></ruby>
                                <p className='pt-3'>ですが</p>
                            </>
                            : <p className='text-xl font-bold'>Sebastian Rodriguez Medina</p>}
                        </div>
                        <div className='flex flex-row gap-1 items-center'>
                            {language === 'ja' ? <></> : <p className='pt-1'>{getTranslatedText('introPenname')}</p>}
                            {language === 'ja' ? 
                            <>
                                <ruby className='text-xl font-bold'>Patch<rt>パッチ</rt></ruby>
                                <p className='pt-2'>と呼んでいただいてもいいです</p>
                            </>
                            : <p className='text-2xl font-bold'>Patch</p>}
                        </div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide data-hash="about">
                <div className='flex justify-center items-center h-full font-text'>
                    <Card>
                        <CardHeader className='flex justify-center font-text text-2xl font-bold'>
                            <p>{getTranslatedText('aboutHeader')}</p>
                        </CardHeader>
                        <CardBody>
                            <div className='flex flex-col items-center'>
                                <div>
                                    <p>{getTranslatedText('aboutIntro1')}</p>
                                </div>
                                <p className='border-2 w-full'>Here goes the skills viewer</p>
                            </div>
                        </CardBody>
                        <CardFooter>
                            <div className='flex flex-row gap-1 text-xs'>
                                <p>{getTranslatedText('skillsIntro')}</p>
                                Blender, C#, C++, CSS, Discord.py, Docker, Electron, 
                                FFmpeg, Fabric API, GDScript, GitHub, Godot 4, HTML, 
                                Java, JavaScript, jQuery, LavaPlayer, MongoDB, Next.js, 
                                Node.js, Oracle, PHP, Python, Rabbit MQ, React, Ruby, 
                                Scrum, SQL, Apache Spark, T-SQL, Tauri, Technical Writing, 
                                Trello, UE5, Unity, Vite, XML.
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </SwiperSlide>
            <SwiperSlide data-hash="projects" >
                <div className='flex justify-center h-full'>
                    <p className='self-center'>{getTranslatedText('projectList')}</p>
                </div>
            </SwiperSlide>
            {slides.map((project, index) => (
                <SwiperSlide data-hash={project.name} key={project.name} virtualIndex={index}>
                    <div className='flex justify-center h-full'>
                        <ProjectCardView
                            getTranslatedText={getTranslatedText} 
                            darkMode={darkMode}
                            language={language}
                            currentSlide={slides[index]}
                            />
                    </div>
                </SwiperSlide>
            ))}
            <SwiperSlide data-hash="portofolio">
                <div className='flex justify-center h-full'>
                    <Card className="w-[40vw] self-center " shadow="none">
                        <CardHeader className="justify-center">
                            <div className="flex flex-col items-center gap-1">
                                <p className="font-title text-2xl">{"website"}</p>
                                <p className="font-text text-sm">{"test"}</p>
                            </div>
                        </CardHeader>
                        <CardBody className="flex flex-col gap-3 items-center">
                            <p className="font-text">{"test"}</p>
                        </CardBody>
                        <CardFooter className="border-t-2 flex justify-center">
                            <button className="border-2 p-2 rounded-lg">
                                <p>{getTranslatedText('sourceCode')}</p>
                            </button>
                        </CardFooter>
                    </Card>
                </div>
            </SwiperSlide>

            <SwiperSlide data-hash="contacts">
                <LinksCard headerText={getTranslatedText('contacts')} linkItems={contactsItems}/>
            </SwiperSlide>
        </Swiper>
        </>
    );
}

export default WindView;