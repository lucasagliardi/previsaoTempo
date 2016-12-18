app.controller("previsaoTempoCtrl", function ($scope, $http, previsaoTempoService, $mdSidenav, $rootScope) {
  //INICIALIZACAO VARIAVEIS NECESSARIAS
  $scope.city = "";
  $scope.escala = "metric";
  $scope.cidade = "";
  $scope.exibir = false;
  $scope.toggleRight = buildToggler('right');
  //ABRIR O SIDEBAR LATERAL
  $scope.isOpenRight = function () {
    return $mdSidenav('right').isOpen();
  };

  function buildToggler(navID) {
    return function () {
      $mdSidenav(navID)
        .toggle()
    }
  }
  //FECHA MODAL
  $scope.close = function () {
    $mdSidenav('right').close()
      .then(function () {
      });
  };
  //EXECUTA AS CHAMADAS DE SERVICOS
  $scope.buscaPrevisoes = function () {
    previsaoTempoService.getPrevisaoHoras($scope.city, $scope.escala).then(function success(response) {
      $scope.cidade = response.data.city.name;
      $scope.previsoesHoje = response.data.list;
      $scope.dataAtual = new Date();
      for (var i = 0; i < response.data.list.length; i++) {
        //AQUI ESTOU CONVERTANDO A DATA DE UMA STRING PARA HEXADECIMAL
        response.data.list[i].dt_txt = Date.parse(response.data.list[i].dt_txt);
      }
      $scope.exibir = true;
    }, function error(response) {
      var data = response.data;
    });
    previsaoTempoService.getPrevisaoDias($scope.city, $scope.escala).then(function success(response) {
      $scope.previsoes = response.data.list;
      for (var i = 0; i < response.data.list.length; i++) {
        //AQUI ESTOU CONVERTERNDO A DATA UNIX
        response.data.list[i].dt = response.data.list[i].dt * 1000;
      }
      $scope.exibir = true;
    }, function error(response) {
      var data = response.data;
    });
    $scope.close();
  };
});
