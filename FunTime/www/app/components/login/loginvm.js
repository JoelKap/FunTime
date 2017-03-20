function loginvm() {
    var self = this;

  
    self.Email = ko.observable();
    self.Password = ko.observable();


    self.loginRedirect = function () {
        window.location.href = "logIn.html";
    }
    self.registerRedirect = function () {
        window.location.href = "register.html";
    }

    self.SignIn = function (item) {
        alert('inside signe in');
    }

}