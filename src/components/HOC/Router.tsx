import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {Range} from '../containers/Range'

export const Router = () => {
    return (
        <Switch>
            <Route path={'/'} exact>
                <Range />
            </Route>
        </Switch>
    )
};