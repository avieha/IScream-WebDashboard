
/**
 * Login call , get from API user for login
 * @param userCredential this is object of user for api call
 * @param dispatch this is for context in react for option of user
 * @returns {Promise<unknown>}
 */


export function loginCall(userCredential, dispatch) {
    //dispatch({ type: "LOGIN_START" });
    return fetch("http://localhost:3001/user/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userCredential.user)
    }).then(function (response) {
        return response.json();
    })
        .then(function (user) {
            if (user.message === "Auth successful" && user.token !== null) {
                //console.log(login(user.token,user.id));
                return user
            } else
                alert("Please check your login information.");
        });
}

