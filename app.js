var app = angular.module('previsaoTempo', ['ngMaterial', 'ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider.when('/', { templateUrl: 'previsaoTempo/previsaoTempo.html', controller: 'previsaoTempoCtrl' });
    $routeProvider.when('/previsaoTempo', { templateUrl: 'previsaoTempo/previsaoTempo.html', controller: 'previsaoTempoCtrl' });
    $routeProvider.otherwise({ redirectTo: '/previsaoTempo' });
});

