import { SwiperRef, SwiperSlide } from 'swiper/react';
import ProjectCardView from './ProjectCardView';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination, Mousewheel, HashNavigation } from 'swiper/modules';

import { link, skill } from '../Types/types';
import LinksCard from './LinksCard';
import ProjectList from './ProjectList';
import { useContext, useEffect, useRef } from 'react';
import CustomSwiper from './CustomSwiper';
import { SlidesContext } from './AppView';

const validKeys: string[] = ['w', 's', 'ArrowUp', 'ArrowDown'];

const WindView = (props: {
    language: string, 
    setIsHomePage: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const { language, setIsHomePage } = props;

    const {getTranslatedText, slides} = useContext(SlidesContext)

    const swiper = useRef<SwiperRef>(null);

    const currentYear = new Date().getFullYear();

    const gradient = ' bg-clip-text text-transparent bg-gradient-to-br from-[#0089fe] from-0% to-[#15c31e] to-100%'

    const skills: skill[] = [
        { img: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Apache_Spark_logo.svg', link: { text: 'Apache Spark', url: 'https://spark.apache.org/' } },
        { img: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Blender_logo_no_text.svg', link: { text: 'Blender', url: 'https://www.blender.org/' } },
        { img: 'https://upload.wikimedia.org/wikipedia/commons/3/35/The_C_Programming_Language_logo.svg', link: { text: 'C', url: 'https://www.geeksforgeeks.org/c-programming-language/' } },
        { img: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/C_Sharp_Logo_2023.svg', link: { text: 'C#', url: 'https://learn.microsoft.com/en-us/dotnet/csharp/' } },
        { img: 'https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg', link: { text: 'C++', url: 'https://www.w3schools.com/cpp/cpp_intro.asp' } },
        { img: 'https://www.svgrepo.com/show/373535/css.svg', link: { text: 'CSS', url: 'https://www.w3.org/TR/CSS/#css' } },
        { img: 'https://wasimaster.gallerycdn.vsassets.io/extensions/wasimaster/discord-py-snippets/1.2.1/1604309045628/Microsoft.VisualStudio.Services.Icons.Default', link: { text: 'Discord.py', url: 'https://discordpy.readthedocs.io' } },
        { img: 'https://www.svgrepo.com/show/448221/docker.svg', link: { text: 'Docker', url: 'https://www.docker.com/' } },
        { img: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Electron_Software_Framework_Logo.svg', link: { text: 'Electron', url: 'https://www.electronjs.org/' } },
        { img: './Icons/ffmpeg.svg', link: { text: 'FFmpeg', url: 'https://ffmpeg.org/' } },
        { img: 'https://www.svgrepo.com/show/452202/figma.svg', link: { text: 'Figma', url: 'https://www.figma.com/' } },
        { img: 'https://upload.wikimedia.org/wikipedia/commons/6/66/F_Sharp_logo.svg', link: { text: 'F#', url: 'https://fsharp.org/' } },
        { img: 'https://www.svgrepo.com/show/439171/github.svg', link: { text: 'GitHub', url: 'https://github.com/' } },
        { img: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Go_Logo_Blue.svg', link: { text: 'Go', url: 'https://go.dev/' } },
        { img: 'https://www.svgrepo.com/show/373641/godot.svg', link: { text: 'Godot 4', url: 'https://godotengine.org/' } },
        { img: 'https://www.svgrepo.com/show/452228/html-5.svg', link: { text: 'HTML', url: 'https://html.spec.whatwg.org/' } },
        { img: 'https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg', link: { text: 'Java', url: 'https://www.oracle.com/java/' } },
        { img: 'https://www.svgrepo.com/show/349419/javascript.svg', link: { text: 'Javascript', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript' } },
        { img: 'https://www.svgrepo.com/show/452242/jquery.svg', link: { text: 'jQuery', url: 'https://jquery.com/' } },
        { img: '', link: { text: 'Kotlin', url: '' } },
        { img: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Calligrakrita-base.svg', link: { text: 'Krita', url: 'https://krita.org/' } },
        { img: 'https://www.svgrepo.com/show/354020/lua.svg', link: { text: 'Lua', url: 'https://www.lua.org/' } },
        { img: 'https://upload.wikimedia.org/wikipedia/en/5/5a/MongoDB_Fores-Green.svg', link: { text: 'MongoDB', url: 'https://www.mongodb.com/' } },
        { img: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg', link: { text: 'Next.js', url: 'https://nextjs.org/' } },
        { img: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg', link: { text: 'Node.js', url: 'https://nodejs.org' } },
        { img: 'https://www.svgrepo.com/show/448245/oracle.svg', link: { text: 'Oracle', url: 'https://www.oracle.com/database/' } },
        { img: 'https://alefragnani.gallerycdn.vsassets.io/extensions/alefragnani/pascal/9.0.0/1581635737477/Microsoft.VisualStudio.Services.Icons.Default', link: { text: 'Pascal', url: 'https://www.freepascal.org/' } },
        { img: 'https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg', link: { text: 'PHP', url: 'https://www.php.net/' } },
        { img: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg', link: { text: 'Python', url: 'https://www.python.org/' } },
        { img: 'https://www.svgrepo.com/show/354250/rabbitmq-icon.svg', link: { text: 'Rabbit MQ', url: 'https://www.rabbitmq.com/' } },
        { img: 'https://upload.wikimedia.org/wikipedia/commons/3/30/React_Logo_SVG.svg', link: { text: 'React', url: 'https://react.dev/' } },
        { img: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Ruby_logo.svg', link: { text: 'Ruby', url: 'https://www.ruby-lang.org' } },
        { img: 'https://www.svgrepo.com/show/372946/scrum.svg', link: { text: 'Scrum', url: 'https://www.scrum.org/learning-series/what-is-scrum/' } },
        { img: 'https://www.svgrepo.com/show/374093/sql.svg', link: { text: 'SQL', url: 'https://www.sqltutorial.org/what-is-sql/' } },
        { img: 'https://www.svgrepo.com/show/374005/prolog.svg', link: { text: 'SWI-Prolog', url: 'https://www.swi-prolog.org/' } },
        { img: './Icons/tsql.svg', link: { text: 'T-SQL', url: 'https://learn.microsoft.com/en-us/sql/t-sql/language-reference?view=sql-server-ver16' } },
        { img: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg', link: { text: 'TailwindCSS', url: 'https://tailwindcss.com/' } },
        { img: 'https://tauri-apps.gallerycdn.vsassets.io/extensions/tauri-apps/tauri-vscode/0.2.1/1666710948930/Microsoft.VisualStudio.Services.Icons.Default', link: { text: 'Tauri', url: 'https://tauri.app/' } },
        // { img: './Icons/writing.svg', link: { text: 'Technical Writing', url: 'https://www.indeed.com/career-advice/career-development/technical-writing' } },
        { img: 'https://www.svgrepo.com/show/354463/trello.svg', link: { text: 'Trello', url: 'https://trello.com/' } },
        { img: 'https://www.svgrepo.com/show/349540/typescript.svg', link: { text: 'Typescript', url: 'https://www.typescriptlang.org/' } },
        { img: './Icons/unreal.svg', link: { text: 'UE5', url: 'https://www.unrealengine.com/' } },
        { img: 'https://www.svgrepo.com/show/331626/unity.svg', link: { text: 'Unity', url: 'https://unity.com/' } },
        { img: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Vitejs-logo.svg', link: { text: 'Vite', url: 'https://vite.dev/' } },
        { img: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Extensible_Markup_Language_%28XML%29_logo.svg', link: { text: 'XML', url: 'https://wpdean.com/what-is-xml/' } },
    ];

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

    // Defines the available way to navigate through Swiper using keyboard keys
    const OnKeyDown = (e: KeyboardEvent) => {
        if (!validKeys.includes(e.key)) {
            return;
        }
        if (e.key === 'w' || e.key === 'ArrowUp') {
            swiper.current?.swiper.slidePrev();
        } else { // Down key was pressed
            swiper.current?.swiper.slideNext();
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
                        {/* <span>{getTranslatedText('aboutIntro')}</span> */}
                        <p className='block'>{getTranslatedText('about', { years: currentYear - 2017})}</p>
                        {/* <span>{getTranslatedText('aboutEnd')}</span> */}
                    </div>
                </div>
            </div>
        )
    }

    const Skills = () => {
        return (
            <div className='flex flex-col h-full font-title gap-4 items-center justify-center '>
                <span className='font-title text-4xl'>{getTranslatedText('skills')}</span>
                <div className='grid grid-cols-8 gap-2'>
                    {skills.map(skill => (
                        <span className='inline-flex border-2 p-1 cursor-pointer rounded-lg text-xs items-center border-[#f0f0f0] hover:bg-[#f2f2f2] dark:border-[#0f0f0f] dark:hover:bg-[#353535a2]' onClick={() => {window.open(skill.link.url, '_blank');}}>
                            <img src={skill.img} className='w-5 h-5 xl:w-8 xl:h-8 mx-1 ' alt={skill.link.text}/>
                            {/* <span className='hidden lg:inline font-title' onClick={() => {
                                window.open(skill.link.url, '_blank');
                            }}>{skill.link.text}</span> */}
                        </span>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <CustomSwiper className={'max-h-[92.8vh] lg:max-h-[94vh] xl:max-h-[95.5vh]'} swiper={swiper} swiperProps={{
            modules: [Mousewheel, HashNavigation, Pagination],
            spaceBetween: 50,
            hashNavigation: {
                watchState: true
            },
        }} OnKeyDown={OnKeyDown}>
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
            <SwiperSlide data-hash="skills">
                <Skills/>
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