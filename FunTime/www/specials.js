function specialsVm() {
    var self = this;
    var db = new Firebase("https://fun-time-9c827.firebaseio.com/Special");
    var db1 = new Firebase("https://fun-time-9c827.firebaseio.com/Business");

    var key = db1.ref().push().key();
    self.name = ko.observable();
    self.FromDate = ko.observable();
    self.ToDate = ko.observable();
    self.specials = ko.observableArray([]);
    self.businesses = ko.observableArray([]);
    self.selectedType = ko.observable();
    self.editWithItem = ko.observable(null);

    var userJsonObj = JSON.parse(localStorage.getItem('stored_user'));

    self.selectedType = ko.observable(self.selectedOption);

    db1.on("child_added", GetBusinesses);
    function GetBusinesses(item) {
        var type = item.val();
        self.businesses.push({
            businessName: type.businessName,
            id: type.id != undefined ? type.id : ""
        });
    }

    db.on("child_added", GetSpecials);
    function GetSpecials(item) {
        var type = item.val();
        self.specials.push({
            name: type.name,
            validFromDate: type.validFromDate,
            validToDate: type.validToDate,
            id: type.id != undefined ? type.id : ""
        });
    }

    self.createSpecials = function (item) {
        var id = self.selectedType().id;
        var key = db.ref().push().key();
        db.push({
            "name": item.name(),
            "validFromDate": item.validFromDate,
            "validToDate": item.validToDate,
            "businessId": id,
            "id": key,
        });


        $("#myModal .close").click();
        self.businesses.push({
            name: item.name(),
            validFromDate: item.validFromDate,
            validToDate: item.validToDate
        });

        setTimeout(function () {
            self.name(null);
            self.validFromDate(null);
            self.validToDate(null)
        }, 2000);
    }

    function updateUserBalance(user) {
        db.orderByChild("id").equalTo(user.id).once("child_added", function (snapshot) {
            snapshot.ref().update(user);
        })
    }

    self.registerSpecialUpdate = function (data) {

        updateUserBalance(data);
        $("#myModal2 .close").click();
        //self.businesses.push({
        //    name: data.name,
        //    validFromDate: data.validFromDate,
        //    validToDate: data.validToDate
        //});

        //setTimeout(function () {
        //    self.name(null);
        //    self.validFromDate(null);
        //    self.validToDate(null)
        //}, 2000);
        alert('saved successfully, Please refresh to see changes');
    }

    self.editItem = function (data) {
        self.editWithItem(data);
        $('#myModal2').modal('show');
    }


    self.eventManagement = function () {
        window.location.href = "eventManagement.html";
    }
    self.registerBusiness = function () {
        window.location.href = "owner.html";
    }

    self.employeeManagement = function () {
        window.location.href = "employeeManagement.html";
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