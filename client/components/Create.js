angular.module('app')
.controller('CreateCtrl', function($scope, Caps) {
  this.capsuleId = $scope.$ctrl.capsuleId;
  this.currentCap = []; 
  this.capsuleToEdit = $scope.$ctrl.capsuleToEdit;
  $scope.capsuleName = '';
  $scope.contentTitle = '';
  $scope.input = '';
  $scope.date = '';
  $scope.recipient = '';

  this.appendAndSave = (input, capsuleName) => {

  	if ($scope.$ctrl.editingViewCapsule) {
  		// **** contentTitle ng-model needs to be added to creat.html
      this.capsuleToEdit.contents.unshift({input: input, name: $scope.capsuleName})

      var capObj = {capsuleId: this.capsuleId, capsuleContent: this.capsuleToEdit.contents};
      Caps.saveCap(capObj, (err, res) => {
        if (err) {
        	this.currentCap.shift();
        	throw new Error(err);
        } else {
        	$scope.capsuleName = '';
        	$scope.input = '';
        }
      });


  	} else {
	  // **** contentTitle ng-model needs to be added to creat.html 
	    this.currentCap.unshift({input: input, name: $scope.capsuleName})

	    var capObj = {capsuleId: this.capsuleId, capsuleContent: this.currentCap};
	    Caps.saveCap(capObj, (err, res) => {
	      if (err) {
	      	this.currentCap.shift();
	      	throw new Error(err);
	      } else {
	      	$scope.capsuleName = '';
	      	$scope.input = '';
	      }
	    });
    }
  }		

  this.saveForLater = () => {
    
    var saveProgress = confirm('you just saved the crap out of this!');
    if(saveProgress) {
      $scope.$ctrl.view = true;
    }
  }

  this.bury = (years, months, days, recipient) => {
    console.log('bury clicked', $scope.capsuleName);
    var date = [Number(years), Number(months), Number(days)];
    console.log('unearthDate', date);
  	// ****** See notes in caps.js for bury function ******
   	if ($scope.$ctrl.editingViewCapsule) {
   		// **** contentTitle ng-model needs to be added to creat.html

       var capObj = {
       	 capsuleId: this.capsuleId,
       	 capsuleContent: this.capsuleToEdit.contents,
       	 unearthDate: date,
       	 recipient: recipient
       };
       Caps.bury(capObj, (err, res) => {
         if (err) {
         	this.currentCap.shift();
         	throw new Error(err);
         } else {
         	$scope.$ctrl.view = true;
         	$scope.capsuleName = '';
         	$scope.input = '';
         }
       });
   	} else {
 	// **** contentTitle ng-model needs to be added to creat.html 
 	    var capObj = {
 	    	capsuleId: this.capsuleId,
 	    	capsuleContent: this.currentCap,
 	    	unearthDate: date,
 	    	recipient: recipient
 	      };
 	    Caps.bury(capObj, (err, res) => {
 	      if (err) {
 	      	this.currentCap.shift();
 	      	throw new Error(err);
 	      } else {
 	      	$scope.$ctrl.view = true;
 	      	$scope.capsuleName = '';
 	      	$scope.input = '';
 	      }
 	    });
     }
  }
})
.component('createPage', {
  controller: 'CreateCtrl',

  bindings: {
    capsuleId: '<',
    capsuleToEdit: '<',
    editingViewCapsule: '<',
    view: '='
  },

 templateUrl: '../templates/create.html'

})