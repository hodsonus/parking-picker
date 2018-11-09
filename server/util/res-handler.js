// Use these functions to send the reply from an endpoint.
// These have to be the last thing done by the endpoint, as you cannot reply more than once.

// example: if(userExists) return success(res, { user })
//          else return error(res, { message: "User not found", responseCode: 404 })

module.exports = {
  success: function (res, payload) {
    let response = payload;
    let responseCode = 200;

    res.status(responseCode).json(response);
  },
  error: function (res, payload) {
    let response = payload.message || 'Server error';
    let responseCode = payload.responseCode || 500;

    res.status(responseCode).json({ error: response });
  }
}
