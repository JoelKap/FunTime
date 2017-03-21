function OwnerVm() {
    var self = this;
    var db = new Firebase("https://fun-time-9c827.firebaseio.com/BusinessType");

    self.businessName = ko.observable();
    self.businessDescription = ko.observable();
    self.businessContactNumber = ko.observable();
    self.businessLocation = ko.observable();
    self.businessTypeName = ko.observable();
    self.businesses = ko.observableArray([]);
    self.businessTypes = ko.observableArray([]);
    self.selectedType = ko.observable({});
    var userJsonObj = JSON.parse(localStorage.getItem('stored_user'));

    self.selectedType = ko.observable(self.selectedOption);

    db.on("child_added", GetBusinessTypes);

    function GetBusinessTypes(item) {
        var type = item.val();
        self.businessTypes.push({ description: type.description });
    }

    self.registerBusiness = function (item) {
        self.selectedType = self.selectedType().description;
        db.push({
            "businessname": item.businessName(),
            "businessdescription": item.businessDescription(),
            "businesscontactNumber": item.businessContactNumber(),
            "businesslocation": item.businessLocation(),
            "ownerUsername": userJsonObj.email,
            "businessType": self.selectedType
        });

        setTimeout(function () {
            self.businessName(null);
            self.businessDescription(null);
            self.businessContactNumber(null);
            self.businessLocation(true);
        }, 2000);

        $("#myModal .close").click();
        self.businesses.push({
            businessTypeName: self.selectedType.description,
            businessName: item.businessName(),
            businessDescription: item.businessDescription(),
            businessContactNumber: item.businessContactNumber(),
            businessLocation: item.businessLocation()
        });
    }




}