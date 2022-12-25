$(document).ready(function () {

    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
    
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
    
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
        return false;
    };

    function VM() {
        var self = this;
        self.baseURL = "http://192.168.160.58/Olympics/api/Countries/";
        self.id = getUrlParameter('id')
        console.log(self.id)
        self.data = ko.observable()
        self.Organizer = ko.observableArray([])
        self.Events = ko.observableArray([])
        self.Participant = ko.observableArray([])
        self.Flag = ko.observable()
        self.Name = ko.observable()
        self.Id = ko.observable()
        self.IOC = ko.observable()
        $.ajax({
            url: self.baseURL + self.id,
            type: "GET",
            dataType : "JSON",
            data: JSON.stringify({}),
            success: function (data) {
                //store the data 
                self.data(data)
                self.Organizer(data.Organizer)
                self.Events(data.Events)
                self.Participant(data.Participant)
                self.Flag(data.Flag)
                self.Id(data.Id)
                self.Name(data.Name)
                self.IOC(data.IOC)
                console.log(self.data())
            },
            complete: function () {
                console.log("complete")
                hideLoader()
            }

        })
    }
    ko.applyBindings(new VM());
})