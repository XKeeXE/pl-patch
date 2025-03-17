import { useContext, useEffect, useState } from 'react';

import { SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination, Mousewheel, HashNavigation } from 'swiper/modules';

import ProjectCardView from './ProjectCardView';
import LinksCard from './LinksCard';
import ProjectList from './ProjectList';
import CustomSwiper from './CustomSwiper';
import UIGhosts from './UIGhosts';
import SvgAssets from './SvgAssets';
import { Tooltip } from '@nextui-org/react';

import { link, skill, slide } from '../Types/types';

import { SlidesContext } from './AppView';

const validKeys: string[] = ['w', 's', 'ArrowUp', 'ArrowDown'];

const tools: skill[] = [
    { img: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Blender_logo_no_text.svg', link: { text: 'Blender', url: 'https://www.blender.org/' } },
    { img: 'https://wasimaster.gallerycdn.vsassets.io/extensions/wasimaster/discord-py-snippets/1.2.1/1604309045628/Microsoft.VisualStudio.Services.Icons.Default', link: { text: 'Discord.py', url: 'https://discordpy.readthedocs.io' } },
    { img: 'https://www.svgrepo.com/show/448221/docker.svg', link: { text: 'Docker', url: 'https://www.docker.com/' } },
    { img: 'https://www.svgrepo.com/show/452202/figma.svg', link: { text: 'Figma', url: 'https://www.figma.com/' } },
    { img: './Icons/ffmpeg.svg', link: { text: 'FFmpeg', url: 'https://ffmpeg.org/' } },
    { img: 'https://www.svgrepo.com/show/439171/github.svg', link: { text: 'GitHub', url: 'https://github.com/' } },
    { img: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Calligrakrita-base.svg', link: { text: 'Krita', url: 'https://krita.org/' } },
    // { img: 'https://www.perforce.com/themes/custom/p4base/assets/images/logo.svg', link: { text: 'Perforce', url: 'https://www.perforce.com' } },
    { img: 'https://www.svgrepo.com/show/354250/rabbitmq-icon.svg', link: { text: 'Rabbit MQ', url: 'https://www.rabbitmq.com/' } },
    { img: 'https://upload.wikimedia.org/wikipedia/en/5/5a/MongoDB_Fores-Green.svg', link: { text: 'MongoDB', url: 'https://www.mongodb.com/' } },
    { img: 'https://www.svgrepo.com/show/448245/oracle.svg', link: { text: 'Oracle', url: 'https://www.oracle.com/database/' } },
    { img: 'https://www.svgrepo.com/show/372946/scrum.svg', link: { text: 'Scrum', url: 'https://www.scrum.org/learning-series/what-is-scrum/' } },
    { img: 'https://www.svgrepo.com/show/354463/trello.svg', link: { text: 'Trello', url: 'https://trello.com/' } },
    { img: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Vitejs-logo.svg', link: { text: 'Vite', url: 'https://vite.dev/' } },
]

const lang: skill[] = [
    { img: 'https://upload.wikimedia.org/wikipedia/commons/3/35/The_C_Programming_Language_logo.svg', link: { text: 'C', url: 'https://www.geeksforgeeks.org/c-programming-language/' } },
    { img: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/C_Sharp_Logo_2023.svg', link: { text: 'C#', url: 'https://learn.microsoft.com/en-us/dotnet/csharp/' } },
    { img: 'https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg', link: { text: 'C++', url: 'https://www.w3schools.com/cpp/cpp_intro.asp' } },
    { img: 'https://upload.wikimedia.org/wikipedia/commons/6/66/F_Sharp_logo.svg', link: { text: 'F#', url: 'https://fsharp.org/' } },
    { img: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Go_Logo_Blue.svg', link: { text: 'Go', url: 'https://go.dev/' } },
    { img: 'https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg', link: { text: 'Java', url: 'https://www.oracle.com/java/' } },
    { img: 'https://www.svgrepo.com/show/349419/javascript.svg', link: { text: 'Javascript', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript' } },
    { img: 'https://www.svgrepo.com/show/452242/jquery.svg', link: { text: 'jQuery', url: 'https://jquery.com/' } },
    { img: 'https://fwcd.gallerycdn.vsassets.io/extensions/fwcd/kotlin/0.2.35/1722211322826/Microsoft.VisualStudio.Services.Icons.Default', link: { text: 'Kotlin', url: 'https://kotlinlang.org/' } },
    { img: 'https://www.svgrepo.com/show/354020/lua.svg', link: { text: 'Lua', url: 'https://www.lua.org/' } },
    { img: 'https://alefragnani.gallerycdn.vsassets.io/extensions/alefragnani/pascal/9.0.0/1581635737477/Microsoft.VisualStudio.Services.Icons.Default', link: { text: 'Pascal', url: 'https://www.freepascal.org/' } },
    { img: 'https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg', link: { text: 'PHP', url: 'https://www.php.net/' } },
    { img: 'https://www.svgrepo.com/show/374005/prolog.svg', link: { text: 'Prolog', url: 'https://builtin.com/software-engineering-perspectives/prolog' } },
    { img: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg', link: { text: 'Python', url: 'https://www.python.org/' } },
    { img: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Ruby_logo.svg', link: { text: 'Ruby', url: 'https://www.ruby-lang.org' } },
    { img: 'https://www.svgrepo.com/show/374093/sql.svg', link: { text: 'SQL', url: 'https://www.sqltutorial.org/what-is-sql/' } },
    { img: 'https://www.svgrepo.com/show/473725/microsoftsqlserver.svg', link: { text: 'T-SQL', url: 'https://learn.microsoft.com/en-us/sql/t-sql/language-reference?view=sql-server-ver16' } },
    { img: 'https://www.svgrepo.com/show/349540/typescript.svg', link: { text: 'Typescript', url: 'https://www.typescriptlang.org/' } },
    { img: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Extensible_Markup_Language_%28XML%29_logo.svg', link: { text: 'XML', url: 'https://wpdean.com/what-is-xml/' } },
]

const game: skill[] = [
    { img: 'https://www.svgrepo.com/show/373641/godot.svg', link: { text: 'Godot 4', url: 'https://godotengine.org/' } },
    { img: './Icons/unreal.svg', link: { text: 'Unreal Engine 5', url: 'https://www.unrealengine.com/' } },
    { img: 'https://www.svgrepo.com/show/331626/unity.svg', link: { text: 'Unity', url: 'https://unity.com/' } },
]

const web: skill[] = [
    { img: 'https://www.svgrepo.com/show/373535/css.svg', link: { text: 'CSS', url: 'https://www.w3.org/TR/CSS/#css' } },
    { img: 'https://www.svgrepo.com/show/452228/html-5.svg', link: { text: 'HTML', url: 'https://html.spec.whatwg.org/' } },
    { img: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Electron_Software_Framework_Logo.svg', link: { text: 'Electron', url: 'https://www.electronjs.org/' } },
    { img: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg', link: { text: 'Next.js', url: 'https://nextjs.org/' } },
    { img: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg', link: { text: 'Node.js', url: 'https://nodejs.org' } },
    { img: 'https://upload.wikimedia.org/wikipedia/commons/3/30/React_Logo_SVG.svg', link: { text: 'React', url: 'https://react.dev/' } },
    { img: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg', link: { text: 'TailwindCSS', url: 'https://tailwindcss.com/' } },
    { img: 'https://tauri-apps.gallerycdn.vsassets.io/extensions/tauri-apps/tauri-vscode/0.2.1/1666710948930/Microsoft.VisualStudio.Services.Icons.Default', link: { text: 'Tauri', url: 'https://tauri.app/' } },
]

const gradient = ' bg-clip-text text-transparent bg-gradient-to-br from-[#0089fe] from-0% to-[#15c31e] to-100%'

const currentYear = new Date().getFullYear();

const portfolio: slide = {
    color: '#2E8B57',
    gradient: gradient,
    icon: <SvgAssets icon='portfolio'/>,
    name: 'PORTFOLIO',
    video: '',
    links: []
}

const OnWindChanged = new CustomEvent('OnWindChanged', {}); // Located at UINavbar
const OnHomePage = new CustomEvent('OnHomePage', {}); // Located at UINavbar

const SkillSection = (props: {text: string, skill: skill[], ghosts?: boolean, custom?: number, ghostsNum?: number}) => {
    const { text, ghosts, skill, custom, ghostsNum } = props;
    const gridSize = custom ? custom : Math.ceil(Math.sqrt(skill.length+1));
    return (
        <div className='flex flex-col gap-2 items-center'>
            <span className=' text-sm xl:text-2xl'>{text}</span>
            <div className={`grid gap-2 ${custom}`} style={{
                gridTemplateColumns: `repeat(${gridSize}, 1fr)` 
            }}>
                {skill.map(item => (
                    <SkillButton skill={item} key={item.link.text} />
                ))}
                    {ghosts ?
                    <UIGhosts itemsLength={skill.length} custom={ghostsNum}>
                        <div className='border-2 p-1 cursor-pointer rounded-lg text-xs border-dashed border-[#f0f0f0] hover:bg-[#f2f2f231] dark:border-[#181a1b] dark:hover:bg-[#35353525] min-h-full'>
                            <img src={'./Icons/Empty.svg'} className='w-5 h-5 lg:w-8 lg:h-8 xl:w-11 xl:h-11 mx-1 object-'/>
                            
                            </div>
                    </UIGhosts>
                    :
                    null
                }
            </div>
        </div>
    )
}

const SkillButton = (props: {skill: skill}) => {
    const { skill } = props;
    const [open, setOpen] = useState<boolean>(false);

    return (
        <Tooltip content={skill.link.text} className='select-none' showArrow isOpen={open} disableAnimation>
            <span className='inline-flex border-2 p-1 cursor-pointer rounded-lg text-xs items-center dark:bg-[#181a1b] border-[#f0f0f0] hover:bg-[#f2f2f288] dark:border-[#0f0f0f] dark:hover:bg-[#353535a2]' 
            onClick={() => {window.open(skill.link.url, '_blank')}} 
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}>
                <img src={skill.img} className='w-5 h-5 lg:w-8 lg:h-8 xl:w-11 xl:h-11 object-fit md:mx-1' alt={skill.link.text}/>
            </span>
        </Tooltip>
    )
}

const WindView = (props: {
    language: string, 
    setIsHomePage: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const { language, setIsHomePage } = props;

    const {slides, swiper, getTranslatedText, getTranslatedParagraph} = useContext(SlidesContext)

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
        window.dispatchEvent(OnWindChanged);
        window.dispatchEvent(OnHomePage);
        setIsHomePage(true);
    }, [])

    // Defines the available way to navigate through Swiper using keyboard keys
    const OnKeyDown = (e: KeyboardEvent) => {
        if (!validKeys.includes(e.key)) {
            return;
        }
        if (e.key === 'w' || e.key === 'ArrowUp') {
            swiper?.current?.swiper.slidePrev();
        } else { // Down key was pressed
            swiper?.current?.swiper.slideNext();
        }
    };
    
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
                    {getTranslatedParagraph('intro', '', {
                        fn: <GetJP className='text-sm md:text-xl font-bold font-title' text='Sebastian' furigana='セバスチャン'/>, 
                        ln1: <GetJP className='text-sm md:text-xl font-bold font-title' text='Rodriguez' furigana='ロドリゲス'/>,
                        ln2: <GetJP className='text-sm md:text-xl font-bold font-title' text='Medina' furigana='メディナ'/>, 
                        pn: <GetJP className={`text-2xl font-bold font-title`} text='Patch' furigana='パッチ'/>
                    })}
                </div>
            </div>
        )
    }

    const AboutMe = () => {
        return (
            <div className='flex flex-col h-full font-text gap-4 items-center justify-center '>
                <div className='flex flex-col w-[80vw] md:w-[60vw] lg:w-[40vw] 2xl:w-[30vw] gap-2'>
                    <span className={`font-title text-4xl self-center`}>{getTranslatedText('aboutHeader')}</span>
                    {getTranslatedParagraph('about', 'flex flex-col gap-1 text-sm md:text-base', {years: currentYear - 2019})}
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
        }} OnKeyDown={OnKeyDown}>
            <SwiperSlide data-hash="home">
                <Home/>
            </SwiperSlide>
            <SwiperSlide data-hash="about">
                <AboutMe/>
            </SwiperSlide>
            <SwiperSlide data-hash="skills">
                <div className='flex flex-col h-full font-title items-center justify-center gap-4'>
                    <span className='text-4xl'>{getTranslatedText('skills')}</span>
                    <div className='flex justify-center gap-4'>
                        <SkillSection text={getTranslatedText('skillsLang')} skill={lang} ghosts ghostsNum={16}/>
                        <SkillSection text={getTranslatedText('skillsTools')} skill={tools} ghosts custom={2} ghostsNum={0}/>
                        <div className='flex flex-col gap-[20px] lg:gap-[30px]'>
                            <SkillSection text={getTranslatedText('skillsGame')} skill={game} ghosts/>
                            <SkillSection text={getTranslatedText('skillsWeb')} skill={web} custom={2} />
                        </div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide data-hash="projects" >
                <ProjectList errorView={false}/>
            </SwiperSlide>
            {slides.map(project => (
                <SwiperSlide data-hash={project.name.toLowerCase()} key={project.name}>
                    <ProjectCardView
                        viewable={true}
                        currentSlide={project}
                        />
                </SwiperSlide>
            ))}
            <SwiperSlide data-hash="portfolio">
                <ProjectCardView
                    viewable={false}
                    currentSlide={portfolio}
                    />
            </SwiperSlide>

            <SwiperSlide data-hash="contacts">
                <LinksCard headerText={getTranslatedText('contacts')} color={` border-[#f0f0f0] dark:border-[#0f0f0f] `} gradient={undefined} linkItems={contactsItems}/>
            </SwiperSlide>
        </CustomSwiper>
    );
}

export default WindView;