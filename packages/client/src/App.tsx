import React, {useEffect} from 'react';

import MainList from './components/MainList/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { fetchHackersList } from './redux/thunkActions';

export default function App() {
    const dispatch = useDispatch();
    return (
        <>
            <nav className="navbar  navbar-dark bg-secondary" style={{ width: '100%'}}>
                <div className="navbar p-0 navbar-dark bg-secondary navbar-expand-lg mx-auto" style={{width: '100%', maxWidth: '1500px'}}>
                    <a className="navbar-brand" href="#">Hacker News</a>
                    <span className="ml-auto">
                        <button className="btn btn-dark my-0 my-sm-0" type="submit" onClick={(e) => { e.preventDefault(); dispatch(fetchHackersList()) }}>Обновить</button>
                    </span>
                </div>

            </nav>
            <main>
                <MainList />
            </main>
            
        </>);
}
