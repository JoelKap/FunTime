function specialViewModel() {
    var self = this;
    self.base = 'app/components/';
    var db = new Firebase("https://fun-time-9c827.firebaseio.com/Special");
    self.specials = ko.observableArray([]);
    self.selected = ko.observable({});
    var selectedClubJsonObj = JSON.parse(localStorage.getItem('selected_club'));
    self.hasSpecials = false;

    db.on("child_added", GetSpecials);



    function GetSpecials(data) {
        var special = data.val();
        if (selectedClubJsonObj.id === special.businessId) {
            self.hasSpecials = true;
            self.specials.push(special);
        }
    };

    self.downloadSpecial = function (item) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", item.file);
        xhr.responseType = "arraybuffer";

        xhr.onload = function () {
            if (this.status === 200) {
                var blob = new Blob([xhr.response], { type: "application/pdf" });
                var objectUrl = URL.createObjectURL(blob);
                window.open(objectUrl);
            }
        };
        xhr.send();
    }

    self.loginRedirect = function () {
        window.location.href = "logIn.html";
    }

    self.registerRedirect = function () {
        window.location.href = "register.html";
    }
}