angular.module('myhome', ['naif.base64']).controller('home', function($scope,$http,$window){

  $scope.imageUpload = function(element){
    var reader = new FileReader();
    reader.onload = $scope.imageIsLoaded;
    reader.readAsDataURL(element.files[0]);
  }

  $scope.imageIsLoaded = function(e){
    $scope.$apply(function() {

      document.getElementById("img").src = e.target.result;
      document.getElementById("img").style.removeProperty("display");
    });
  }

  $scope.faceUpload = function(element){
    var reader = new FileReader();
    reader.onload = $scope.faceIsLoaded;
    reader.readAsDataURL(element.files[0]);
  }

  $scope.faceIsLoaded = function(e){
    $scope.$apply(function() {

      document.getElementById("face").src = e.target.result;
      document.getElementById("face").style.removeProperty("display");
    });
  }



  $scope.upload = function(file) {
    var fname = file.base64;
    var itemList = "";

    const app = new Clarifai.App({apiKey: 'b28edbf1050d46da8a72be045d2f6c0e'});
    app.models.predict(Clarifai.GENERAL_MODEL, {base64: fname}).then(

      function(response) {
        console.log(response);
        console.log(response.outputs[0].data.concepts[0].name);
        console.log(response.outputs[0].data.concepts.length);

        for (var i = 0; i < 10;i++) {
           var temp = response.outputs[0].data.concepts[i].name;
           itemList = itemList+ temp +"<br/>";

        }
        document.getElementById("notes").innerHTML =itemList;
      }

    );
  }


  $scope.faceDetails = function(file1) {

    var face64 = file1.base64;
    var appurl = "https://api.kairos.com/detect?";
    var appid ="ceadd3c9";
    var appkey = "88afc241ee1836d54ca0eea6e037df9e";
    $http({
      url: appurl,
      method: 'POST',
      headers: { app_id: appid,app_key: appkey},
      data: { image:face64 }

    }).success(function(data){
      var age = data.images[0].faces[0].attributes.age;
      var gender = data.images[0].faces[0].attributes.gender.type;
      document.getElementById("facenotes").innerHTML = "Age : " +age+"<br/>"+"Gender : "+gender;
      console.log(data);

    }).error(function(){
      alert("error");
    });

  }

});
