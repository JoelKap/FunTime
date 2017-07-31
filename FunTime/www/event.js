function eventModel() {
    var self = this;
    self.base = 'app/components/';
    var db = new Firebase("https://fun-time-9c827.firebaseio.com/Event");
    var dbUser = new Firebase("https://fun-time-9c827.firebaseio.com/User");
    var db1 = new Firebase("https://fun-time-9c827.firebaseio.com/BookedTicket");
    var eventId = 0;
    self.events = ko.observableArray([]);
    self.selected = ko.observable({});
    self.email = ko.observable();
    self.firstName = ko.observable();
    self.surname = ko.observable();
    var selectedClubJsonObj = JSON.parse(localStorage.getItem('selected_club'));

    db.on("child_added", GetEvents);

    function GetEvents(data) {
        var event = data.val();
        if (selectedClubJsonObj.id === event.businessId) {
            self.events.push(event);
        }        
    };

    self.bookTicket = function (item) {
        localStorage.setItem("stored_eventBooking", JSON.stringify(item));
        window.location.href = "logIn.html";
        //eventId = item.id;
        //self.selected(item);
    }

    self.payTicket = function (item) {
       
        dbUser.on("child_added", GetUsers);
    }

    function GetUsers(data) {
        var user = data.val();
        if (user.email === self.email()) {
            var key = db1.ref().push().key();
            db1.push({
                "eventId": eventId, //self.selected.id(),
                "firstName": self.firstName(),
                "surname": self.surname(),
                "userId": user.id,
                "id": key,
            });
            $("#myModal .close").click();
        }
    }


    self.loginRedirect = function () {
        window.location.href = "logIn.html";
    }

    self.registerRedirect = function () {
        window.location.href = "register.html";
    }
}