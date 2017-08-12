angular.module('app')
.controller('ViewCtrl', function($scope, Caps) {
  this.viewCapsule = (cap) => {
  	$scope.currentCap = cap._id;
  	console.log('current cap is ', $scope.currentCap)
  }
})
.component('viewPage', {
  controller: 'ViewCtrl',

  bindings: {
  	cap: '<',
  	editCapsule: '=',
  	init: '<',
  	viewCapsule: '='
  },

  templateUrl: '../templates/view.html'
})