import {store} from "../../../index";
import {RENDER_FILTERS_SUCCESS} from "../actionTypes";
import _ from 'lodash';


export function renderFilters(filtered, option, filterId, filterParentId) {
    return dispatch => {

        if (store.getState().groupReducer.filterParentId === filterParentId) {
            //Ничего не меняем и просто записываем (Фильтры и)

            const data = [...store.getState().groupReducer.filtered];

            if (store.getState().groupReducer.filterId === filterId) {
                console.log('filter id not changed');

                dispatch(renderFiltersSuccess(filtered, filterId))

                // if (option === 'exact') {
                //
                //     dispatch(renderFiltersSuccess(filtered, filterId))
                //
                //     // if (data.length === 0) {
                //     //     const sortData = _.uniq(newData);
                //     //     dispatch(renderFiltersSuccess(sortData))
                //     // } else {
                //     //     const sortData = _.intersection(newData, filtered);
                //     //     dispatch(renderFiltersSuccess(sortData))
                //     // }
                //
                // } else if (option === 'includes-catalog') {
                //     dispatch(renderFiltersSuccess(filtered, filterId))
                // } else if (option === 'no-includes-catalog') {
                //     dispatch(renderFiltersSuccess(filtered, filterId))
                // } else if (option === 'start') {
                //     dispatch(renderFiltersSuccess(filtered, filterId))
                // } else if (option === 'no-start') {
                //     dispatch(renderFiltersSuccess(filtered, filterId))
                // } else if (option === 'ends') {
                //     dispatch(renderFiltersSuccess(filtered, filterId))
                // } else if (option === 'no-ends') {
                //     dispatch(renderFiltersSuccess(filtered, filterId))
                // } else if (option === 'less') {
                //     dispatch(renderFiltersSuccess(filtered, filterId))
                // } else if (option === 'more') {
                //     dispatch(renderFiltersSuccess(filtered, filterId))
                // } else if (option === 'between') {
                //     dispatch(renderFiltersSuccess(filtered, filterId))
                // } else if (option === 'besides') {
                //     dispatch(renderFiltersSuccess(filtered, filterId))
                // } else {
                //     dispatch(renderFiltersSuccess(filtered, filterId))
                // }

                // делаем фильтры
            } else {
                //меняем filterId и записываем фильтры И
                console.log(`Filter id changes from ${store.getState().groupReducer.filterId} to ${filterId}, data is`, data);

                const newData = _.union(data, filtered);

                dispatch(renderFiltersSuccess(newData, filterId))

                // if (option === 'exact') {
                //
                //     dispatch(renderFiltersSuccess(filtered))
                //
                //     // if (data.length === 0) {
                //     //     const sortData = _.uniq(newData);
                //     //     dispatch(renderFiltersSuccess(sortData))
                //     // } else {
                //     //     const sortData = _.intersection(newData, filtered);
                //     //     dispatch(renderFiltersSuccess(sortData))
                //     // }
                //
                // } else if (option === 'includes-catalog') {
                //     dispatch(renderFiltersSuccess(newData))
                // } else if (option === 'no-includes-catalog') {
                //     dispatch(renderFiltersSuccess(newData))
                // } else if (option === 'start') {
                //     dispatch(renderFiltersSuccess(newData))
                // } else if (option === 'no-start') {
                //     dispatch(renderFiltersSuccess(newData))
                // } else if (option === 'ends') {
                //     dispatch(renderFiltersSuccess(newData))
                // } else if (option === 'no-ends') {
                //     dispatch(renderFiltersSuccess(newData))
                // } else if (option === 'less') {
                //     dispatch(renderFiltersSuccess(newData))
                // } else if (option === 'more') {
                //     dispatch(renderFiltersSuccess(newData))
                // } else if (option === 'between') {
                //     dispatch(renderFiltersSuccess(newData))
                // } else if (option === 'besides') {
                //     dispatch(renderFiltersSuccess(newData))
                // } else {
                //     dispatch(renderFiltersSuccess(newData))
                // }

                console.log(newData)
            }

        } else {
            //Добавляем фильтр ИЛИ (и меняем в store filterParentId)

            if (store.getState().groupReducer.filterId === filterId) {
                // делаем фильтры
            } else {
                //меняем filterId и записываем фильтры И
            }
        }

        // const newData = data.concat(filtered);

        // if (option === 'exact') {
        //
        //     dispatch(renderFiltersSuccess(filtered))
        //
        //     // if (data.length === 0) {
        //     //     const sortData = _.uniq(newData);
        //     //     dispatch(renderFiltersSuccess(sortData))
        //     // } else {
        //     //     const sortData = _.intersection(newData, filtered);
        //     //     dispatch(renderFiltersSuccess(sortData))
        //     // }
        //
        // } else if (option === 'includes-catalog') {
        //     dispatch(renderFiltersSuccess(filtered))
        // } else if (option === 'no-includes-catalog') {
        //     dispatch(renderFiltersSuccess(filtered))
        // } else if (option === 'start') {
        //     dispatch(renderFiltersSuccess(filtered))
        // } else if (option === 'no-start') {
        //     dispatch(renderFiltersSuccess(filtered))
        // } else if (option === 'ends') {
        //     dispatch(renderFiltersSuccess(filtered))
        // } else if (option === 'no-ends') {
        //     dispatch(renderFiltersSuccess(filtered))
        // } else if (option === 'less') {
        //     dispatch(renderFiltersSuccess(filtered))
        // } else if (option === 'more') {
        //     dispatch(renderFiltersSuccess(filtered))
        // } else if (option === 'between') {
        //     dispatch(renderFiltersSuccess(filtered))
        // } else if (option === 'besides') {
        //     dispatch(renderFiltersSuccess(filtered))
        // } else {
        //     dispatch(renderFiltersSuccess(filtered))
        // }
    }
}

export function renderFiltersSuccess(filtered, filterId) {
    return {
        type: RENDER_FILTERS_SUCCESS,
        filtered,
        filterId
    }
}