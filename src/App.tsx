import React from 'react';
import { Layout } from './components/HOC/Layout';
import {BrowserRouter} from "react-router-dom";
import './styles/styles.scss';
import 'antd/dist/antd.css';

export const App = () => {
    return (
        <div className={'App'}>
            <BrowserRouter>
                <Layout />
            </BrowserRouter>
        </div>
    )
};