import {useEffect} from 'react';
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
type SortState = {
    name: number
    hit: number,
    rateFire: number
}

export const useSort = (setData: SetDataType, sortState: SortState, field: SortType) => {
    useEffect(() => {
        setData(prev => {
            return [...tableSort(prev, field, sortState[field])]
        })
        //eslint-disable-next-line
    }, [sortState[field]])
}
