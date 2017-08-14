angular.module('app')
.factory('Caps', function($http) {

  var STORE_URL = 'http://127.0.0.1:3000';

  const filterCaps = function(filterMethod, userId, cb) {
    $http({
      url: `${STORE_URL}/capsules/${filterMethod}`,
      method: 'POST',
      data: {userId: userId},
      contentType: 'application/json'
    })
    .then(function(res) {
      // gets all the capsules return matching the filer
      cb(null, res.data);
    })
    .catch(function(err) {
      cb(err);
    });
  };

  const createCap = function(userId, cb) {

    $http({
      url: `${STORE_URL}/create`,
      method: 'POST',
      data: {userId: userId},
      contentType: 'application/json'
    })
    .then(function(res) {
      // Returns the newly created capsules' id
      cb(null, res.data);
    })
    .catch(function(err) {
      cb(err);
    });

  };

  const saveCap = function(inputObj, cb) {
  
    $http({
      url: `${STORE_URL}/edit`,
      method: 'PUT',
      contentType: 'application/json',
      data: inputObj,
    })
    .then(function(res) {
      // doesn't actually get anything back
      cb(null, res.data);
    })
    .catch(function(err) {
      cb(err);
    });

  };

  const bury = function(input, cb) {

    $http({
      url: `${STORE_URL}/bury`,
      method: 'PUT',
      contentType: 'application/json',
      data: input,
    })
    .then(function(res) {
      // doesn't actually get anything back
      cb(null, res.data);
    })
    .catch(function(err) {
      cb(err);
    });

  };

  const deleteCap = function(inputObj, cb) {

    $http({
      url: `${STORE_URL}/delete`,
      method: 'POST',
      contentType: 'application/json',
      data: inputObj,
    })
    .then(function(res) {
      // doesn't actually get anything back
      cb(null, res.data);
    })
    .catch(function(err) {
      cb(err);
    });

  };
  
  return {
    filterCaps: filterCaps,
    saveCap: saveCap,
    bury: bury,
    createCap: createCap,
    deleteCap: deleteCap
  };
})