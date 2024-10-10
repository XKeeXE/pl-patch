import React from "react";

const UIGhosts = (children: React.ReactNode, remainingSlots: number) => {
    let ghosts = []; // Empty projects
    for (let index = 0; index < remainingSlots; index++) {
        ghosts.push('')
    }
    return (
        <>
        {ghosts.map((ghost, index) => {
            if (React.isValidElement(React.Children) && React.Children.type === 'ProjectButton') {
                return React.cloneElement(React.Children, { key: index});
            }
            return (
                <>
                {children}
                </>
            )
        })}
        </>
    )
}

export default UIGhosts;