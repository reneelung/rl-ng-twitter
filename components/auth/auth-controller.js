'use strict'

angular.module('twitterApp.auth', [])

.controller('Auth-Ctrl', function(server, $scope, router, $log){
	var vm = this;
	vm.user;

	server.initialize();	

	vm.logged_in = server.checkLoggedIn();	
	
	if (vm.logged_in) {
		server.getUser()
			.then(function(response){
				vm.user = response;
				$scope.$apply();
			});
	}

	vm.signIn = function()
	{
		server.connectTwitter()
			.then(function(response){
				if (!vm.user) {
					response.me()
						.then(function(user){						
							vm.user = user;
							$scope.$apply();
						})
				}				
			})
			.then(null, $log.error);
	}

	vm.signOut = function()
	{
		server.clearCache();
		vm.logged_in = false;
	}
	
});