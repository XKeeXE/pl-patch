const UIGhosts = (props: {children: React.ReactNode, itemsLength: number}) => {
    const { children, itemsLength } = props;

    const gridSize = Math.ceil(Math.sqrt(itemsLength));
    const remainingSlots = Math.abs((itemsLength) - gridSize * gridSize);
    
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