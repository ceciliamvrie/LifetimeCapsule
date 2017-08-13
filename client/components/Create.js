angular.module('app')
.controller('CreateCtrl', function($scope, Caps) {
  this.capsuleId = $scope.$ctrl.capsuleId;
  this.capsuleToEdit = $scope.$ctrl.capsuleToEdit;
  this.editIndex = null;
  this.capsuleNameModel = '';
  $scope.momentoName = '';
  $scope.input = '';
  $scope.date = '';
  $scope.recipient = '';

  this.appendAndSave = (input) => {

    if ($scope.$ctrl.editingViewCapsule) {
      this.capsuleToEdit.contents.unshift({input: input, name: $scope.momentoName})

      var capObj = {capsuleName: $scope.$ctrl.capsuleName, capsuleId: this.capsuleId, capsuleContent: this.capsuleToEdit.contents};
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

     var capObj = {capsuleName: $scope.$ctrl.capsuleName, capsuleId: this.capsuleId, capsuleContent: this.currentCap};
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

  this.setCapsuleName = (name) => {
    var capName;
    if(name) {
      capName = name;
    } else {
      capName = document.getElementById('capsuleInput').value;
    }
    if(capName !== null && capName !== undefined) {
      $scope.$ctrl.capsuleName = capName;
      $scope.$ctrl.editedCapsuleName = capName;
      $scope.$ctrl.named = true;
      if ($scope.$ctrl.editingViewCapsule) {

      var capObj = {capsuleName: $scope.$ctrl.capsuleName, capsuleId: this.capsuleId, capsuleContent: this.capsuleToEdit.contents};
      Caps.saveCap(capObj, (err, res) => {
        if (err) {
          throw new Error(err);
        } else {
          $scope.momentoName = '';
          $scope.input = '';
        } 
      });

   } else {

     var capObj = {capsuleName: $scope.$ctrl.capsuleName, capsuleId: this.capsuleId, capsuleContent: this.currentCap};
     Caps.saveCap(capObj, (err, res) => {
       if (err) {
        throw new Error(err);
       } else {
        $scope.momentoName = '';
        $scope.input = '';
       }
     });
    }
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
        var capObj = {capsuleName: $scope.$ctrl.capsuleName, capsuleId: this.capsuleId, capsuleContent: this.currentCap};
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
        var capObj = {capsuleName: $scope.$ctrl.capsuleName, capsuleId: this.capsuleId, capsuleContent: this.currentCap};
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
      $scope.$ctrl.viewToggle(true);
    }
  }

  this.bury = (years, months, days, recipient) => {

    var date = [0, 0, 0]
    date[0] = Number(years) || 0;
    date[1] = Number(months) || 0;
    date[2] = Number(days) || 0;

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
          $scope.$ctrl.capsuleName = '';
          $scope.input = '';
          $scope.date = '';
          $scope.recipient = '';
          this.currentCap = [];
          $scope.$ctrl.viewToggle(true);
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
          $scope.$ctrl.capsuleName = '';
          $scope.input = '';
          $scope.date = '';
          $scope.recipient = '';
          this.currentCap = [];
          $scope.$ctrl.viewToggle(true);
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
    named: '=',
    editedCapsuleName: '=',
    viewToggle: '<',
    currentCap: '=', 
    capsuleName: '='
  },

 templateUrl: '../templates/create.html'

})
