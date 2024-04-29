import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Virtual } from 'swiper/modules';
import ProjectCardView from './ProjectCardView';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import BGMApp from './demo/BGMApp';
import UnityView from './demo/UnityView';
import { useState } from 'react';

const WindView = (props: any) => {
    const { darkMode, language, getTranslatedText } = props;

    const [swiperRef, setSwiperRef] = useState<any>(null);
    
    interface slide {
        icon: string,
        name: string,
        images: image[],
        video: string,
        demoComponent: JSX.Element | undefined,
        sourceCode: string,
    }

    interface image {
        url: string,
        title: string,
    }
    
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

    const slides: slide[] = [
        {
            icon: 'Icons/Oni.png',
            name: 'BGM',
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
            icon: 'Icons/L2DWP.png',
            name: '',
            images: [],
            video: 't',
            demoComponent: undefined,
            sourceCode: '',
        }
    ];


    function SlideTo(index: number) {
        swiperRef.slideTo(index, 0);
    }
    
    return (
        <>
        <Swiper
            // navigation={true} 
            // modules={[Navigation]}
            // modules={[Virtual]}
            onSwiper={setSwiperRef}
            spaceBetween={100}
            loop={true}
            pagination={true} 
            // modules={[Pagination]}
            style={{
                // minWidth: '1000px',
                // marginTop: swiperMargins,
                // marginLeft: swiperMargins,
                // marginRight: swiperMargins,
                // overflow: 
            }}
        >
            {slides.map((project, index) => (
                <SwiperSlide key={project.name} virtualIndex={index}>
                    <ProjectCardView 
                        getTranslatedText={getTranslatedText} 
                        darkMode={darkMode}
                        language={language}
                        slides={slides}
                        SlideTo={SlideTo}
                        icon={project.icon}
                        name={project.name} 
                        images={project.images}
                        video={project.video}
                        demoComponent={project.demoComponent}
                        sourceCode={project.sourceCode}
                        />
                </SwiperSlide>
            ))}
        </Swiper>
        </>
    );
}

export default WindView;