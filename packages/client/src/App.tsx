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
            
            <main>
                <Switch>
                    <Route path="/hackersNews/:id" >
                        <NewsPage />
                    </Route>
                    <Route path={["/", '/hackersNews']} exact={true}>
                        <MainList />
                    </Route>
                </Switch>
            </main>
            
        </>);
}
