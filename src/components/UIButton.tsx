const UIButton = (props: any) => {
    const { children, color, link, card, onClick, dashed } = props;
    return (
        <button tabIndex={-1} className={`border-2 p-2 rounded-lg hover:bg-[#f2f2f2] dark:hover:bg-[#353535a2] ${color} ` + (dashed ? ' border-dashed ' : '') + (card ? '' : ' w-full lg:w-[80%] text-sm')} style={{
            borderColor: color
        }} onClick={() => {
            if (link !== undefined) {
                window.open(link, '_blank');
            } 
            if (onClick !== undefined) {
                onClick();
            } 
        }}>
            {children}
        </button>)
}

export default UIButton;