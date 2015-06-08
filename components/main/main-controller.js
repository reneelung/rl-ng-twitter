'use strict'

angular.module('twitterApp.main-ctrl', [])

.controller('Main-Ctrl', function($log, $q, server, $scope, router){
	var vm = this;

	vm.tweets = [];
	vm.logged_in = server.checkLoggedIn();
	vm.loading = false;
	vm.user;

	vm.addTweet = router.goToAddTweet();

	server.initialize();	

	vm.signIn = function()
	{
		server.connectTwitter()
			.then(function(response){	
				response.me()
					.then(function(user){
						vm.user = user;
					})
				vm.logged_in = true;				
			})
			.then(null, $log.error);
	}

	vm.signOut = function()
	{
		server.clearCache();
		vm.logged_in = false;
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