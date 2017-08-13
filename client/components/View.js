angular.module('app')
.controller('ViewCtrl', function($scope, Caps) {
  this.viewCapsule = (cap) => {
    $('.modal-dialog').html(
	  `<div class="modal-content" id="viewModalContent"> 
	    <div class="modal-header">
	      <button type="button" class="close" data-dismiss="modal">&times;</button>
	      <h4 class="modal-title">${cap.capsuleName}</h4>
	    </div>
	    <div class="modal-body" id="viewModalBody">
	    </div>
	  </div>`
    );

    for (var i = 0; i < cap.contents.length; i++) {
      $('.modal-body').append(
      	  `<div id="modalBodyBorder">
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