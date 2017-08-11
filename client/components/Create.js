angular.module('app')
.controller('CreateCtrl', function($scope, Caps) {
  this.capsuleId = $scope.$ctrl.capsuleId;
  this.currentCap = []; 
  this.capsuleToEdit = $scope.$ctrl.capsuleToEdit;
  this.named = false;
  this.capsuleName = '';
  $scope.momentoName = '';
  $scope.input = '';
  $scope.date = '';
  $scope.recipient = '';

  this.appendAndSave = (input, momentoName) => {
    //check for content
    if ($scope.$ctrl.editingViewCapsule) {
       this.capsuleToEdit.contents.unshift({input: input, name: $scope.capsuleName});

      // ** update capsule every time "add to capsule" is clicked **
      var capObj = {capsuleId: this.capsuleId, capsuleContent: this.currentCap};
      Caps.saveCap(capObj, (err, res) => {
        if (err) {
      	  this.currentCap.shift();
      	  throw new Error(err);
        } else {
      	  console.log('successfully saved capsule', res);
      	  $scope.momentoName = '';
      	  $scope.input = '';
        }
      });
    } else {
 	  // **** contentTitle ng-model needs to be added to creat.html 
 	    this.currentCap.unshift({input: input, name: $scope.capsuleName})

  this.deleteMemento = () => {
    //modal confirmation of deletion
    //true => remove from capsule in db and from currentCap array
    //update view
  }

  this.setCapsuleName = () => {
    var capName = document.getElementById('capName').value
    //if(capName) {
      this.capsuleName = capName;
      this.named = true;
      //adds name of capsule to DB
      //show name as the top portion of the capsule
    //}
  }

  this.editMomento = () => {
    //modal popup of edit window
    //on save submit changes to db in place
    //on save return edited momento to previous location
  }

  this.saveForLater = () => {
    //check if capsule has a title
  	console.log('passed ', this.capsuleToEdit.contents)
    alert('you just saved the crap out of this!')
    //send to view
  }

  this.changed = () => {
  	console.log('changed')
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
         	$scope.date = '';
         	$scope.recipient = '';
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
 	      	$scope.date = '';
 	      	$scope.recipient = '';
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
    view: '=',
    clear: '='
  },

 templateUrl: '../templates/create.html'

})
