angular.module('homepage', [])
.controller('HomeCtrl', function(Caps) {

  this.someVar = true;
  this.capsData = ['each', 'word', 'is', 'a', 'capsule'];

  this.handleFilter = function(event) {

    Caps.filterCaps(event.target.id, (err, res) => {
      if (!err) {
        console.log('the get request for filtered data is ', res);
        this.capsData = res;
      } else {
        throw new Error(err);
      }
    })
  }
})
.component('homePage', {
  controller: 'HomeCtrl',
  template:
    `<div>
      <h1 class="mainHeader">Life-Time Capsule</h1>
    </div>
    <div class="navbar">
      <button ng-click="$ctrl.someVar = true">View</button>
      <button ng-click="$ctrl.someVar = false">Create</button>
    </div>
    <span ng-show=$ctrl.someVar>
      <div class="filterBar">
        <div class="filterButton" id="all" ng-click="$ctrl.handleFilter($event)">
          All
        </div>
        <div class="filterButton" id="sent" ng-click="$ctrl.handleFilter($event)">
          Sent
        </div>
        <div class="filterButton" id="received" ng-click="$ctrl.handleFilter($event)">
          Received
        </div>
        <div class="filterButton" id="inprogress" ng-click="$ctrl.handleFilter($event)">
          In Progress
        </div>
      </div>
    </span>
    <span ng-show=$ctrl.someVar>
      <view-page ng-repeat="cap in $ctrl.capsData track by $index" cap="cap"> </view-page>
    </span>
    <span ng-hide=$ctrl.someVar>
      <create-page> </create-page>
    </span>`
})
