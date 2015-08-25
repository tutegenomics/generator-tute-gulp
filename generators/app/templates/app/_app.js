var <%= angularAppName %> = angular.module('<%= angularAppName %>', [
    'ui.router',
    'tute-icons'
])

.constant('appConstants', {
	/**
	 * constructs filepath for a view template
	 * @param  {string} filepath
	 * @return {string}
	 */
	getView(filepath) {
		return '/views/' + filepath + '.html';
	}

})

.config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
});
