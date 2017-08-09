angular.module('app')
.factory('Auth', function($http) {

  var STORE_URL = 'http://127.0.0.1:3000';

  const signin = function(userObj, cb) {
    console.log(userObj)
    $http({
      method: 'POST',
      url: `${STORE_URL}/signin`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: userObj
    })
    .then(function(res) {
      console.log('response', res)
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
      console.log('response', res)
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
