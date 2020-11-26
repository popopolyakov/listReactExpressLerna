import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

interface IHeaderButton {
    id: number;
    title: string;
    mainLink: boolean;
    action?: Function
}

interface IButtonGroup extends Array<IHeaderButton> {}

interface Props {
    buttonGroup: IButtonGroup;
}



const Header: React.FC<Props> = (props) => {

    const dispatch = useDispatch()

    return (
        <header className="navbar navbar-dark bg-secondary " >
            <nav className="navbar p-0 navbar-dark bg-secondary navbar-expand-lg mx-auto container" >
                <Link className="navbar-brand" to="/">Hacker News</Link>
                <div className="ml-auto">
                    {props.buttonGroup.map(
                        item => item.mainLink ?
                            <Link key={item.id} to="/" className="btn btn-dark my-0 my-sm-0 ml-2">{ item.title}</Link>
                            :
                            <button key={item.id} className="btn btn-dark my-0 my-sm-0 ml-2" type="submit" onClick={(e) => { e.preventDefault(); dispatch(item.action()) }}>{item.title }</button>
                    )}
                </div>
            </nav>
        </header>
    )
};

export default Header;