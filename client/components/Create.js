angular.module('app')
.controller('CreateCtrl', function($scope, Caps) {
  this.capsuleId = $scope.$ctrl.capsuleId;
  this.currentCap = []; 
  this.capsuleToEdit = $scope.$ctrl.capsuleToEdit.contents;
  $scope.capsuleName = '';
  $scope.input = '';
  $scope.date = '';
  $scope.recipient = '';

  if (true) {
  	console.log('yesssss')
  }

  this.appendAndSave = (input, capsuleName) => {

    this.currentCap.unshift({input: input, name: $scope.capsuleName})

    // ** update capsule every time "add to capsule" is clicked **
    var capObj = {capsuleId: this.capsuleId, capsuleContent: this.currentCap};
    Caps.saveCap(capObj, (err, res) => {
      if (err) {
      	this.currentCap.shift();
      	throw new Error(err);
      } else {
      	console.log('successfully saved capsule', res);
      	$scope.capsuleName = '';
      	$scope.input = '';
      }
    });
  }		

  this.saveForLater = () => {
    alert('you just saved the crap out of this!')

  }

  this.test = (date) => {
  	console.log('date is', $scope.date, 'recipient is', $scope.recipient)
  }

  this.bury = () => {
    console.log('bury clicked', $scope.capsuleName);
  	//****** See notes in caps.js for bury function ******
  	// Caps.saveCap(this.currentCap, function(err, res) {
  	//   if (err) {
  	//   	throw new Error(err);
  	//   } else {
  	//   	console.log('successfully saved capsule', res);
  	//   }
  	// });
  }
})
.component('createPage', {
  controller: 'CreateCtrl',

  bindings: {
    capsuleId: '<',
    capsuleToEdit: '<',
    editingViewCapsule: '<'
  },

 templateUrl: '../templates/create.html'

})