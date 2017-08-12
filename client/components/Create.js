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

  this.test = (i) => {
  	console.log('index is ', i)
  }
  
   this.appendAndSave = (input, momentoName) => {

      if ($scope.$ctrl.editingViewCapsule) {
      this.capsuleToEdit.contents.unshift({input: input, name: $scope.momentoName})

      var capObj = {capsuleId: this.capsuleId, capsuleContent: this.capsuleToEdit.contents};
      Caps.saveCap(capObj, (err, res) => {
        if (err) {
            this.currentCap.shift();
            throw new Error(err);
        } else {
            $scope.momentoName = '';
            $scope.input = '';
        }
      });


      } else {
        this.currentCap.unshift({input: input, name: $scope.momentoName})

        var capObj = {capsuleId: this.capsuleId, capsuleContent: this.currentCap};
        Caps.saveCap(capObj, (err, res) => {
          if (err) {
              this.currentCap.shift();
              throw new Error(err);
          } else {
              $scope.momentoName = '';
              $scope.input = '';
          }
        });
    }
  }

  this.deleteMemento = () => {
    //modal confirmation of deletion
    //true => remove from capsule in db and from currentCap array
    //update view
  }

  this.setCapsuleName = () => {
    var capName = document.getElementById('capsuleInput').value
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
    
    var saveProgress = confirm('you just saved the crap out of this!');
    if(saveProgress) {
      $scope.$ctrl.view = true;
    }
  }

 this.bury = (years, months, days, recipient) => {
    console.log('bury clicked', $scope.capsuleName);

    var date = [0, 0, 0]
    date[0] = Number(years) || 0;
    date[1] = Number(months) || 0;
    date[2] = Number(days) || 0;

    console.log('unearthDate', date);
      // ****** See notes in caps.js for bury function ******
       if ($scope.$ctrl.editingViewCapsule) {

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
