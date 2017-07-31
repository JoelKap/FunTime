function OwnerVm() {
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

    var userJsonObj = JSON.parse(localStorage.getItem('stored_user'));

    self.selectedType = ko.observable(self.selectedOption);

    db.on("child_added", GetBusinessTypes);
    function GetBusinessTypes(item) {
        var type = item.val();
        self.businessTypes.push({ description: type.description });
    }

    db1.on("child_added", GetExistingBusinesses);
    function GetExistingBusinesses(item) {
        var data = item.val();
        if (data.OwnerId == userJsonObj.id) {
            self.businesses.push({
                businessName: data.businessName,
                businessDescription: data.businessDescription,
                businessContactNumber: data.businessContactNumber,
                businessLocation: data.businessLocation,
                businessTypeName: data.businessTypeName,
                id: data.id,
                OwnerId: data.OwnerId
            });
        }
    }

    self.registerBusiness = function (item) {
        var description = self.selectedType().description;
        var key = db1.ref().push().key();
        db1.push({
            "businessName": item.businessName(),
            "businessDescription": item.businessDescription(),
            "businessContactNumber": item.businessContactNumber(),
            "businessLocation": item.businessLocation(),
            "OwnerId": userJsonObj.id,
            "businessTypeName": description,
            "id": key,
        });


        $("#myModal .close").click();
        self.businesses.push({
            businessName: item.businessName(),
            businessDescription: item.businessDescription(),
            businessContactNumber: item.businessContactNumber(),
            businessLocation: item.businessLocation(),
            businessTypeName: description
        });

        setTimeout(function () {
            self.businessName(null);
            self.businessDescription(null);
            self.businessContactNumber(null);
            self.businessLocation(null);
            self.selectedType(null);
            self.businessTypeName(null);
        }, 2000);
    }

    function updateUserBalance(user) {
        db1.orderByChild("id").equalTo(user.id).once("child_added", function (snapshot) {
            snapshot.ref().update(user);
        })
    }

    self.registerBusinessUpdate = function (data) {
        updateUserBalance(data);
        $("#myModal2 .close").click();
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
    self.specialsManagement = function () {
        window.location.href = "specials.html";
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