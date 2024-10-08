import { useContext, useEffect } from "react";
import { TranslatedText } from "../Types/types";
import UIButton from "./UIButton";
import { Link } from "react-router-dom";
import { SlidesContext } from "./AppView";
import ProjectList from "./ProjectList";


const ErrorView = (props: {setIsHomePage: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const { setIsHomePage } = props;

    // Activates when the error page is entered
    useEffect(() => {
        setIsHomePage(false);
    }, [])

    return (
        <div className="h-[95vh]">
            <ProjectList errorView={true}/>
        </div>)
}

export default ErrorView;