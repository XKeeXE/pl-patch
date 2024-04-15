import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import ProjectCardView from './ProjectCardView';

import 'swiper/css';
import 'swiper/css/navigation';
import UnityView from './demo/unity/UnityView';
import BGMApp from './demo/bgmApp/BGMApp';

const WindView = (props: any) => {
    const { getTranslatedText } = props;
    
    interface slide {
        translator: string,
        demoAvailable: boolean,
        icon: string,
        name: string,
        images: image[],
        video: string,
        demoComponent: JSX.Element,
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
            url: 'Imgs/BGMApp/List&Search.png',
            title: 'List&Search',
        },
        {
            url: 'Imgs/BGMApp/Results&Queue.png',
            title: 'Results&Queue',
        },
        {
            url: 'Imgs/BGMApp/ModalView.png',
            title: 'ModalView',
        },
        {
            url: 'Imgs/BGMApp/ModalViewClose.png',
            title: 'ModalViewClose',
        },
        {
            url: 'Imgs/BGMApp/Navbar.png',
            title: 'Navbar',
        },
    ]

    const slides: slide[] = [
        {
            translator: getTranslatedText,
            demoAvailable: true,
            icon: 'Icons/Oni.png',
            name: 'BGM',
            images: imagesBGM,
            video: '',
            demoComponent: <BGMApp/>,
            sourceCode: 'https://github.com/XKeeXE/bgm-app'
        },
    ];
    
    return (
        <>
        <Swiper
            navigation={true} 
            modules={[Navigation]}
            spaceBetween={100}
            loop={true}
            style={{
                // marginTop: swiperMargins,
                // marginLeft: swiperMargins,
                // marginRight: swiperMargins,
                // overflow: 
            }}
        >
            {slides.map(project => (
                <SwiperSlide key={project.name}>
                    <ProjectCardView 
                        getTranslatedText={project.translator} 
                        demoAvailable={project.demoAvailable}
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