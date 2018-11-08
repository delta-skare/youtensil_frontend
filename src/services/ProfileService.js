// the address of our rails backend, saved as a constant value, because we never want to accidently change it
const BASE = process.env.REACT_APP_API_URL
// var profileUrl = BASE + '/profiles/:id'

let getProfiles = function () {
    // the function name getProfiles is intended to remind you of the restful rails route --> GET '/profiles'.
    return fetch(BASE + '/profiles') // this would be equivalent to going to localhost:3001/profiles in your browser.
        .then((resp) => {
            // resp will be whatever you saw on the page localhost:3001/profiles, it is the result of our fetch call
            // we want to make sure what we have is just the json part of the response
            return resp.json()
        })
}

let getOrMakeProfileByUserId = function (id) {
    return fetch(BASE + '/profiles/' + id)
        .then((resp) => {
            // console.log(json);
            return resp.json()
        })
}

let editProfile = function (id, params) {
    return fetch(BASE + '/profiles/' + id, {
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json'
        },
        method: "PATCH"
    })
        .then((resp) => {
            // console.log(json)
            return resp.json()
        })
}

let createProfile = function (profile) {
    console.log(profile)
    return fetch(BASE + '/profiles', {
        body: JSON.stringify({profile: profile}),  // <- we need to stringify the json for fetch
        headers: {  // <- We specify that we're sending JSON, and expect JSON back
            'Content-Type': 'application/json'
        },
        method: "POST"  // <- Here's our verb, so the correct endpoint is invoked on the server
    })
        .then((resp) => {
            // console.log(json)
            return resp.json()
        })
}

export {
    getProfiles,
    getOrMakeProfileByUserId,
    createProfile,
    editProfile
}
