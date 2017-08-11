angular.module('app', [])
.controller('AppCtrl', function(Caps) {
  this.signedIn = false;
  this.userId = '';
  this.initialData = [];

  this.init = (id) => {
  console.log()
    Caps.filterCaps('all', this.userId, (err, allCaps) => {
	  if (err) {
	    throw new Error(err);
	  } else {
	     this.initialData = allCaps
	  }
	});
  }
})
.component('app', {
  controller: 'AppCtrl',
  templateUrl: '../templates/app.html'
})
