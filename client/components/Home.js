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

  this.editCapsule = (capsule) => {
    $scope.$ctrl.first = false;
    this.capsuleToEdit = capsule;
    this.capsuleToEdit.contents = capsule.contents;
    this.capsuleId = capsule._id;
    this.editingViewCapsule = true;
    this.editedCapsuleName = capsule.capsuleName;
    if (capsule.buried) {
      alert('GET YOUR HANDS OFF THIS! IT\'S NOT READY TO BE UNEARTHED YET!!');
    } else {
      this.view = false;
      this.named = true;
    }
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
            this.capsuleId = capsuleId;
            this.capsuleToEdit = {};
            this.view = false;
            this.editingViewCapsule = false;
          }
        })
      }
    }
  }

  this.toggleToView = function() {

    $scope.$ctrl.first = false;
    if(!this.view) {

      var saveProgress = confirm('Are you sure you want to leave this capsule?');
      if(saveProgress) {
        Caps.filterCaps('all', $scope.$ctrl.userId, (err, res) => {
          if (!err) {
            console.log('should refresh')
            this.capsData = res;
          } else {
            throw new Error(err);
          }
        });
        this.currentCap = [];
        this.editingViewCapsule = false;
        this.named = false;
        this.view = true;
      }
    }
  }.bind(this)


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
