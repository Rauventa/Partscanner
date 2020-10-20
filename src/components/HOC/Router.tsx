import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {Range} from '../containers/Range/Range'
import { RangeItem } from '../containers/Range/RangeItem';

export const Router = () => {
    return (
        <Switch>
            <Route path={'/'} exact>
                <Range />
            </Route>
            <Route path={'/:id'}>
                <RangeItem />
            </Route>
        </Switch>
    )
};