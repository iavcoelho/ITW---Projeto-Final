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
        self.baseURL = "http://192.168.160.58/Olympics/api/Games/FullDetails?id=";
        self.id = getUrlParameter('id')
        self.medals = ko.observableArray([])
        self.Name = ko.observable()
        self.CountryName = ko.observable()
        self.City = ko.observable()
        self.Athletes = ko.observableArray([])
        self.Modalities = ko.observableArray([])
        self.Competitions = ko.observableArray([])
        self.Photo = ko.observable()
        self.Medals = ko.observableArray([])
        var countries = []
        var gold = []
        var silver = []
        var bronze = []
        $.ajax({
            url: self.baseURL + self.id,
            type: "GET",
            dataType: "JSON",
            data: JSON.stringify({}),
            success: function (data) {
                console.log(data)
                self.Name(data.Name)
                self.CountryName(data.CountryName)
                self.City(data.City)
                self.Athletes(data.Athletes)
                self.Modalities(data.Modalities)
                self.Competitions(data.Competitions)
                self.Photo(data.Photo)
            },
            complete: function () {
                console.log("complete")
                hideLoader()
                self.medals().forEach(medal => {
                    countries.push(medal.CountryName)
                    gold.push(medal.Medals[0].Counter)
                    silver.push(medal.Medals[1].Counter)
                    bronze.push(medal.Medals[2].Counter)
                });

                console.log(countries)
                $("#medalGraph").css("min-height", countries.length * 50 + "px")

                var ctx = document.getElementById('medalGraph');
                var medals = new Chart(ctx, {
                    type: 'horizontalBar',
                    data: {
                        labels: countries,
                        datasets: [{
                            label: 'Gold',
                            data: gold,
                            backgroundColor: 'rgba(255,215,0,0.75)',
                            borderColor: 'rgb(255,215,0)',
                            borderWidth: 1
                        },
                        {
                            label: 'Silver',
                            data: silver,
                            backgroundColor: 'rgba(192,192,192, 0.75)',
                            borderColor: 'rgb(192,192,192)',
                            borderWidth: 1
                        },
                        {
                            label: 'Bronze',
                            data: bronze,
                            backgroundColor: 'rgba(218,165,32,0.75)',
                            borderColor: 'rgb(218,165,32)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        maintainAspectRatio: false,
                        scales: {
                            yAxes: [{
                                barPercentage: 1,
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }
                });

            }

        })

        $.ajax({
            url: "http://192.168.160.58/Olympics/api/Statistics/Medals_Country?id=" + self.id,
            type: "GET",
            dataType: "JSON",
            data: JSON.stringify({}),
            success: function (data) {
                self.medals(data)
            }
        })

    }
    ko.applyBindings(new VM());
})



