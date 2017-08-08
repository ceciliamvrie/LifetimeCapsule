angular.module('homepage')
.factory('Caps', function($http) {

  var STORE_URL = 'http://127.0.0.1:3000';

  const filterCaps = function(filterMethod, cb) {

    $http({
      url: `${STORE_URL}/filter/${filterMethod}`,
      method: 'GET',
    })
    .then(function(res) {
      cb(null, res.data);
    })
    .catch(function(err) {
      cb(err);
    });

  };
  
  return {
    filterCaps: filterCaps
  };
})