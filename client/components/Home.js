angular.module('app')
.controller('HomeCtrl', function($scope, Caps) {
  this.view = true;
  this.editingViewCapsule = false;
  this.capsuleId = 0;
  this.capsuleToEdit = {};
  this.capsData = [];

   // Caps.filterCaps('all', $scope.$ctrl.userId, (err, allCaps) => {
   //   if (err) {
   //    throw new Error(err);
   //   } else {
   //    console.log($scope.$ctrl.userId)
   //     this.capsData = allCaps
   //   }
   // });

  this.handleFilter = function(event) {
    Caps.filterCaps(event.target.id, $scope.$ctrl.userId, (err, res) => {
      if (!err) {
        console.log('the get request for filtered data is ', res);
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
    this.view = false;
  }

  this.toggleToCreate = () => {
    console.log('toggled', this.view)
    if (this.view) {
      Caps.createCap($scope.$ctrl.userId,(err, capsuleId) => {
        if (err) {
          console.log('You dun screwed up');
          throw new Error(err);
        } else {

          this.capsuleId = capsuleId;
          this.editingViewCapsule = false;
          this.view = false;
        }
      })
    }
  }

  this.toggleToView = () => {
    if(!this.view) {
      console.log('toggling to view id ', this.capsuleId)
      var saveProgress = confirm('Should we save this session?');
      if(saveProgress) {
        //save capsule
      }
      this.view = true;
    }
  }


})
.component('homePage', {
  controller: 'HomeCtrl',
  bindings: {
    userId: '<'
  },
  templateUrl: '../templates/home.html'
})
