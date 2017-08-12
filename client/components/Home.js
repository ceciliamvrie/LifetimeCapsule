angular.module('app')
.controller('HomeCtrl', function($scope, Caps) {
  this.view = true;
  this.editingViewCapsule = false;
  this.capsuleId = 0;
  this.capsuleToEdit = {};
  this.capsData = [];
  this.clear = '';

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

  this.editCapsule = (capsule) => {
    $scope.$ctrl.first = false;
    this.capsuleToEdit = capsule;
    this.capsuleToEdit.contents = capsule.contents;
    this.capsuleId = capsule._id;
    this.editingViewCapsule = true;
    this.clear = '';
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
            this.editingViewCapsule = false;
          }
        })
      }
    }
  }

  this.toggleToView = () => {
    $scope.$ctrl.first = false;
    if(!this.view) {

      var saveProgress = confirm('Are you sure you want to leave this capsule?');
      if(saveProgress) {
        Caps.filterCaps('all', $scope.$ctrl.userId, (err, res) => {
          if (!err) {
            this.capsData = res;
          } else {
            throw new Error(err);
          }
        });
        this.view = true;
      }
    }
  }


})
.component('homePage', {
  controller: 'HomeCtrl',
  bindings: {
    userId: '<',
    initialData: '=',
    first: '='
  },
  templateUrl: '../templates/home.html'
})
