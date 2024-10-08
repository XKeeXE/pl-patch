import { useState } from "react";
import { slide, TranslatedText } from "../Types/types";
import UIButton from "./UIButton";

const ProjectDemoView = (props: {getTranslatedText: TranslatedText, project: slide}) => {
    const { getTranslatedText, project } = props;
    const [demoActive, setDemoActive] = useState<boolean>(false);

    const DemoButton = (props: any) => {
        const { text, dashed, onClick } = props;
        return (
            <UIButton card={false} color={project.color} dashed={dashed} onClick={onClick}>
                <span>{text}</span>
            </UIButton>
        )
    }
    
    function onDemoClick() {
        setDemoActive(true);
    }
    
    const DemoComponent = (): JSX.Element => {
        if (!project.demoComponent) {
            return <DemoButton text={getTranslatedText('demoAvailable')} dashed={false} onClick={onDemoClick}/>
        }
        return <DemoButton text={getTranslatedText('demoError')} dashed={true}/>
    }

    return (
        <>
            {demoActive ? project.demoComponent
            :
            <div className='w-[50vw] sm:w-[25vw] lg:w-[20vw] xl:w-[10vw] flex justify-center'>
                {DemoComponent()}
            </div>
            }
        </>
    )
}

export default ProjectDemoView;