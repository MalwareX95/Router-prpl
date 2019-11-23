import { INCREMENT, DECREMENT } from '../actions/app';
const INITIAL_STATE = {
    clicks: 0,
    value: 0
};
const counter = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INCREMENT:
            return {
                clicks: state.clicks + 1,
                value: state.value + 1
            };
        case DECREMENT:
            return {
                clicks: state.clicks - 1,
                value: state.value - 1
            };
    }
    return state;
};
export default counter;
// const app: Reducer<AppState,  
//# sourceMappingURL=app.js.map