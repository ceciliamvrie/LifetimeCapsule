angular.module('app')
.controller('CreateCtrl', function($scope, Caps) {
  this.capsuleId = $scope.$ctrl.capsuleId;
  this.currentCap = []; 
  this.capsuleToEdit = $scope.$ctrl.capsuleToEdit;
  this.editIndex = null;
  this.capsuleName = '';
  $scope.momentoName = '';
  $scope.input = '';
  $scope.date = '';
  $scope.recipient = '';

   this.appendAndSave = (input) => {

      if ($scope.$ctrl.editingViewCapsule) {
      this.capsuleToEdit.contents.unshift({input: input, name: $scope.momentoName})

      var capObj = {capsuleName: this.capsuleName, capsuleId: this.capsuleId, capsuleContent: this.capsuleToEdit.contents};
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

        var capObj = {capsuleName: this.capsuleName, capsuleId: this.capsuleId, capsuleContent: this.currentCap};
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

  this.setCapsuleName = () => {
    var capName = document.getElementById('capsuleInput').value
    if(capName !== null && capName !== undefined) {
      this.capsuleName = capName;
      $scope.$ctrl.named = true;
      var capObj = {capsuleName: capName, capsuleId: this.capsuleId, capsuleContent: this.currentCap};
      Caps.saveCap(capObj, (err, res) => {
        if (err) {
            throw new Error(err);
        }
      });
    } else {
      //warning to add capsule name
    }
  }
  this.viewMomento = (index) => {
    console.log(this.currentCap[index]);
    //modal popup of momento
  }

  this.getIndex = (index) => {
    this.editIndex = index;
  }
  
  this.editMomento = (input, momentoName) => {
    console.log(this.editIndex, input, momentoName);
    $scope.momentoName = momentoName;
    
    if ($scope.$ctrl.editingViewCapsule) {
      $scope.$ctrl.capsuleToEdit.contents[this.editIndex] = {input: input, name: $scope.momentoName};
      var capObj = {capsuleName: $scope.$ctrl.editedCapsuleName, capsuleId: $scope.$ctrl.capsuleId, capsuleContent: $scope.$ctrl.capsuleToEdit.contents};
      Caps.saveCap(capObj, (err, res) => {
        if (err) {
            throw new Error(err);
        } else {
            $scope.momentoName = '';
            $scope.input = '';
        }
      });

      } else {
      	this.currentCap[this.editIndex] = {input: input, name: $scope.momentoName};
        var capObj = {capsuleName: this.capsuleName, capsuleId: this.capsuleId, capsuleContent: this.currentCap};
        Caps.saveCap(capObj, (err, res) => {
          if (err) {
              throw new Error(err);
          } else {
              $scope.momentoName = '';
              $scope.input = '';
          }
        });
    }
    this.editIndex = null;
  }

  this.deleteMomento = (index) => {
    var deletThis = confirm('Are you sure you want to delete this momento?');
    if(deletThis) {
      
      if ($scope.$ctrl.editingViewCapsule) {
      $scope.$ctrl.capsuleToEdit.contents.splice(index, 1);
      var capObj = {capsuleName: $scope.$ctrl.editedCapsuleName, capsuleId: $scope.$ctrl.capsuleId, capsuleContent: $scope.$ctrl.capsuleToEdit.contents};
      Caps.saveCap(capObj, (err, res) => {
        if (err) {
            console.log('oops');
            throw new Error(err);
        } else {
            $scope.momentoName = '';
            $scope.input = '';
        }
      });


      } else {
      	this.currentCap.splice(index, 1);
        var capObj = {capsuleName: this.capsuleName, capsuleId: this.capsuleId, capsuleContent: this.currentCap};
        Caps.saveCap(capObj, (err, res) => {
          if (err) {
              console.log('oopsee');
              throw new Error(err);
          } else {
              $scope.momentoName = '';
              $scope.input = '';
          }
        });
    }
    }
    
  }

  this.saveForLater = () => {

    var saveProgress = confirm('you just saved the crap out of this!');
    if(saveProgress) {
      $scope.momentoName = '';
      $scope.input = '';
      $scope.$ctrl.viewToggle();
    }
  }

 this.bury = (years, months, days, recipient) => {
    console.log('bury clicked', this.capsuleName);

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
             this.capsuleName = '';
             $scope.input = '';
             $scope.date = '';
             $scope.recipient = '';
             this.currentCap = [];
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
               this.capsuleName = '';
               $scope.input = '';
               $scope.date = '';
               $scope.recipient = '';
               this.currentCap = [];
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
    clear: '=',
    named: '=',
    editedCapsuleName: '=',
    viewToggle: '<'
  },

 templateUrl: '../templates/create.html'

})
