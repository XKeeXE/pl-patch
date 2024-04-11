import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import ProjectCardView from './ProjectCardView';

import languages from '../assets/languages.json';

import 'swiper/css';
import 'swiper/css/navigation';

const WindView = (props: any) => {
    const { getTranslatedText } = props;

    // const swiperMargins = '20px';

    interface projectSlide {
        translator: string,
        name: string,
        details: string,
        credits1: string,
        credits2: string,
        credits3: string,
        credits4: string,
        sourceCode: string,
    }

    const projectSlides: projectSlide[] = [{
        translator: getTranslatedText,
        name: getTranslatedText('projTitleBGM'),
        details: getTranslatedText('projDetailsBGM'),
        credits1: getTranslatedText('projCredits1BGM'),
        credits2: getTranslatedText('projCredits2BGM'),
        credits3: getTranslatedText('projCredits3BGM'),
        credits4: getTranslatedText('projCredits4BGM'),
        sourceCode: 'https://github.com/XKeeXE/bgm-app'
        },
        {
        translator: getTranslatedText,
        name: getTranslatedText(''),
        details: getTranslatedText(''),
        credits1: getTranslatedText(''),
        credits2: getTranslatedText(''),
        credits3: getTranslatedText(''),
        credits4: getTranslatedText(''),
        sourceCode: 'https://localhost:3000'
        }
    ];

    return (
        <>
        <Swiper
            navigation={true} 
            modules={[Navigation]}
            spaceBetween={100}
            loop={true}
            // enabled={}
            style={{
                // marginTop: swiperMargins,
                // marginLeft: swiperMargins,
                // marginRight: swiperMargins,
                // overflow: 
            }}
            // slidesPerView={3}
            // onSlideChange={() => console.log('slide change')}
        >
            {projectSlides.map(project => (
                <SwiperSlide>
                <ProjectCardView 
                    getTranslatedText={project.translator} 
                    projectName={project.name} 
                    projectDetails={project.details} 
                    projectCredits1={project.credits1}
                    projectCredits2={project.credits2}
                    projectCredits3={project.credits3}
                    projectCredits4={project.credits4}
                    sourceCode={project.sourceCode}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
        </>
    );
}

export default WindView;