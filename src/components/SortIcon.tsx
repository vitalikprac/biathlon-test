import React from 'react';

import SortDown from '../icons/SortDown.svg';
import SortUP from '../icons/SortUp.svg'

interface SortIconProps {
    up: boolean
}

const SortIcon = ({up}: SortIconProps) => {
    return (
        <>
            {up ? <img alt="SortUpIcon" src={SortUP}/> :
                <img alt="SortDownIcon" src={SortDown}/>}
        </>
    );
};

export {SortIcon};
