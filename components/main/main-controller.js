'use strict'

angular.module('twitterApp.main-ctrl', [])

.controller('Main-Ctrl', function($log, $q, server, $scope, router){
	var vm = this;

	vm.tweets = [];
	vm.loading = false;
	

	vm.addTweet = function() {
		router.goToAddTweet();
	}
	
	vm.refreshTweets = function() {
		vm.loading = true;
		server.getLatestTweets()
			.then(function(response){
				vm.tweets = response;
				$scope.$apply();	
			});
	}

});