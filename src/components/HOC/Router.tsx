import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {Range} from '../containers/Range/Range'
import { RangeItem } from '../containers/Range/RangeItem/RangeItem';
import { RangeAdd } from '../containers/Range/RangeAdd/RangeAdd';
import { RangeList } from '../containers/Range/RangeList/RangeList';
import Group from '../containers/Group/Group';

export const Router = () => {
    return (
        <Switch>
            <Route path={'/'} exact>
                <Range />
            </Route>
            <Route path={'/file/:priceItem'} exact>
                <RangeItem />
            </Route>
            <Route path={'/:range/add'} exact>
                <RangeAdd />
            </Route>
            <Route path={'/list'} exact>
                <RangeList />
            </Route>
            <Route path={'/group'}>
                <Group />
            </Route>
        </Switch>
    )
};