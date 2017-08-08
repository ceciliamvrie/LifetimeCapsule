angular.module('landing-page')
.factory('Auth', function($http) {

  var STORE_URL = 'http://127.0.0.1:3000';

  const signin = function(userObj, cb) {

    var header = {'Content-Type': 'application/json'};

    $http({
      url: `${STORE_URL}/signin`,
      method: 'POST',
      data: userObj,
      headers: header
    })
    .then(function(res) {
      cb(null, res.data);
    })
    .catch(function(err) {
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
  	  cb(null, res.data);
  	})
  	.catch(function(err) {
  	  cb(err);
  	});
  }
  
  return {
    signin: signin,
    signup: signup
  };
})

