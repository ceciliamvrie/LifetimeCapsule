angular.module('app')
.controller('HomeCtrl', function($scope, Caps) {
  this.view = true;
  this.editingViewCapsule = false;
  this.capsuleId = 0;
  this.capsuleToEdit = {};
  this.capsData = $scope.$ctrl.initialData;
  this.clear = '';

  this.handleFilter = function(event) {
    Caps.filterCaps(event.target.id, $scope.$ctrl.userId, (err, res) => {
      if (!err) {
        this.capsData = res;
      } else {
        throw new Error(err);
      }
    });
  }

  this.editCapsule = (capsule) => {
    this.capsuleToEdit = capsule;
    this.capsuleToEdit.contents = capsule.contents;
    this.capsuleId = capsule._id;
    this.editingViewCapsule = true;
    this.clear = '';
    this.view = false;
  }

  this.toggleToCreate = () => {

    if (this.view) {
      Caps.createCap($scope.$ctrl.userId,(err, capsuleId) => {
        if (err) {
          console.log('You dun screwed up');
          throw new Error(err);
        } else {
          this.capsuleId = capsuleId;
          this.clear = '';
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
            console.log('created new cap and should wipe data')
            this.capsuleId = capsuleId;
            this.clear = '';
            this.capsuleToEdit = {};
            this.view = false;
          }
        })
      }
    }
  }

  this.toggleToView = () => {
    if(!this.view) {

      var saveProgress = confirm('Are you sure you want to leave this capsule?');
      if(saveProgress) {
        this.view = true;
      }
    }
  }


})
.component('homePage', {
  controller: 'HomeCtrl',
  bindings: {
    userId: '<',
    initialData: '<'
  },
  templateUrl: '../templates/home.html'
})
