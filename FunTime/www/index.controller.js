function IdViewModel() {
    var self = this;
    self.base = 'app/components/';
    var db = new Firebase("https://fun-time-9c827.firebaseio.com/Business");
    self.businesses = ko.observableArray([]);
    self.selected = ko.observable({});

    init();

    function init() {

    }

    db.on("child_added", GetBusinesses);

    function GetBusinesses(data) {
        var business = data.val();
        self.businesses.push(business);
    };

    var loginRedirect = function () {
        window.location.href = "logIn.html";
    }

    self.select = function (item) {
        self.selected(item);
    };

   





}