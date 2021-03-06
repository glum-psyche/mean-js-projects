BeerCounterController = angular.module('mean.components')
.controller 'BeerCounterController', ($scope, $locale)->
	$scope.beers = [0, 1, 2, 3, 4, 5, 6]
	switch $locale.id
		when 'enus'
	    	$scope.beerForms =
	    		0: 'no beers'
	    		one: '{} beer'
	    		other: '{} beers'
	    else
	    	$scope.beerForms =
	    		0: 'нет водки'
	    		one: '{} водка'
	    		few: '{} водки'
	    		many: '{} водок'
	    		other: '{} водок'
	no