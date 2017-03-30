function eventvm() {
   
    var self = this;
    var db = new Firebase("https://fun-time-9c827.firebaseio.com/BusinessType");
    var db1 = new Firebase("https://fun-time-9c827.firebaseio.com/Business");

    var key = db1.ref().push().key();
    self.businessName = ko.observable();
    self.businessDescription = ko.observable();
    self.businessContactNumber = ko.observable();
    self.businessLocation = ko.observable();
    self.businessTypeName = ko.observable();
    self.businesses = ko.observableArray([]);
    self.businessTypes = ko.observableArray([]);
    self.selectedType = ko.observable();
    self.editWithItem = ko.observable(null);

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