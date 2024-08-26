import { slide, TranslatedText } from "../Types/types";

import { Link } from "react-router-dom";

import WebIcon from '@mui/icons-material/Web';
import { useEffect } from "react";

const ProjectList = (props: {getTranslatedText: TranslatedText, slides: slide[], gradient: string}) => {
    const {getTranslatedText, slides, gradient } = props;

    const gridSize = Math.ceil(Math.sqrt(slides.length+1));
    const remainingSlots = Math.abs((slides.length+1) - gridSize * gridSize);

    const AddGhosts = (): JSX.Element => {
        let ghosts = []; // Array of empty projects
        for (let i = 0; i < remainingSlots; i++) {
            ghosts.push('')
        }
        return (
            <>
            {ghosts.map((ghost, index) => (
                <ProjectButton key={index} dashed={true} >
                    {ghost}
                </ProjectButton>
            ))}
            </>
        )
    }

    const ProjectButton = (props: any) => {
        const { dashed, icon, name, gradient } = props;
        return (
            <button className={"w-[160px] h-[60px] p-2 rounded-lg border-2 hover:bg-[#e9e9e95d] border-[#f0f0f0] dark:hover:bg-[#353535a2] dark:border-[#0f0f0f] " + (dashed ? ' border-dashed' : '')}>
                {!dashed && (
                    <div className="flex flex-row items-center gap-2 ">
                        { icon }
                        <div className="flex flex-col text-start">
                            <span className={`text-sm self-start font-bold font-title bg-clip-text text-transparent bg-gradient-to-b ${gradient}`}>{name}</span>
                            <span className="text-xs">{getTranslatedText(`miniSummary${name}`)}</span>
                        </div>
                    </div>
                )}      
            </button>
        )
    }

    return (
        <div className='flex flex-col justify-center h-full gap-5 items-center'>
            <div className="flex flex-col gap-1 items-center">
                <span className={'text-2xl md:text-4xl font-title'}>{getTranslatedText('projectList')}</span>
            </div>
            <div className={`grid self-center gap-4 grid-cols-2 md:grid-cols-3 ${gridSize} `} style={{
                // gridTemplateColumns: `repeat(${gridSize}, 1fr)`
            }}>
                {slides.map(project => (
                    <Link tabIndex={-1} key={project.name} to={`/projects/${project.name}`}>
                        <ProjectButton dashed={false} icon={project.icon} name={project.name} gradient={project.gradient}/>
                    </Link>
                ))}
                <a tabIndex={-1} href="#portfolio">
                    <ProjectButton dashed={false} icon={<WebIcon/>} name={"PORTFOLIO"} gradient={gradient}/>
                </a>
                {AddGhosts()}
            </div>
        </div>
        )
}

export default ProjectList;