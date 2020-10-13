import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {Range} from '../containers/Range'
import { Test } from '../containers/Test';

export const Router = () => {
    return (
        <Switch>
            <Route path={'/'} exact>
                <Range />
            </Route>
            <Route path={'/test'}>
                <Test />
            </Route>
        </Switch>
    )
};