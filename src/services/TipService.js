// the address of our rails backend, saved as a constant value, because we never want to accidently change it
const BASE = process.env.REACT_APP_API_URL
const tipUrl = BASE + '/tips'

let getTips = function () {
    return fetch(tipUrl)
        .then((resp) => {
            return resp.json()
        })
}

let getTip = function (id) {
    return fetch(`tipUrl/${id}`)
        .then((resp) => {
            return resp.json()
        })
}

let editTip = function (id, params) {
    return fetch(`tipUrl/${id}`, {
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json'
        },
        method: "PATCH"
    })
        .then((resp) => {
            return resp.json()
        })
}

let getUserTips = function (userId) {
    return fetch(BASE + '/profiles/' + userId + '/tips')
        .then((resp) => {
            return resp.json()
        })
}

let getFollowingTips = function (following) {
    return fetch(BASE + '/tips/following/' + following)
        .then((resp) => {
            return resp.json()
        })
}

let createTip = function (tip) {
    console.log(tip)
    return fetch(BASE + '/tips', {
        body: JSON.stringify({tip: tip}),  // <- we need to stringify the json for fetch
        headers: {  // <- We specify that we're sending JSON, and expect JSON back
            'Content-Type': 'application/json'
        },
        method: "POST"  // <- Here's our verb, so the correct endpoint is invoked on the server
    })
        .then((resp) => {
            return resp.json()
        })
}

export {
    getTips,
    getTip,
    createTip,
    getUserTips,
    editTip,
    getFollowingTips
}
