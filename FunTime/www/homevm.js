function homevm() {
    var self = this;
    var db = new Firebase("https://fun-time-9c827.firebaseio.com/Business");
    var db1 = new Firebase("https://fun-time-9c827.firebaseio.com/BookedTicket");
    var dbAcc = new Firebase("https://fun-time-9c827.firebaseio.com/Account");
    var dbUser = new Firebase("https://fun-time-9c827.firebaseio.com/User");
    var dbEvent = new Firebase("https://fun-time-9c827.firebaseio.com/Event");
    self.editWithItem = ko.observable(null);
    self.isInsufficient = ko.observable(false);
    self.isAdded = ko.observable(false);
    self.amount = ko.observable();
    self.purchaseAmount = ko.observable();
    self.events = ko.observableArray([]);
    var tempEvents = [];
    var eventBookingJsonObj = JSON.parse(localStorage.getItem('stored_eventBooking'));
    var user = JSON.parse(localStorage.getItem("stored_user"));
    self.balance = ko.observable();
    self.editUserProfileWithItem = ko.observable(null);

    if (eventBookingJsonObj != undefined) {
        eventBookingJsonObj.purchaseAmount = 0;
        self.editWithItem(eventBookingJsonObj);
        $('#myModal').modal('show');
    }

    function GetBusinesses(data) {
        var business = data.val();
    };

    self.payTicket = function (item) {
        if (user.availableToken < 0 || user.availableToken < eventBookingJsonObj.amountInToken || user.availableToken == undefined || item.purchaseAmount > eventBookingJsonObj.amountInToken) {
            self.isInsufficient(ko.observable(true));
        }

        else {
            var key = db1.ref().push().key();
            db1.push({
                "eventId": eventBookingJsonObj.id,
                "firstName": user.name,
                "surname": user.surname,
                "userId": user.id,
                "id": key,
            });
            $("#myModal .close").click();

            //alert('Event booked');
            var amount = parseInt(eventBookingJsonObj.amountInToken);
            var x = user.availableToken - amount;
            var y = x - item.purchaseAmount;
            user.availableToken = y;
        }
        localStorage.removeItem("stored_eventBooking");

        //Update User Balance
        updateUserBalance(user);
    }

    function updateUserBalance(user) {
        dbUser.orderByChild("id").equalTo(user.id).once("child_added", function (snapshot) {
            snapshot.ref().update(user);
        })
    }


    self.balance = 'R' + user.availableToken;

    self.buyToken = function (item) {
        var key = dbAcc.ref().push().key();
        dbAcc.push({
            "Price": item.amount(),
            "surname": user.surname,
            "userId": user.id,
            "id": key,
            "DateAdded": new Date()
        });

        self.isAdded(ko.observable(true));
        var int = parseInt(item.amount());
        var amount = int + user.availableToken;
        user.availableToken = amount;
        self.amount(null);
        updateUserBalance(user);
    }
    dbEvent.on("child_added", GetEvents);
    function GetEvents(item) {
        var tempE = item.val();
        tempEvents.push(tempE);
    }

    db1.on("child_added", GetBookedEvents);
    function GetBookedEvents(item) {
        var bookedEvent = item.val();
        if (bookedEvent.userId == user.id) {

            tempEvents.forEach(function (event) {
                if (event.id == bookedEvent.eventId) {
                    event.id = bookedEvent.id;
                    self.events.push(event);
                }
            })
        }
    }


    self.editUserProfileWithItem(user);

    self.updateUserInfo = function (user) {

        //update user
        updateUserBalance(user);
        alert('user details updated');
        self.editUserProfileWithItem(ko.observable(null));
    }


    self.cancelTicket = function (item) {
        //remove ticket booked
        cancelUserEvent(item);
        //alert('inside cancel');
    }

    function cancelUserEvent(item) {
        db1.orderByChild("id").equalTo(item.id).once("child_added", function (snapshot) {
            snapshot.ref().remove();
        })
    }

    self.customerProfileManagement = function () {
        window.location.href = "customerEditProfile.html";
    }
    self.customerEventManagement = function () {
        window.location.href = "customerEventView.html";
    }
    self.customerAccountManagement = function () {
        window.location.href = "customerAccountManagement.html";
    }
    self.logOut = function () {
        window.location.href = "index.html";
    }
}