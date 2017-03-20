function userRegistrationModel() {
    var self = this;
    //baseView.call(self);

   
    self.Name = ko.observable();
    self.Surname = ko.observable();
    self.Email = ko.observable();
    self.Password = ko.observable();


    self.loginRedirect = function () {
        window.location.href = "logIn.html";
    }
    self.registerRedirect = function () {
        window.location.href = "register.html";
    }
    self.register = function (item) {
        alert('clicked');
    }





}