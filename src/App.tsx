import React from 'react';
import { Layout } from './components/HOC/Layout';
import {BrowserRouter} from "react-router-dom";
import './styles/styles.scss';
import 'antd/dist/antd.css';
import Scroller from './components/Root/Scroller/Scroller';

export const App = (props: any) => {

    return (
        <div className={'App'}>
            <BrowserRouter>
                <Scroller />
                <Layout />
            </BrowserRouter>
        </div>
    )
};