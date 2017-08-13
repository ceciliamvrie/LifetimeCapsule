angular.module('app')
.controller('HomeCtrl', function($scope, Caps) {
  this.view = true;
  this.editingViewCapsule = false;
  this.capsuleId = 0;
  this.capsuleToEdit = {};
  this.capsData = [];
  this.currentCap = [];
  this.editedCapsuleName = '';
  this.clear = '';
  this.named = false;

  this.handleFilter = function(event) {
    $scope.$ctrl.first = false;
    Caps.filterCaps(event.target.id, $scope.$ctrl.userId, (err, res) => {
      if (!err) {
        this.capsData = res;
      } else {
        throw new Error(err);
      }
    });
  }

  this.viewCapsule = (capsule) => {
    
  }

  this.editCapsule = (capsule) => {
    $scope.$ctrl.first = false;
    this.capsuleToEdit = capsule;
    this.capsuleToEdit.contents = capsule.contents;
    this.capsuleId = capsule._id;
    this.capsuleName = capsule.capsuleName;
    this.editingViewCapsule = true;
    this.editedCapsuleName = capsule.capsuleName;
    this.named = true;
    this.view = false;
  }

  this.toggleToCreate = () => {
    $scope.$ctrl.first = false;
    if (this.view) {
      Caps.createCap($scope.$ctrl.userId,(err, capsuleId) => {
        if (err) {
          console.log('You dun screwed up');
          throw new Error(err);
        } else {
          this.capsuleName = '';
          this.capsuleId = capsuleId;
          this.capsuleToEdit = {};
          this.view = false;
        }
      })
    } else {
      var saveProgress = confirm('Are you sure you want to start a new capsule?');
      if(saveProgress) {
        Caps.createCap($scope.$ctrl.userId,(err, capsuleId) => {
          if (err) {
            console.log('You dun screwed up');
            throw new Error(err);
          } else {
            this.named = false;
            this.capsuleName = '';
            this.currentCap = [];
            this.capsuleId = capsuleId;
            this.capsuleToEdit = {};
            this.view = false;
            this.editingViewCapsule = false;
          }
        })
      }
    }
  }


  this.toggleToView = function(buried) {

    $scope.$ctrl.first = false;
    if(!this.view) {
      if (!buried) {
        var saveProgress = confirm('Are you sure you want to leave this capsule? \n We\'ll save this one if you do.');
      } else {
        var saveProgress = true;
      }
      if(saveProgress) {
        Caps.filterCaps('all', $scope.$ctrl.userId, (err, res) => {
          if (!err) {
            this.capsData = res;
          } else {
            throw new Error(err);
          }
        });
        this.capsuleName = '';
        this.currentCap = [];
        this.editingViewCapsule = false;
        this.named = false;
        this.view = true;
      }
    } else {
      Caps.filterCaps('all', $scope.$ctrl.userId, (err, res) => {
        if (!err) {
          this.capsData = res;
        } else {
          throw new Error(err);
        }
      });
    }
  }.bind(this)


  this.deleteCap = (capId, index) => {

    var saveProgress = confirm('Remove this capsule?...forever??');

    if(saveProgress) {
      
      var capObj = {capsuleId: capId}
      Caps.deleteCap(capObj, (err, res) => {
        if (err) {
          throw new Error(err);
        } else {
          $scope.$ctrl.initialData.splice(index, 1);
          this.capsData.splice(index, 1);
        }
      });
    }
  }

})
.component('homePage', {
  controller: 'HomeCtrl',
  bindings: {
    userId: '<',
    initialData: '=',
    first: '=',
    editedCapsuleName: '<'
  },
  templateUrl: '../templates/home.html'
})
