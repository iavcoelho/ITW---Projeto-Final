$(document).ready(function () {
    searchModal = function modal(id) {
        var myModal = new bootstrap.Modal(document.getElementById('modal'))
        baseURL = "http://192.168.160.58/Olympics/api/Modalities";
        $.ajax({
            url: baseURL + "/FullDetails?id=" + id.id,
            type: "GET",
            dataType: "JSON",
            data: JSON.stringify({}),
            success: function (data) {
                $("#modalLabel").text(data.Name)
                $("#modalImage").attr("src", data.Photo)
                $("#modalID").text("ID: " + data.Id)
                $("#modalDetails").attr("href", "modalidades.html?id=" + data.Id)
                $("#modalFavourite").click(function () {
                    toggleFavourite('Modalities', data.Id, data.Name)
                    $("#modalFavouriteIcon").toggleClass('favourite')
                })
                myModal.show()
            }
        })
}

$('#modal').on('hidden.bs.modal', function () {
    location.reload();
   })
    function VM() {
        var self = this;
        self.baseURL = "http://192.168.160.58/Olympics/api/Modalities";
        self.records = ko.observableArray([]);
        self.currentPage = ko.observable($(location).attr('search'));
        self.pageSize = ko.observable(15);
        self.totalRecords = ko.observable(50);
        self.totalPages = ko.observable(0);
        self.hasPrevious = ko.observable(false);
        self.hasNext = ko.observable(false);
        self.id = ko.observable(1);
        self.favourites = ko.observableArray([]);

        self.currentPage().includes("?page=") ? self.currentPage() : self.currentPage("?page=1")

        self.previousPage = ko.computed(function () {
            return self.currentPage() - 1;
        }, self);
        
        self.nextPage = ko.computed(function () {
            return self.currentPage() + 1;
        }, self);

        self.fromRecord = ko.computed(function () {
            return self.previousPage() * self.pageSize() + 1;
        }, self);

        self.toRecord = ko.computed(function () {
            return Math.min(self.currentPage() * self.pageSize(), self.totalRecords());
        }, self);

        self.pageArray = function () {
            var list = [];
            var size = Math.min(self.totalPages(), 9);
            var step;
            if (size < 9 || self.currentPage() === 1)
                step = 0;
            else if (self.currentPage() >= self.totalPages() - 4)
                step = self.totalPages() - 9;
            else
                step = Math.max(self.currentPage() - 5, 0);
    
            for (var i = 1; i <= size; i++)
                list.push(i + step);
            return list;
        };

        toggleFavourite = function (type, id, name) {
            id = parseInt(id)
            // Check if the item is already in the favourites list
            if (localStorage.getItem(type + '_favourites')) {
                var favourite = self.favourites().find(function(favourite) {
                  return favourite[0] === id && favourite[1] === name;
                });
                var index = self.favourites().indexOf(favourite);            
                if (index > -1) {
                  // Remove the item from the favourites list
                  self.favourites.splice(index, 1);
                } else {
                  // Add the item to the favourites list
                  self.favourites.push([id, name]);
                }
              } else {
                // Add the item to the favourites list
                self.favourites.push([id, name]);
              }
            $('#favourite_' + id).toggleClass('favourite')

            // Update the local storage
            localStorage.setItem(type + '_favourites', JSON.stringify(self.favourites()));
            console.log('Toggled Favourite ' + type + ' with Id = ' + id + ' and Name = ' + name);
        };

                //Ajax call to get the data from the api
        $.ajax({
            url: self.baseURL + self.currentPage() + "&pagesize=" + self.pageSize(),
            type: "GET",
            dataType: "JSON",
            data: JSON.stringify({ }),
            success: function (data) {
                //store the data 
                self.records(data.Records)
                self.totalRecords(data.TotalRecords)
                self.totalPages(data.TotalPages)
                self.currentPage(data.CurrentPage)
                self.pageSize(data.PageSize)
                self.hasNext(data.HasNext)
                self.hasPrevious(data.HasPrevious)
                console.log(data)
            },
            complete: function () {
                self.favourites(JSON.parse(localStorage.getItem('Modalities_favourites')) || []);
                self.favourites().forEach(function (element) {
                    console.log(element)
                    $('#favourite' + element).addClass('favourite')
                });
                hideLoader();
            }
        }),
        meuModal = function modal(id) {
            var myModal = new bootstrap.Modal(document.getElementById('modal'))
            $.ajax({
                url: self.baseURL + "/FullDetails?id=" + id.Id,
                type: "GET",
                dataType: "JSON",
                data: JSON.stringify({}),
                success: function (data) {
                    console.log(data)
                    $("#modalLabel").text(data.Name)
                    $("#modalImage").attr("src", data.Photo)
                    $("#modalID").text("ID: " + data.Id)
                    $("#modalDetails").attr("href", "modalidades.html?id=" + data.Id)
                    $("#modalFavourite").click(function () {
                        toggleFavourite('Modalities', data.Id, data.Name)
                        $("#modalFavouriteIcon").toggleClass('favourite')
                    })
                    console.log(data.Modalities)
                    for (let element of data.Modalities) {
                        $("#modalTable").append("<div class=\"border rounded d-inline-block mr-2 mb-1 p-1 text-decoration-none link-info\">" + element.Name + "</div>")
                        
                      }
                      
                    myModal.show()
                }
            })
        }
        $("#searchbar").autocomplete({
            minLength: 2,            
            source: function (request, response) {
                $.ajax({
                    url: self.baseURL + "/SearchByName?q=" + request.term,
                    type: "GET",
                    dataType: "JSON",
                    data: JSON.stringify({}),
                    success: function (data) {
                        response($.map(data, function (item) {
                            return {
                                label: item.Name,
                                value: item.Name,
                                id: item.Id
                            }
                        }).slice(0, 10));
                    }
                })
            },
            select: function(event, ui) {
                searchModal(ui.item)
            }
        })
    }
    ko.applyBindings(new VM())
})