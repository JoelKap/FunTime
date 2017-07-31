function employeeVm() {
    var self = this;
    var db = new Firebase("https://fun-time-9c827.firebaseio.com/Business");
    var db1 = new Firebase("https://fun-time-9c827.firebaseio.com/ClubEmployee");

    var key = db1.ref().push().key();
    self.name = ko.observable();
    self.lastname = ko.observable();
    self.contact = ko.observable();
    self.address = ko.observable();
    self.employees = ko.observableArray([]);
    self.businesses = ko.observableArray([]);
    self.selectedType = ko.observable();
    self.editWithItem = ko.observable(null);

    var userJsonObj = JSON.parse(localStorage.getItem('stored_user'));

    self.selectedType = ko.observable(self.selectedOption);

    db.on("child_added", GetBusinesses);
    function GetBusinesses(item) {
        var type = item.val();
        self.businesses.push({
            businessName: type.businessName,
            id: type.id != undefined ? type.id : ""
        });
    }


    db1.on("child_added", GetEmployee);
    function GetEmployee(item) {
        var type = item.val();
        self.employees.push({
            name: type.name,
            lastname: type.lastname,
            contact: type.contact,
            address: type.address,
            id: type.id != undefined ? type.id : "",
            businessId: type.businessId != undefined ? type.businessId : ""
        });
    }


    self.registerEmployee = function (item) {
        var id = self.selectedType().id;
        var key = db1.ref().push().key();
        db1.push({
            "name": item.name(),
            "lastname": item.lastname(),
            "contact": item.contact(),
            "address": item.address(),
            "businessId": id,
            "id": key,
        });


        $("#myModal .close").click();
        self.employees.push({
            name: item.name(),
            lastname: item.lastname(),
            contact: item.contact(),
            address: item.address()
        });

        setTimeout(function () {
            self.name(null);
            self.lastname(null);
            self.contact(null);
            self.address(null)
        }, 2000);
    }




    self.updateEmployee = function (data) {

        updateUserBalance(data)

        $("#myModal2 .close").click();

        alert('saved successfully, Please refresh to see changes');
    }
    function updateUserBalance(data) {
        db1.orderByChild("id").equalTo(data.id).once("child_added", function (snapshot) {
            snapshot.ref().update(data);
        })
    }

    self.editItem = function (data) {
        self.editWithItem(data);
        $('#myModal2').modal('show');
    }

    self.eventManagement = function () {
        window.location.href = "eventManagement.html";
    }
    self.businessManagement = function () {
        window.location.href = "owner.html";
    }
    self.specialsManagement = function () {
        window.location.href = "specials.html";
    }

    self.alcoholManagement = function () {
        window.location.href = "alcoholOwner.html";
    }

    self.accountManagement = function () {
        window.location.href = "accountManagement.html";
    }
    self.logOut = function () {
        window.location.href = "index.html";
    }
}