angular.module('app')
.controller('CreateCtrl', function($scope, Caps) {
  this.capsuleId = 0;
  this.currentCap = []; 
  $scope.capsuleName = '';
  $scope.input = '';

  this.appendAndSave = (input, capsuleName) => {

    this.currentCap.unshift({input: input, name: $scope.capsuleName})

    // ** update capsule every time "add to capsule" is clicked **
    var capObj = {capsuleID: this.capsuleId, capsuleContent: this.currentCap};
    // Caps.saveCap(capObj, function(err, res) {
    //   if (err) {
    //   	throw new Error(err);
    //   } else {
    //   	console.log('successfully saved capsule', res);
    //   	$scope.capsuleName = '';
    //   	$scope.input = '';
    //   }
    // });
  }		

  this.saveForLater = () => {
    alert('you just saved the crap out of this!')
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
    capsuleId: '<'
  },

 templateUrl: '../templates/create.html'

})