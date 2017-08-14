angular.module('app')
.controller('HomeCtrl', function($scope, Caps) {
  this.view = true;
  this.editingViewCapsule = false;
  this.capsuleId = 0;
  this.capsuleToEdit = {};
  this.currentCap = [];
  this.editedCapsuleName = '';
  this.clear = '';
  this.named = false;

  this.handleFilter = function(event) {
    Caps.filterCaps(event.target.id, $scope.$ctrl.userId, (err, res) => {
      if (!err) {
        $scope.$ctrl.capsData = res;
      } else {
        throw new Error(err);
      }
    });
  }

  this.editCapsule = (capsule) => {
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
    if (this.view) {
      Caps.createCap($scope.$ctrl.userId,(err, capsuleId) => {
        if (err) {
          console.log('You dun screwed up');
          throw new Error(err);
        } else {
          this.capsuleName = '';
          this.capsuleId = capsuleId;
          this.capsuleToEdit = {};
          this.named = false;
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
            this.named = false;
            this.view = false;
            this.editingViewCapsule = false;
          }
        })
      }
    }
  }


  this.toggleToView = function(buried) {

    if(!this.view) {
      if (!buried) {
        var saveProgress = confirm('Are you sure you want to leave this capsule?\nWe\'ll save this one if you do.');
      } else {
        var saveProgress = true;
      }
      if(saveProgress) {
        Caps.filterCaps('all', $scope.$ctrl.userId, (err, res) => {
          if (!err) {
            $scope.$ctrl.capsData = res;
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
          $scope.$ctrl.capsData = res;
        } else {
          throw new Error(err);
        }
      });
    }
  }.bind(this)


  this.deleteCap = (capId, index) => {
  console.log('deleted cap');
    var saveProgress = confirm('Remove this capsule?...forever??');

    if(saveProgress) {
      
      var capObj = {capsuleId: capId}
      Caps.deleteCap(capObj, (err, res) => {
        if (err) {
          throw new Error(err);
        } else {
          if (index) {
            $scope.$ctrl.initialData.splice(index, 1);
            $scope.$ctrl.capsData.splice(index, 1);
          } else {
            this.toggleToView(true);
          }
        }
      });
    }
  }

  this.logOut = () => {
    $scope.$ctrl.signedIn = false;
  }

})
.component('homePage', {
  controller: 'HomeCtrl',
  bindings: {
    userId: '<',
    initialData: '=',
    first: '=',
    editedCapsuleName: '<',
    signedIn: '=',
    email: '<',
    capsData: '='
  },
  templateUrl: '../templates/home.html'
})
