var appModule = angular.module("TMUIController", []);
appModule.controller("TMController", function($scope, $http){
    $scope.model = "Vaughn";
    $scope.telephone="7779311";
    $scope.manipulations = [];
    $scope.page = {
        start: 0, end: 0, number: 1
    }
    $scope.total = 0;

    function validateTelephone(){
        var isValid = false;
        var regex = /([0-9]{7}|[0-9]{10})/;
        if(regex.test($scope.telephone))
            isValid = true;
        else
            throw 'Invalid phone number';

        return isValid;
    }

    $scope.getManipulations = function(page){
        $scope.manipulations = [];
        if(angular.isUndefined(page))
            $scope.page.number = 1
        else
            $scope.page.number = page;


        var isValid;
        try {
            isValid = validateTelephone();
        }catch(err){
            $scope.errMessage = err;
            return;
        }
        if(isValid) {
            $scope.isLoading = true;
            $http.get("/manipulate?telephone=" + $scope.telephone + "&page=" + $scope.page.number).then(
                function (response) {
                    $scope.isLoading = false;
                    //TODO update table; process success message; loading icon
                    $scope.manipulations = response.data.page;
                    $scope.total = response.data.total;
                    $scope.page.start = ($scope.page.number * 100) - 99;
                    $scope.page.end = $scope.page.number * 100 > $scope.total ? $scope.total : $scope.page.number * 100;
                }, function (response) {
                    $scope.isLoading = false;
                    //TODO error handling
                })
        }
    }
})