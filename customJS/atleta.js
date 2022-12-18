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
        self.baseURL = "http://192.168.160.58/Olympics/api/Athletes/FullDetails?id=";
        self.id = getUrlParameter('id')
        self.data = ko.observable()
        self.Name = ko.observable('')
        self.ImageURL = ko.observable('')
        self.BornDate = ko.observable('')
        self.BornPlace = ko.observable('')
        self.DiedPlace = ko.observable('')
        self.DiedDate = ko.observable('')
        self.Height = ko.observable('')
        self.Link = ko.observable('')
        self.Sex = ko.observable('')
        self.Weight = ko.observable('')
        self.Competitions = ko.observableArray([])
        self.Games = ko.observableArray([])
        self.Medals = ko.observableArray([])
        self.Modalities = ko.observableArray([])
        $.ajax({
            url: self.baseURL + self.id,
            type: "GET",
            dataType : "JSON",
            data: JSON.stringify({}),
            success: function (data) {
                self.data(data)
                self.Name(data.Name)
                self.ImageURL(data.Photo)
                self.BornDate(data.BornDate)
                self.BornPlace(data.BornPlace)
                self.DiedPlace(data.DiedPlace)
                self.DiedDate(data.DiedDate)
                self.Height(data.Height)
                self.Link(data.OlympediaLink)
                self.Sex(data.Sex)
                self.Weight(data.Weight)
                self.Competitions(data.Competitions)
                self.Games(data.Games)
                self.Medals(data.Medals)
                self.Modalities(data.Modalities)
                console.log(self.data)
            }

        })
    }
    ko.applyBindings(new VM());
})
