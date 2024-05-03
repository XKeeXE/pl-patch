import { Swiper, SwiperSlide } from 'swiper/react';
import ProjectCardView from './ProjectCardView';
import { useState } from 'react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination, Navigation, Mousewheel, HashNavigation } from 'swiper/modules';

import { slide, image, TranslatedText } from '../Types/types';

import BGMApp from './demo/BGMApp';
import UnityView from './demo/UnityView';
import OnigiriIcon from './svgIcons/OnigiriIcon';

const WindView = (props: {darkMode: boolean, language: string, getTranslatedText: TranslatedText}) => {
    const { darkMode, language, getTranslatedText } = props;

    const [swiperRef, setSwiperRef] = useState<any>(null);

    const pagination = {
        clickable: true,
        renderBullet: function (index: number, className: string) {
          return '<span class="' + className + '">' + '</span>';
        },
      };
    
    const imagesBGM: image[] = [{
            url: 'Imgs/BGMApp/Awake.png',
            title: 'Awake',
        },
        {
            url: 'Imgs/BGMApp/Layout.png',
            title: 'Layout',
        },
        {
            url: 'Imgs/BGMApp/Results&Queue.png',
            title: 'Results&Queue',
        },
        {
            url: 'Imgs/BGMApp/Navbar.png',
            title: 'Navbar',
        },
        {
            url: 'Imgs/BGMApp/List&Search.png',
            title: 'List&Search',
        },
        {
            url: 'Imgs/BGMApp/ContextMenu.png',
            title: 'ContextMenu',
        }
    ]

    const imagesL2DWP: image[] = [{
            url: 'Imgs/L2DWP/CharacterIdle.png',
            title: 'CharacterIdle'
        },
        {
            url: 'Imgs/L2DWP/CharacterTalk.png',
            title: 'CharacterTalk',
        },
        {
            url: 'Imgs/L2DWP/CharacterUI.png',
            title: 'CharacterUI',
        },
        {
            url: 'Imgs/L2DWP/NextCharacterIdle.png',
            title: 'NextCharacterIdle',
        },
        {
            url: 'Imgs/L2DWP/NextCharacterTalk.png',
            title: 'NextCharacterTalk',
        },
    ]

    const imagesPCVR: image[] = [{
            url: 'Imgs/PCVR/Slash.png',
            title: 'Slash',
        },
        {
            url: 'Imgs/PCVR/VRPov.png',
            title: 'VRPov'
        },
        {
            url: 'Imgs/PCVR/Zipline.png',
            title: 'Zipline',
        },
        {
            url: 'Imgs/PCVR/2D.png',
            title: '2D',
        },
]

    const slides: slide[] = [{
            icon: 'Icons/Oni.png',
            name: 'BGMApp',
            images: imagesBGM,
            video: './Videos/BGM-APPDemoVid.mp4',
            demoComponent: <BGMApp/>,
            sourceCode: 'https://github.com/XKeeXE/bgm-app'
        },
        {
            icon: 'Icons/L2DWP.png',
            name: 'L2DWP',
            images: imagesL2DWP,
            video: './Videos/L2DWPDemoVid.mp4',
            demoComponent: <UnityView/>,
            sourceCode: 'https://github.com/XKeeXE/Live2DWallpaper',
        },
        {
            icon: 'Icons/PCVR.png',
            name: 'PCVR',
            images: imagesPCVR,
            video: 't',
            demoComponent: undefined,
            sourceCode: '',
        }
    ];


    // function SlideTo(index: number) {
    //     console.log(index);
    //     swiperRef.slideTo(index, 0);
    // }
    
    return (
        <>
        {/* <Swiper
            navigation={true}
            // modules={[Navigation]}
            // modules={[Virtual]}
            onSwiper={setSwiperRef}
            spaceBetween={100}
            loop={true}
            draggable={false}
            // virtual
            // enabled={false}
            modules={[Pagination, Navigation]}
            pagination={pagination}
        >
            {slides.map((project, index) => (
                <SwiperSlide key={project.name} virtualIndex={index}>
                    <ProjectCardView
                        getTranslatedText={getTranslatedText} 
                        darkMode={darkMode}
                        language={language}
                        slides={slides}
                        // SlideTo={SlideTo}
                        currentSlide={slides[index]}
                        />
                </SwiperSlide>
            ))}
        </Swiper> */}
        <Swiper
            className='max-h-[96.8vh]'
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
                <div className='flex justify-center h-full'>
                    <p className='self-center'>home</p>
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
                            slides={slides}
                            currentSlide={slides[index]}
                            />
                    </div>
                </SwiperSlide>
            ))}
            <SwiperSlide data-hash="contacts">
                <div className='flex justify-center h-full'>
                    <p className='self-center'>contacts</p>
                </div>
            </SwiperSlide>
        </Swiper>
        </>
    );
}

export default WindView;