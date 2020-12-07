import {RENDER_FILTERS_SUCCESS} from "../../actions/actionTypes";

const initialState = {
    filtered: [],
    filterId: 0,
    filterParentId: 0
};

export default function shopReducer(state = initialState, action) {
    switch (action.type) {

        case RENDER_FILTERS_SUCCESS:
            return {
                ...state,
                filtered: action.filtered,
                filterId: action.filterId
            };
        default:
            return state
    }
}