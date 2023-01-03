$(".alert").css("opacity", 0)
toggleFavourite = function (type, id, name) {
    favourites = JSON.parse(localStorage.getItem(type + '_favourites'));
    console.log(favourites)
    id = parseInt(id)
    if (localStorage.getItem(type + '_favourites')) {
        var index = favourites.findIndex(function(favourite) {
            return favourite[0] === id && favourite[1] === name;
          });
        console.log(index)
        if (index > -1) {
            // Remove the item from the favourites list
            favourites.splice(index, 1);
        } else {
            // Add the item to the favourites list
            favourites.push([id, name]);
        }
    } else {
        // Add the item to the favourites list
        favourites.push([id, name]);
    }
    $('#favourite_' + id).toggleClass('favourite')

    console.log(favourites)
    // Update the local storage
    localStorage.setItem(type + '_favourites', JSON.stringify(favourites))
    console.log('Toggled Favourite ' + type + ' with Id = ' + id + ' and Name = ' + name);
};


typeToPage = {'Athletes': 'atleta.html?id=', 'Countries': 'pais.html?id=', 'Modalities': 'profile#modalities', 'Events': 'evento.html?id='}

types = ['Athletes', 'Countries', 'Modalities', 'Events']
favourites = []

//for each type, get ids from localStorage type + "_favourites" and store the favourites in different arrays
for (var i = 0; i < types.length; i++) {
    var type = types[i];
    console.log(type)
    var ids = JSON.parse(localStorage.getItem(type + "_favourites"));
    if (ids) {
        for (var j = 0; j < ids.length; j++) {
            var favourite = ids[j];
            console.log(favourite);
            [id, nome] = favourite
            console.log(type, id, nome)
            $('#' + type + "_table").append('<tr><td><a class=\'text-decoration-none\' href="/' + typeToPage[type] + id + '">' + nome + '</a></td><td><a class=\'text-decoration-none\' href="/' + typeToPage[type] + id + '">' + id + '</a></td><td style=\'position:relative;cursor:pointer;\'><a class=\'text-white\' onclick="toggleFavourite(\'' + type + '\',\'' + id + '\',\'' + nome + '\')" id="favourite_' + id + '"><i class="fa-solid fa-trash-can"></i></a><a class=\'text-decoration-none\' href="/' + typeToPage[type] + id + '"><i class=\'fa-solid fa-eye text-white\' style=\'position:absolute; right:50px;\'></i></a></td></tr>')
        }
    }
}


$("#reloadFavoritos").click(function() {
    for (var i = 0; i < types.length; i++) {
        var type = types[i];
        $('#' + type + "_table").empty();
        var ids = JSON.parse(localStorage.getItem(type + "_favourites"));
        if (ids) {
            for (var j = 0; j < ids.length; j++) {
                var favourite = ids[j];
                [id, nome] = favourite
                $('#' + type + "_table").append('<tr><td><a class=\'text-decoration-none\' href="/' + typeToPage[type] + id + '">' + nome + '</a></td><td><a class=\'text-decoration-none\' href="/' + typeToPage[type] + id + '">' + id + '</a></td><td style=\'position:relative;\'><a class=\'text-white\' onclick="toggleFavourite(\'' + type + '\',\'' + id + '\',\'' + nome + '\')" id="favourite_' + id + '"><i class="fa-solid fa-trash-can"></i></a><a class=\'text-decoration-none\' href="/' + typeToPage[type] + id + '"><i class=\'fa-solid fa-eye text-white\' style=\'position:absolute; right:50px;\'></i></a></td></tr>')
            }
        }
    }
    onToggleMode()

    $(".alert").animate({opacity: 1}, 100)
    setTimeout(function() {
        $(".alert").css("opacity", 0)
    }, 1000);
      console.log("Reloaded favourites")
});

    
