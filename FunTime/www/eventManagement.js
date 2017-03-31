function eventvm() {

    var self = this;
    var db = new Firebase("https://fun-time-9c827.firebaseio.com/Event");
    var db1 = new Firebase("https://fun-time-9c827.firebaseio.com/Business");

    var key = db1.ref().push().key();
    self.name = ko.observable();
    self.description = ko.observable();
    self.businessName = ko.observable();
    self.date = ko.observable();
    self.events = ko.observableArray([]);
    self.businesses = ko.observableArray([]);
    self.editWithItem = ko.observable(null);
    self.selectedType = ko.observable();
    var userJsonObj = JSON.parse(localStorage.getItem('stored_user'));
    self.selectedType = ko.observable(self.selectedOption);

    db1.on("child_added", GetBusinesses);
    function GetBusinesses(item) {
        var type = item.val();
        self.businesses.push({
            businessName: type.businessName,
            id: type.id
        });
    }
    

    db.on("child_added", GetEvents);
    function GetEvents(item) {
        var type = item.val();
        self.events.push({
            name: type.name,
            description: type.description,
            date: type.date,
            id: type.id != undefined ? type.id : ""
        });
    }

    self.editItem = function (data) {
        self.editWithItem(data);
        $('#myModal2').modal('show');
    }

    self.registerEvent = function (item) {
        var businessId = self.selectedType().id;
        var key = db.ref().push().key();
        db.push({
            "name": item.name(),
            "description": item.description(),
            "date": item.date(),
            "id": key,
            "businessId": businessId,
        });


        $("#myModal .close").click();
        self.events.push({
            name: item.name(),
            description: item.description(),
            date: item.date()
        });

        setTimeout(function () {
            self.name(null);
            self.description(null);
            self.date(null);
        }, 2000);
    }

    self.registerEventUpdate = function (data) {
        var db1 = new Firebase("https://fun-time-9c827.firebaseio.com/Event");
        var query = db1.orderByChild('id').equalTo(data.id);

        query.on('value', function (snap) {
            var obj = snap.val();
            var snapRef = snap.ref();
            snapRef.update({
                name: obj.name,
                description: obj.description,
                date: obj.date,
                businessId: obj.businessId
            });
        });

        //db1.update({
        //    "businessname": data.businessName,
        //    "businessdescription": data.businessDescription,
        //    "businesscontactNumber": data.businessContactNumber,
        //    "businesslocation": data.businessLocation,
        //    "OwnerId": userJsonObj.id,
        //    "businessType": 'Testing', //self.selectedType().description,
        //    "id": self.id
        //})

        $("#myModal2 .close").click();
        self.businesses.push({
            name: name,
            description: data.description(),
            date: data.date()
        });

        setTimeout(function () {
            self.name(null);
            self.description(null);
            self.date(null)
        }, 2000);
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
        window.location.href = "index.html";
    }
}