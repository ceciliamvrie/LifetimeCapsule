exports.createSession = function(req, res, newUser) {
  return req.session.user = newUser._id;
};
