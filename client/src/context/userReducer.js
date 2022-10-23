export default function userReducer(state, action) {
    switch (action.type) {
        case "LOGIN_START": {
            console.log("LOGIN_START")
            return {
                user: null,
                isFetching: true,
                error: false,
            };
        }

        case "LOGIN_SUCCESS": {
            console.log("LOGIN_SUCCESS")
            return {
                user: action.payload,
                isFetching: false,
                error: false,
            };
        }
        case "LOGIN_FAILURE":
            console.log("LOGIN_FAILURE")
            return {
                user: null,
                isFetching: false,
                error: true,
            };
        case "FOLLOW":
            return {
                ...state,
                user: {
                    ...state.user,
                    followings: [...state.user.followings, action.payload],
                },
            };
        case "UNFOLLOW":
            return {
                ...state,
                user: {
                    ...state.user,
                    followings: state.user.followings.filter(
                        (following) => following !== action.payload
                    ),
                },
            };
        case "LOGOUT":
            return {
                user: null,
                isFetching: false,
                error: false,
            }
        default:
            return state;
    }
}

