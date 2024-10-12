import { Link } from "react-router-dom";

import WebIcon from '@mui/icons-material/Web';
import { CSSProperties, useContext, useEffect, useState } from "react";
import { SlidesContext } from "./AppView";
import UIGhosts from "./UIGhosts";
import SvgAssets from "./SvgAssets";

const gradient = ' bg-clip-text text-transparent bg-gradient-to-br from-[#0089fe] from-0% to-[#15c31e] to-100%'

const ProjectList = (props: {errorView: boolean}) => {
    const { errorView } = props;
    const { isHomePage, getTranslatedText, slides } = useContext(SlidesContext)

    const gridSize = Math.ceil(Math.sqrt(slides.length+1));
    const [gridStyle, setGridStyle] = useState<CSSProperties>({gridTemplateColumns: `repeat(${gridSize}, 1fr)`}); // Default grid size

    const updateGridSize = () => {
        if (window.innerWidth < 640) { // Tailwind sm breakpoint
            setGridStyle({gridTemplateColumns: `repeat(2, 1fr)`});
        } else {
            setGridStyle({gridTemplateColumns: `repeat(${gridSize}, 1fr)`}); 
        }
    };

    useEffect(() => {
        updateGridSize();
        window.addEventListener('resize', updateGridSize);
    
        return () => {
          window.removeEventListener('resize', updateGridSize);
        };
    }, [])

    const ShowPortfolio = (): JSX.Element => {
        const name = "PORTFOLIO"
        if (isHomePage) {
            return (
                <a tabIndex={-1} href="#portfolio">
                    <ProjectButton dashed={false} icon={<SvgAssets icon='portfolio'/>} name={name} gradient={gradient}/>
                </a>
            )
        }
        return (
            <Link tabIndex={-1} to={`/#home`}>
                <ProjectButton dashed={false} icon={<SvgAssets icon='portfolio'/>} name={name} gradient={gradient}/>
            </Link>
        )
    }

    const ProjectButton = (props: {
        children?: React.ReactNode,
        dashed: boolean,
        icon?: JSX.Element,
        name?: string,
        gradient?: string
    }) => {
        const { dashed, icon, name, gradient } = props;
        return (
            <button className={"w-[150px] h-[60px] p-2 rounded-lg border-2  border-[#f0f0f0] dark:border-[#0f0f0f] " + (dashed ? ' border-dashed hover:bg-[#f2f2f231] dark:hover:bg-[#35353525]' : 'hover:bg-[#f2f2f288] dark:bg-[#181a1b] dark:hover:bg-[#353535a2]')}>
                {!dashed && (
                    <div className="flex flex-row items-center gap-2">
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
                <span className={'text-4xl font-title'}>{getTranslatedText('projectList')}</span>
            </div>
            <div className={`grid self-center gap-2`} style={gridStyle}>
                {slides.map(project => (
                    <Link tabIndex={-1} key={project.name} to={`/projects/${project.name}`}>
                        <ProjectButton dashed={false} icon={project.icon} name={project.name} gradient={project.gradient} />
                    </Link>
                ))}
                <ShowPortfolio/>
                <UIGhosts itemsLength={slides.length+1}>
                    <div className="hidden sm:inline">
                        <ProjectButton dashed={true} />
                    </div>
                </UIGhosts>
            </div>
            {errorView ? <span>{getTranslatedText('error')}</span> : null}

        </div>
    )
}

export default ProjectList;