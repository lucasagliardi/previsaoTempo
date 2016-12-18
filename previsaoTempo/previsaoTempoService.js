app.service("previsaoTempoService", ['$http', '$rootScope', function ($http, $rootScope) {

    var url = "http://api.openweathermap.org/data/2.5/";
    var key = "03df1ac0bda067ee2a4ea2f565d1ddb5";
    var obj = {};

    //CHAMADA API PARA A PREVISAO EM HORAS
    obj.getPrevisaoHoras = function (cidade, escala) {
        return $http.get(url + "weather?q=" + cidade + "&units=" + escala + "&APPID=" + key).then(
            function success(response) {
                var idCidade = response.data.id;
                $rootScope.tempAtual = response.data.main.temp;
                return $http.get(url + "forecast/hourly?id=" + idCidade + "&units=" + escala + "&lang=pt&APPID=" + key);
            })
    };
    //CHAMADA API PARA A PREVISAO EM DIAS
    obj.getPrevisaoDias = function (cidade, escala) {
        return $http.get(url + "weather?q=" + cidade + "&units=" + escala + "&APPID=" + key).then(
            function success(response) {
                var idCidade = response.data.id;
                return $http.get(url + "forecast/daily?id=" + idCidade + "&units=" + escala + "&cnt=7&lang=pt&APPID=" + key);
            })
    };

    return obj;

}]);
