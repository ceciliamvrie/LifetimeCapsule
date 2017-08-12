angular.module('app', [])
.controller('AppCtrl', function($scope, Caps) {
  this.signedIn = false;
  this.userId = '';
  this.initialData = [];
  this.first = true;
  this.hello = 'hello';

  this.init = (id) => {

    Caps.filterCaps('all', id, (err, allCaps) => {
  	  if (err) {
  	    throw new Error(err);
  	  } else {
        this.initialData = allCaps;
        console.log('initial caps ', this.initialData)
      }
    });

  }
})
.component('app', {
  controller: 'AppCtrl',
  templateUrl: '../templates/app.html'
})
