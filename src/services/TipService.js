// the address of our rails backend, saved as a constant value, because we never want to accidently change it
const BASE = 'http://localhost:3001'
// var tipUrl = BASE + '/tips/:id'

let getTips = function() {
  return fetch(BASE + '/tips')
  .then((resp) => {
    let json = resp.json()
    return json
  })
}

let getTip = function(id) {
	return fetch(BASE + '/tips/' + id)
	.then((resp) => {
		let json = resp.json()
		return json
	})
}

let editTip = function(id, params) {
  return fetch(BASE + '/tips/' + id, {
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json'
    },
    method: "PATCH"
  })
  .then((resp) => {
    let json = resp.json()
    return json
  })
}

let getUserTips = function(userId) {
  return fetch(BASE + '/profiles/' + userId + '/tips')
  .then((resp) => {
    let json = resp.json()
    return json
  })
}

let getFollowingTips = function(following) {
  return fetch(BASE + '/tips/following/' + following)
  .then((resp) => {
    let json = resp.json()
    return json
  })
}

let createTip = function(tip) {
  console.log(tip)
  return fetch(BASE + '/tips', {
    body: JSON.stringify({tip: tip}),  // <- we need to stringify the json for fetch
    headers: {  // <- We specify that we're sending JSON, and expect JSON back
        'Content-Type': 'application/json'
    },
    method: "POST"  // <- Here's our verb, so the correct endpoint is invoked on the server
  })
  .then((resp) => {
    let json = resp.json()
    return json
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
