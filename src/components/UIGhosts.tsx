const UIGhosts = (props: {children: React.ReactNode, itemsLength: number, custom?: number}) => {
    const { children, itemsLength, custom } = props;

    const gridSize = Math.ceil(Math.sqrt(itemsLength));
    const remainingSlots = custom ? custom : Math.abs((itemsLength) - gridSize * gridSize);
    
    let ghosts = [];
    while (ghosts.length < remainingSlots) {
        ghosts.push('')
    }
    return (
        <>
        {ghosts.map((_ghost, index) => (
            <div key={index}>
                { children }
            </div>
        ))}
        </>
    )
}

export default UIGhosts;