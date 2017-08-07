angular.module('homepage', [])
.controller('HomeCtrl', function() {
  this.someVar = true;
})
.component('homePage', {
  controller: 'HomeCtrl',
  template: 
    `<div>
      <h1>Life-Time Capsule</h1>
    </div>
    <div class="navbar"> 
      <button ng-click="$ctrl.someVar = true">View</button>
      <button ng-click="$ctrl.someVar = false">Create</button>
    </div>
    <span ng-show=$ctrl.someVar>
      <div>
        All
      </div>
      <div>
        Sent
      </div>
      <div>
        Received
      </div>
      <div>
        In Progress
      </div>
    </span>
    <span ng-show=$ctrl.someVar>
      <view-page> </view-page>
    </span>
    <span ng-hide=$ctrl.someVar>
      <create-page> </create-page>
    </span>`
})