import React, {useEffect, useState} from 'react';
import {PlayerScore, SortType} from '../components/App/App';

const tableSort = (data: PlayerScore[], field: SortType, sortNumber: number) => {
    return data.sort((a: PlayerScore, b: PlayerScore) => {
        if (a[field] < b[field]) {
            return sortNumber
        }
        if (a[field] > b[field]) {
            return sortNumber * -1
        }
        return 0;
    })
}

type SetDataType = (word: PlayerScore[] | ((prevState: PlayerScore[]) => PlayerScore[])) => void;

export const useSort = (setData: SetDataType, field: SortType): [number, React.Dispatch<React.SetStateAction<number>>] => {
    const [sortState, setSortState] = useState(-1);
    useEffect(() => {
        setData(prev => {
            return [...tableSort(prev, field, sortState)]
        })
    }, [sortState, field, setData])
    return [sortState, setSortState]
}
