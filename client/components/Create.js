angular.module('homepage')
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

  template: 
    `<div>
      <h1>Create</h1>
      <textarea id="inputBox" rows="4" cols="70" ng-model="input"> </textarea>

      <button id="addToCap" type="button" ng-click="$ctrl.appendAndSave(input)"">Add to Capsule</button>
      <div class="inProgressWindow">
        <div class="innerItem" ng-repeat="item in $ctrl.currentCap track by $index">
          <div> {{item}} </div>
        </div>
      </div>
      <div class="bottomButtons">
        <button id="saveForLater" type="button" ng-click="$ctrl.saveForLater()"">Save for Later</button>
        <button id="bury" type="button" ng-click="$ctrl.bury()"">Bury</button>
        
      </div>
    </div>`
})