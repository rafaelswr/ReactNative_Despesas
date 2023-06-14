

function loginReducer(state, action) {
    switch (action.type) {
        case "focusEmail":
            return {...state, focusEmail: true };
        case "focusPassword":
            return {...state, focusPassword: true };
        case "blurEmail":
            return {...state, focusEmail:false};
        case "blurPassword":
            return {...state, focusPassword: false };
        default:{
            console.log("desconhecido na funcao reducer");
        }
    }
}

export {
    loginReducer,
};