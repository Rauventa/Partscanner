import React from 'react';
import { Router } from './Router';

export const Layout = () => {
    return (
        <div className={'Layout'}>
            {/*<div className="Layout__nav">*/}
            {/*    <h2>Nav</h2>*/}
            {/*</div>*/}
            <div className="Layout__container">
                <Router />
            </div>
        </div>
    )
};