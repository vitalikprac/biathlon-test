import React, {useEffect, useState} from 'react';
import {Table} from 'react-bootstrap';
import {useSort} from '../../hooks/useSort';
import {generatePlayerScores} from '../../util';
import {SortIcon} from '../SortIcon';
import classes from './App.module.scss'


export interface PlayerScore {
    rating: number
    name: string,
    hit: number,
    rateFire: number
}

export type SortType = 'name' | 'hit' | 'rateFire' | 'rating';

const App = () => {
    const [initialData, setInitialData] = useState(() => generatePlayerScores(10));
    const [data, setData] = useState<PlayerScore[]>(initialData);
    const [searchText, setSearchText] = useState('');


    const [rating, setRating] = useSort(setInitialData, 'rating');
    const [name, setName] = useSort(setInitialData, 'name');
    const [hit, setHit] = useSort(setInitialData, 'hit');
    const [rateFire, setRateFire] = useSort(setInitialData, 'rateFire');

    useEffect(() => {
        searchText.trim() === '' ?
            setData(initialData) :
            setData(initialData.filter(x => x
                .name
                .toLowerCase()
                .includes(searchText.toLowerCase())))
    }, [searchText, setData, initialData]);


    useEffect(() => {
        setInitialData(initialData);
    }, [initialData])

    const onRatingClick = () => {
        setRating(prev => prev * -1);
    }

    const onNameClick = () => {
        setName(prev => prev * -1);
    }

    const onHitClick = () => {
        setHit(prev => prev * -1);
    }

    const onRateFireClick = () => {
        setRateFire(prev => prev * -1);
    }

    return (
        <div className={classes.app}>
            <div className={classes.container}>
                <h3>Результаты стрельбы в биатлонной гонке</h3>
                <input className={classes.input}
                       placeholder="Введите имя"
                       value={searchText}
                       onChange={e => setSearchText(e.target.value)}/>
                <Table className={classes.table} striped bordered hover>
                    <thead className={classes.tableHead}>
                    <tr>
                        <th onClick={onRatingClick}>№&nbsp;{<SortIcon up={rating === 1}/>}</th>
                        <th onClick={onNameClick}>Имя&nbsp;{<SortIcon up={name === 1}/>}</th>
                        <th onClick={onHitClick}>Попадание&nbsp;{<SortIcon up={hit === 1}/>}</th>
                        <th onClick={onRateFireClick}>Скорострельность&nbsp;{<SortIcon up={rateFire === 1}/>}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map(({rating, hit, name, rateFire}, index) => {
                        return (
                            <tr key={rating}>
                                <td>{rating} </td>
                                <td>{name} </td>
                                <td>{(hit * 100).toFixed(2) + '%'}</td>
                                <td>{rateFire} сек.</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
                {data.length === 0 && <div>Игроков не найдено :(</div>}
            </div>
        </div>
    );
}

export {App};
