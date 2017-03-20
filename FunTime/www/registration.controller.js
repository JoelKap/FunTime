function userRegistrationModel() {
    var self = this;
    
    var db = new Firebase("https://fun-time-9c827.firebaseio.com/User");
    self.Name = ko.observable();
    self.Surname = ko.observable();
    self.Email = ko.observable();
    self.Password = ko.observable();
    self.isSaved = ko.observable(false);


    self.loginRedirect = function () {
        window.location.href = "logIn.html";
    }
    self.registerRedirect = function () {
        window.location.href = "register.html";
    }
    self.register = function (item) {
        db.push({
            "name": item.Name(),
            "surname": item.Surname(),
            "email": item.Email(),
            "password": item.Password()
        });

        setTimeout(function () {
            self.Name(null);
            self.Surname(null);
            self.Email(null);
            self.Password(null);
            self.isSaved(ko.observable(true));
        }, 2000);

    }





}