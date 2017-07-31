function accountManagent() {
    var self = this;
    self.isAdded  = ko.observable();
    var dbAcc = new Firebase("https://fun-time-9c827.firebaseio.com/Account");
    var dbUser = new Firebase("https://fun-time-9c827.firebaseio.com/User");
    var user = JSON.parse(localStorage.getItem("stored_user"));
    self.amount = ko.observable();

    if (user.availableToken != undefined || user.availableToken != null) {
        self.balance = 'R' + user.availableToken;
    }
   

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
        if (user.availableToken != undefined || user.availableToken != null) {
            var xx = parseInt(user.availableToken);
            var yy = parseInt(item.amount);
            var x =  xx+ yy;
            user.availableToken = x;
        }
        else {
            user.availableToken = 0;
        }
        self.amount(null);
        updateUserBalance(user);
       
    }

    function updateUserBalance(user) {
        dbUser.orderByChild("id").equalTo(user.id).once("child_added", function (snapshot) {
            snapshot.ref().update(user);
        })
    }


    self.registerBusiness = function () {
        window.location.href = "owner.html";
    }
    self.alcoholManagement = function () {
        window.location.href = "alcoholOwner.html";
    }

    self.specialsManagement = function () {
        window.location.href = "specials.html";
    }
    self.employeeManagement = function () {
        window.location.href = "employeeManagement.html";
    }

    self.logOut = function () {
        window.location.href = "index.html";
    }
}