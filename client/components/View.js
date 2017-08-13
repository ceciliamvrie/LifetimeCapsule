angular.module('app')
.controller('ViewCtrl', function($scope, Caps) {
  this.viewDetails = () => {
  	console.log('view details was clicked!!!')
  }
  this.viewCapsule = (cap) => {
    $('#viewModal').html(
    	`
       <div class="modal-dialog" id="viewModalDialog">
		  <div class="modal-content" id="viewModalContent"> 
		    <div class="modal-header">
		      <button type="button" class="close" data-dismiss="modal">&times;</button>
		      <h4 class="modal-title">${cap.capsuleName}</h4>
		    </div>
		    <div class="viewModal-body" id="viewModalBody">
		    </div>
		  </div>
		</div>
	  `
    );

    for (var i = 0; i < cap.contents.length; i++) {
      $('.viewModal-body').append(
      	  `<div id="modalBodyBorder" ng-click="$ctrl.viewDetails()">
    	    <h4>${cap.contents[i].name}</h4>
    	    <p>${cap.contents[i].input}</p>
    	  </div>`
        )
    }
  }
})
.component('viewPage', {
  controller: 'ViewCtrl',

  bindings: {
  	cap: '<',
  	editCapsule: '=',
  	init: '<',
  	viewCapsule: '='
  },

  templateUrl: '../templates/view.html'
})