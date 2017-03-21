function loginvm() {
    var self = this;
    var db = new Firebase("https://fun-time-9c827.firebaseio.com/User");
  
    self.Email = ko.observable();
    self.Password = ko.observable();
    self.isAuth = false;

    self.loginRedirect = function () {
        window.location.href = "logIn.html";
    };
    self.registerRedirect = function () {
        window.location.href = "register.html";
    };
    
    self.SignIn = function (item) {
        self.Password = ko.observable(item.Password());
        self.Email = ko.observable(item.Email());
        db.on("child_added", GetUsers);
    };

    function GetUsers(data) {
        var user = data.val();
        if (user.email === self.Email() && user.password === self.Password()) {
            var isAuth = true;
            if (user.userType == 'Customer') {
                localStorage.setItem("stored_user", JSON.stringify(user));
                window.location.href = "home.html";

            }
            if (user.userType == 'Owner') {
                localStorage.setItem("stored_user", JSON.stringify(user));
                window.location.href = "owner.html";
            }
            if (user.userType == 'Artist') {
                localStorage.setItem("stored_user", JSON.stringify(user));
                window.location.href = "artist.html";
            }
            
        }
    }



}