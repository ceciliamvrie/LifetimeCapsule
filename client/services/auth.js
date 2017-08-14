angular.module('app')
.factory('Auth', function($http) {

  var STORE_URL = 'http://127.0.0.1:3000';

  const signin = function(userObj, cb) {

    var header = {'Content-Type': 'application/json'};

    $http({
      method: 'POST',
      url: `${STORE_URL}/signin`,
      headers: header,
      data: userObj, 
    })
    .then(function(res) {
      // gets the user id back from the server
      cb(null, res.data);
    })
    .catch(function(err) {
      console.log('error',err)
      cb(err);
    });

  };

  const signup = function(userObj, cb) {

  	var header = {'Content-Type': 'application/json'};

  	$http({
  	  url: `${STORE_URL}/signup`,
  	  method: 'POST',
  	  data: userObj,
  	  headers: header
  	})
  	.then(function(res) {
      // doesn't actually get anything back
  	  cb(null, res.data);
  	})
  	.catch(function(err) {
      console.log('whoops', err)
  	  cb(err);
  	});
  }

  return {
    signin: signin,
    signup: signup
  };
})
