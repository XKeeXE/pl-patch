import { link } from "../util/types";
import UIButton from "./UIButton";

const LinksCard = (props: { 
    headerText: string, 
    color: string, 
    gradient?: string, 
    linkItems: link[]
}) => {
    const { headerText, color, gradient, linkItems } = props;

    return (
        <div className='flex flex-col items-center h-full justify-center gap-3'>
            <span className={`font-title text-4xl ${gradient ? `bg-clip-text text-transparent bg-gradient-to-b ${gradient}` : ''}`}>{headerText}</span>
            <div className='flex flex-col gap-2 items-center w-[50vw] sm:w-[25vw] lg:w-[20vw] xl:w-[10vw] font-text'>
                {linkItems.map(item => (
                    <UIButton key={item.text} link={item.url} card={false} color={color}>
                        <span>{item.text}</span>
                    </UIButton>
                ))}
            </div>
        </div>
    )
}

export default LinksCard;