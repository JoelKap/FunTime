﻿function userRegistrationModel() {
    var self = this;

    var db = new Firebase("https://fun-time-9c827.firebaseio.com/User");
    var key = db.ref().push().key();
    self.Name = ko.observable();
    self.Surname = ko.observable();
    self.Email = ko.observable();
    self.Password = ko.observable();
    self.isSaved = ko.observable(false);
    self.selectedUser = ko.observable();
    self.userTypes = ko.observableArray([{ description: 'Owner' }, { description: 'Customer' }]),

    self.loginRedirect = function () {
        window.location.href = "logIn.html";
    }
    self.registerRedirect = function () {
        window.location.href = "register.html";
    }

    self.selectedUser = ko.observable(self.selectedOption);

    self.register = function (item) {
        self.selectedUser = self.selectedUser().description;
        db.push({
            "userType": self.selectedUser,
            "name": item.Name(),
            "surname": item.Surname(),
            "email": item.Email(),
            "password": item.Password(),
            "id": key
        });

        setTimeout(function () {
            self.Name(null);
            self.Surname(null);
            self.Email(null);
            self.Password(null);
            self.isSaved(ko.observable(true));
        }, 2000);

    }

    self.eventManagement = function () {
        window.location.href = "eventManagement.html";
    }
    self.registerBusiness = function () {
        window.location.href = "owner.html";
    }
    self.specialsManagement = function () {
        window.location.href = "specials.html";
    }
    self.employeeManagement = function () {
        window.location.href = "employeeManagement.html";
    }
    self.accountManagement = function () {
        window.location.href = "accountManagement.html";
    }
    self.logOut = function () {
        window.location.href = "home.html";
    }





}