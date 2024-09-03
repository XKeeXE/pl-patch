import { useContext, useEffect } from "react";
import { TranslatedText } from "../Types/types";
import UIButton from "./UIButton";
import { Link } from "react-router-dom";
import { SlidesContext } from "./AppView";
import ProjectList from "./ProjectList";

const ErrorView = (props: {setIsHomePage: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const { setIsHomePage } = props;

    const { getTranslatedText, slides} = useContext(SlidesContext);

    // Activates when the error page is entered
    useEffect(() => {
        setIsHomePage(false);
    }, [])

    return (
        // <div className="flex flex-col justify-center items-center h-[95vh] gap-4">
        //     <span>{getTranslatedText('error')}</span>
        //     {/* <Link to={"/#home"} className=""> TODO PROJECT LIST
        //         <UIButton card={true}>
        //             <span>{getTranslatedText('home')}</span>
        //         </UIButton>
        //     </Link> */}
        // </div>)
        <ProjectList/>)
}

export default ErrorView;