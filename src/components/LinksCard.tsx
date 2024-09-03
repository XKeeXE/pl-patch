import { link } from "../Types/types";
import UIButton from "./UIButton";

const LinksCard = (props: { 
    headerText: string, 
    color: string, 
    gradient: string | undefined, 
    linkItems: link[]
}) => {
    const { headerText, color, gradient, linkItems } = props;

    function CheckGradient(): string {
        if (gradient) {
            return (`bg-clip-text text-transparent bg-gradient-to-b ${gradient}`);
        }
        return '';
    } 

    return (
        <div className='flex items-center justify-center h-full w-full font-text'>
            <div className='flex flex-col gap-3'>
                <div className='flex justify-center'>
                    <span className={`self-center font-title text-4xl ${CheckGradient()}`}>{headerText}</span>
                </div>
                <div className='flex flex-col gap-2 items-center w-[50vw] sm:w-[25vw] lg:w-[20vw] xl:w-[10vw]'>
                    {linkItems.map(item => (
                        <UIButton key={item.text} link={item.url} card={false} color={color}>
                            <span>{item.text}</span>
                        </UIButton>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LinksCard;