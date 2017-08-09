angular.module('app')
.controller('CreateCtrl', function($scope, Caps) {
  this.currentCap = ['this', 'is just', 'some', 'random', 'test', 'dota', 'I mean', 'data']; 
  
  $scope.input = '';

  this.appendAndSave = (item) => {
    this.currentCap.unshift(item)

    // ** update capsule every time "add to capsule" is clicked **
    // Caps.saveCap(this.currentCap, function(err, res) {
    //   if (err) {
    //   	throw new Error(err);
    //   } else {
    //   	console.log('successfully saved capsule', res);
    //   }
    // });
  }		

  this.saveForLater = () => {
    //Should update capsule one final time
    // then clear the data from the form
    // and have pop up window saying its saved?

    // Caps.saveCap(this.currentCap, function(err, res) {
    //   if (err) {
    //   	throw new Error(err);
    //   } else {
    //   	console.log('successfully saved capsule', res);
    //   }
    // });
  }

  this.bury = () => {
    console.log('bury clicked');
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
    
  },

 templateUrl: '../templates/create.html'
})