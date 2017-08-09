angular.module('app')
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

  const createCap = function(cb) {

    $http({
      url: `${STORE_URL}/create`,
      method: 'POST',
    })
    .then(function(res) {
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
      data: JSON.stringify(inputObj),
    })
    .then(function(res) {
      cb(null, res.data);
    })
    .catch(function(err) {
      cb(err);
    });

  };

  const bury = function(input, cb) {
    // Not sure if to add this on server side or Front End
    // since it's being 'buried', the inprogress property
    // needs to be set to false and a unearthed date is set
    $http({
      url: `${STORE_URL}/bury/id`,
      method: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(input),
    })
    .then(function(res) {
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
    createCap: createCap
  };
})