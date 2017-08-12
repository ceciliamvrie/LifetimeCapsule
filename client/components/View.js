angular.module('app')
.controller('ViewCtrl', function($scope, Caps) {

	this.handleEdit = (event) => {
	  //dynamically grabs each capsules data

	}

	this.handleEmail = (event) => {
      //dynamically grabs each capsules data
	  console.log(this.cap)
	}
})
.component('viewPage', {
  controller: 'ViewCtrl',

  bindings: {
  	cap: '<',
  	editCapsule: '=',
  	init: '<'
  },

  templateUrl: '../templates/view.html'
})