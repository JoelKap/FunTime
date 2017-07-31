function eventvm() {

    var self = this;
    var db = new Firebase("https://fun-time-9c827.firebaseio.com/Event");
    var db1 = new Firebase("https://fun-time-9c827.firebaseio.com/Business");
    var dbEvent = new Firebase("https://fun-time-9c827.firebaseio.com/Event");
    var db2 = new Firebase("https://fun-time-9c827.firebaseio.com/BookedTicket");
    var dbAlcohol = new Firebase("https://fun-time-9c827.firebaseio.com/Alcohol");
    var key = db1.ref().push().key();
    self.name = ko.observable();
    self.description = ko.observable();
    self.businessName = ko.observable();
    self.date = ko.observable();
    self.events = ko.observableArray([]);
    self.businesses = ko.observableArray([]);
    self.alcohols = ko.observableArray([]);
    self.editWithItem = ko.observable(null);
    self.selectedType = ko.observable();
    var userJsonObj = JSON.parse(localStorage.getItem('stored_user'));
    self.selectedType = ko.observable(self.selectedOption);
    var user = JSON.parse(localStorage.getItem("stored_user"));
    db1.on("child_added", GetBusinesses);
    function GetBusinesses(item) {
        var type = item.val();
        self.businesses.push({
            businessName: type.businessName,
            id: type.id
        });
    }

    dbAlcohol.on("child_added", GetAlcohols);
    function GetAlcohols(item) {
        var typo = item.val();
        self.alcohols.push(typo);
    }




    db.on("child_added", GetEvents);
    function GetEvents(item) {
        var type = item.val();
        self.events.push(type);
    }

    self.editItem = function (data) {
        self.editWithItem(data);
        $('#myModal2').modal('show');
    }

    self.editAlcohol = function (data) {
        self.editWithItem(data);
        $('#myModal3').modal('show');
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
            "amountInToken": item.amountInToken
        });




        setTimeout(function () {
            self.name(null);
            self.description(null);
            self.amountInToken(null);
            self.date(null);
        }, 2000);

        $("#myModal .close").click();
        self.events.push({
            name: item.name(),
            description: item.description(),
            amountInToken: item.amountInToken(),
            date: item.date()
        });
    }

    function updateUserBalance(user) {
        db.orderByChild("id").equalTo(user.id).once("child_added", function (snapshot) {
            snapshot.ref().update(user);
        })
    }

    self.registerEventUpdate = function (data) {

        updateUserBalance(data);

        $("#myModal2 .close").click();
        //self.businesses.push({
        //    name: name,
        //    description: data.description(),
        //    amountInToken: data.amountInToken(),
        //    date: data.date()
        //});

        //setTimeout(function () {
        //    self.name(null);
        //    self.description(null);
        //    self.amountInToken(null);
        //    self.date(null);
        //    alert('saved successfully');
        //}, 2000);
        alert('saved successfully, Please refresh to see changes');
    }



    self.alcoholtUpdate = function (data) {

        updateUserAlcohol(data);

        $("#myModal3 .close").click();
        //self.alcohols.push({
        //    type: data.type,
        //    name: data.name(),
        //    price: data.price
        //});

        //setTimeout(function () {
        //    self.name(null);
        //    self.description(null);
        //    self.amountInToken(null);
        //    self.date(null);
        //    alert('saved successfully');
        //}, 2000);
        alert('saved successfully, Please refresh to see changes');
    }

    function updateUserAlcohol(data) {
        dbAlcohol.orderByChild("id").equalTo(data.id).once("child_added", function (snapshot) {
            snapshot.ref().update(data);
        })
    } 

    self.cancelTicket = function (item) {
        //remove ticket booked
        cancelUserEvent(item);
        alert('Cancel successful, Please refresh');

    }

    self.registerAlcohol = function (item) {
        var userId = user.id;
        var key = dbAlcohol.ref().push().key();
        dbAlcohol.push({
            "name": item.name(),
            "type": item.type,
            "id": key,
            "price": item.price,
            "userId": userId
        });




        //setTimeout(function () {
        //    self.name(null);
        //    self.description(null);
        //    self.amountInToken(null);
        //    self.date(null);
        //}, 2000);

        $("#myModalA .close").click();
        //self.alcohols.push({
        //    name: item.name(),
        //    type: item.type,
        //    price: item.price,
        //});
    }


    function cancelUserEvent(item) {
        dbEvent.orderByChild("id").equalTo(item.id).once("child_added", function (snapshot) {
            snapshot.ref().remove();
        })
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