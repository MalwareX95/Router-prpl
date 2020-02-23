export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const TODOSFETCHSUCCEED = 'TODOSFETCHSUCCEED';
export const FETCHTODOS = 'FETCHTODOS';
export const increment = () => {
    return {
        type: INCREMENT
    };
};
export const decrement = () => {
    return {
        type: INCREMENT
    };
};
export const fetchToDos = () => {
    return {
        type: FETCHTODOS
    };
};
export const toDofetchedSucceed = (todos) => {
    console.log(todos);
    return {
        type: TODOSFETCHSUCCEED,
        todos
    };
};
//# sourceMappingURL=app.js.map