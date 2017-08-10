exports.createSession = function(req, res, newUser) {
  return req.session.regenerate(function() {
    req.session.user = newUser._id;
  });
};
