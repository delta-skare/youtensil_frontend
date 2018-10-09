// the address of our rails backend, saved as a constant value, because we never want to accidently change it
const BASE = 'http://localhost:3001'
// var tipUrl = BASE + '/tips/:id'

// let getTips = function() {
//   // the function name getTips is intended to remind you of the restful rails route --> GET '/tips'.
//   return fetch(BASE + '/tips') // this would be equivalent to going to localhost:3001/tips in your browser.
//   .then((resp) => {
//     // resp will be whatever you saw on the page localhost:3001/tips, it is the result of our fetch call
//     let json = resp.json() // we want to make sure what we have is just the json part of the response
//     // console.log(json)
//     return json
//   })
// }
//
// let getTip = function(id) {
// 	return fetch(BASE + '/tips/' + id)
// 	.then((resp) => {
// 		let json = resp.json()
// 		// console.log(json);
// 		return json
// 	})
// }
//
// let editTip = function(id, params) {
//   return fetch(BASE + '/tips/' + id, {
//     body: JSON.stringify(params),
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     method: "PATCH"
//   })
//   .then((resp) => {
//     let json = resp.json()
//     // console.log(json)
//     return json
//   })
// }

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
    // console.log(json)
    return json
  })
}

export {
  // getTips,
	// getOrMakeTipByUserId,
  createTip
  // editTip
}
