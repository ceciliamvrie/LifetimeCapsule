angular.module('app')
.controller('CreateCtrl', function($scope, Caps) {

  this.capsuleId = $scope.$ctrl.capsuleId;
  this.capsuleToEdit = $scope.$ctrl.capsuleToEdit;
  this.capIndex = null;
  this.capsuleNameModel = '';
  $scope.momentoName = '';
  $scope.input = '';
  $scope.date = '';
  $scope.recipient = '';

  this.saveCapsule = (capObj, newMomento) => {
    Caps.saveCap(capObj, (err, res) => {
      if (err) {
        if(newMomento){
          this.currentCap.shift();
        }
        throw new Error(err);
      } else {
        $scope.momentoName = '';
        $scope.input = '';
      } 
    });
  }

  this.capsuleChange = (input, addMomento) => {
    if ($scope.$ctrl.editingViewCapsule) {
      if(addMomento) {
        this.capsuleToEdit.contents.unshift({input: input, name: $scope.momentoName});
      }
      var capObj = {capsuleName: $scope.$ctrl.capsuleName, capsuleId: this.capsuleId, capsuleContent: this.capsuleToEdit.contents};
      this.saveCapsule(capObj, false);
    } else {
      if(addMomento) {
        this.currentCap.unshift({input: input, name: $scope.momentoName});
      }
      var capObj = {capsuleName: $scope.$ctrl.capsuleName, capsuleId: this.capsuleId, capsuleContent: this.currentCap};
      this.saveCapsule(capObj, true);
    }
  }
    

  this.setCapsuleName = (name) => {
    var capName;
    if(name) {
      capName = name;
    } else {
      capName = document.getElementById('capsuleInput').value;
    }
    if(capName !== null && capName !== undefined && capName !== '') {
      $scope.$ctrl.capsuleName = capName;
      $scope.$ctrl.editedCapsuleName = capName;
      $scope.$ctrl.named = true;
      this.capsuleChange(null, false);
    } else {
      //warning to add capsule name
    }
  }

  this.getIndex = (index) => {
    this.capIndex = index;
  }
  
  this.editMomento = (input, momentoName) => {
    console.log(this.capIndex, input, momentoName);
    $scope.momentoName = momentoName;
    if ($scope.$ctrl.editingViewCapsule) {
      $scope.$ctrl.capsuleToEdit.contents[this.capIndex] = {input: input, name: $scope.momentoName};
      var capObj = {capsuleName: $scope.$ctrl.editedCapsuleName, capsuleId: $scope.$ctrl.capsuleId, capsuleContent: $scope.$ctrl.capsuleToEdit.contents};
      this.saveCapsule(capObj, false);
    } else {
      this.currentCap[this.capIndex] = {input: input, name: $scope.momentoName};
      var capObj = {capsuleName: $scope.$ctrl.capsuleName, capsuleId: this.capsuleId, capsuleContent: this.currentCap};
      this.saveCapsule(capObj, false);
    }
    this.capIndex = null;
  }

  this.deleteMomento = (index) => {
    var deletThis = confirm('Are you sure you want to delete this momento?');
    if(deletThis) {
      if ($scope.$ctrl.editingViewCapsule) {
        $scope.$ctrl.capsuleToEdit.contents.splice(index, 1);
        var capObj = {capsuleName: $scope.$ctrl.editedCapsuleName, capsuleId: $scope.$ctrl.capsuleId, capsuleContent: $scope.$ctrl.capsuleToEdit.contents};
        this.saveCapsule(capObj, false);
      } else {
      	this.currentCap.splice(index, 1);
        var capObj = {capsuleName: $scope.$ctrl.capsuleName, capsuleId: this.capsuleId, capsuleContent: this.currentCap};
        this.saveCapsule(capObj, false);
      }
    }
  }

  this.saveForLater = () => {
    var saveProgress = confirm('Save any changes and view your capsules?');
    if(saveProgress) {
      if ($scope.$ctrl.editingViewCapsule) {
        var capObj = {capsuleName: $scope.$ctrl.editedCapsuleName, capsuleId: $scope.$ctrl.capsuleId, capsuleContent: $scope.$ctrl.capsuleToEdit.contents};
        this.saveCapsule(capObj, false);
      } else {
        var capObj = {capsuleName: $scope.$ctrl.capsuleName, capsuleId: this.capsuleId, capsuleContent: this.currentCap};
        this.saveCapsule(capObj, false);
      }
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

    var capObj;
    if ($scope.$ctrl.editingViewCapsule) {

      capObj = {
        capsuleId: this.capsuleId,
        capsuleContent: this.capsuleToEdit.contents,
        unearthDate: date,
        recipient: recipient
      };

    } else {
      capObj = {
        capsuleId: this.capsuleId,
        capsuleContent: this.currentCap,
        unearthDate: date,
        recipient: recipient
      };
    }
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
