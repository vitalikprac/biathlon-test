import React, {useCallback, useEffect, useState} from 'react';
import {Table} from 'react-bootstrap';
import {useSort} from '../../hooks/useSort';
import {generatePlayerScores} from '../../util';
import classes from './App.module.scss'

export interface PlayerScore {
    rating: number
    name: string,
    hit: number,
    rateFire: number
}

export type SortType = 'name' | 'hit' | 'rateFire';

const App = () => {
    const [initialData, setInitialData] = useState(useCallback(() => generatePlayerScores(10), []));
    const [data, setData] = useState<PlayerScore[]>(initialData);
    const [searchText, setSearchText] = useState('');

    // Contains values for sorting in table 1,-1
    const [sortState, setSortState] = useState({
        name: 1,
        hit: 1,
        rateFire: 1
    })

    useEffect(() => {
        searchText === ' ' ?
            setData(initialData) :
            setData(initialData.filter(x => x
                .name
                .toLowerCase()
                .includes(searchText.toLowerCase())))
    }, [searchText, setData, initialData]);


    useSort(setInitialData, sortState, 'name');
    useSort(setInitialData, sortState, 'hit');
    useSort(setInitialData, sortState, 'rateFire');

    useEffect(() => {
        setInitialData(initialData);
    }, [initialData])


    const onNameClick = () => {
        setSortState(prev => ({...prev, name: prev.name * -1}));
    }

    const onHitClick = () => {
        setSortState(prev => ({...prev, hit: prev.hit * -1}));
    }

    const onRateFireClick = () => {
        setSortState(prev => ({...prev, rateFire: prev.rateFire * -1}));
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
                        <th>№</th>
                        <th onClick={onNameClick}>Имя</th>
                        <th onClick={onHitClick}>Попадание</th>
                        <th onClick={onRateFireClick}>Скорострельность</th>
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
