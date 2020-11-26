import React, {useEffect} from 'react';

import MainList from './components/MainList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { fetchHackersList } from './redux/thunkActions';
import { Route, Router, Switch } from 'react-router';
import NewsPage from './components/NewsPage';

export default function App() {
    const dispatch = useDispatch();
    return (
        <>
            <nav className="navbar navbar-dark bg-secondary " >
                <div className="navbar p-0 navbar-dark bg-secondary navbar-expand-lg mx-auto container" >
                    <a className="navbar-brand" href="#">Hacker News</a>
                    <span className="ml-auto">
                        <button className="btn btn-dark my-0 my-sm-0" type="submit" onClick={(e) => { e.preventDefault(); dispatch(fetchHackersList()) }}>Обновить</button>
                    </span>
                </div>

            </nav>
            <main>
                
            </main>

                <Switch>
                    <Route path="/hackersNews/:id" >
                        <NewsPage />
                    </Route>
                    <Route path={["/", '/hackersNews']} exact={true}>
                        <MainList />
                    </Route>
                </Switch>

            
        </>);
}
