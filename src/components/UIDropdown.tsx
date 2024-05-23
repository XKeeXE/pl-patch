import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Spacer } from "@nextui-org/react";

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { slide, TranslatedText } from "../Types/types";
import { Link, redirect } from "react-router-dom";
import { useState } from "react";

const UIDropdown = (props: any) => {
    const { children, darkMode, showDropdown, setShowDropdown, activeIcon, mainIcon } = props;

    return (
        // <div className="relative">
        //     <button onClick={() => {setShowDropdown(!showDropdown)}}>
        //         { showDropdown ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>}
        //     </button>
        //     {showDropdown && (
                // <div className="absolute left-0 top-[32px] rounded-lg border-2 bg-[#292929]"  >
                    // <ul>
                    //     {slides.map(project => (
                    //         <li>
                    //             <Link to={"/projects/" + project.name} >
                    //                 <button className="w-full p-1 rounded-lg hover:bg-[#353535a2] " onClick={() => setShowDropdown(false)}>
                    //                     <div className="flex flex-row p-[2px] gap-1 text-white">
                    //                         {project.icon}
                    //                         {project.name}
                    //                     </div>
                    //                 </button>
                    //             </Link>
                    //         </li>
                    //     ))}
                    // </ul>
                // </div>
        //     )}
        // </div>

        <div className="relative">
            <button onClick={() => {setShowDropdown(!showDropdown)}}>
                { showDropdown ? activeIcon : mainIcon}
            </button>
            {showDropdown && (
                <div className="absolute left-0 top-[32px] rounded-lg border-2 bg-[#292929]" >
                    { children }
                </div>
            )}
        </div>
    )
}

export default UIDropdown;