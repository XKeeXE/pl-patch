import { useEffect } from "react";
import { TranslatedText } from "../Types/types";
import UIButton from "./UIButton";
import { Link } from "react-router-dom";

const ErrorView = (props: {setIsHomePage: React.Dispatch<React.SetStateAction<boolean>>, getTranslatedText: TranslatedText,}) => {
    const { setIsHomePage, getTranslatedText } = props;

    // Activates when the error page is entered
    useEffect(() => {
        setIsHomePage(false);
    }, [])

    return (
        <div className="flex flex-col justify-center items-center h-[95vh] gap-4">
            <span>{getTranslatedText('error')}</span>
            {/* <Link to={"/#home"} className="">
                <UIButton card={true}>
                    <span>{getTranslatedText('home')}</span>
                </UIButton>
            </Link> */}
        </div>)
}

export default ErrorView;