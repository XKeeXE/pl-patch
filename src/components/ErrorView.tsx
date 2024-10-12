import { useEffect } from "react";
import ProjectList from "./ProjectList";

const OnWindChanged = new CustomEvent('OnWindChanged', {});

const ErrorView = (props: {setIsHomePage: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const { setIsHomePage } = props;

    // Activates when the error page is entered
    useEffect(() => {
        window.dispatchEvent(OnWindChanged);
        setIsHomePage(false);
    }, [])

    return (
        <div className="h-[95vh]">
            <ProjectList errorView={true}/>
        </div>)
}

export default ErrorView;