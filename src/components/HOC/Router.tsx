import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {Range} from '../containers/Range/Range'
import { RangeItem } from '../containers/Range/RangeItem/RangeItem';
import { RangeAdd } from '../containers/Range/RangeAdd/RangeAdd';

export const Router = () => {
    return (
        <Switch>
            <Route path={'/'} exact>
                <Range />
            </Route>
            <Route path={'/:priceItem'} exact>
                <RangeItem />
            </Route>
            <Route path={'/:range/add'}>
                <RangeAdd />
            </Route>
        </Switch>
    )
};