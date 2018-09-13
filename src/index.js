/**
 * es6 modules and imports
 */
import sayHello from './hello';

sayHello('World');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');

getMovies().then((movies) => {
    console.log('Here are all the movies:');
    movies.forEach(({title, rating, id}) => {
        console.log(`id#${id} - ${title} - rating: ${rating}`);
    });
}).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.')
    console.log(error);
});


function renderMovies() {
    getMovies().then((movies) => {
        $("#listOfMovies").empty();
        movies.forEach(({title, rating, id}) => {
            var movieDetails = "<tr data-id='" + id + "'>";
            movieDetails += "<td>" + title + "</td>";
            movieDetails += "<td>" + rating + "</td>";
            movieDetails += "<td>" + "<button type='button' class='btn btn-outline-success editMovie'>" + "Edit" + "</button>" + " " +
                "<button type='button' class='btn btn-outline-warning deleteMovie'>" + "Delete" + "</button>" + "</td";
            movieDetails += "</tr>";
            $("#listOfMovies").append(movieDetails)
        });
    });
}

// lists all the movies in the collection
renderMovies();


// adding a movie after "add my movie button" is clicked
$("#addMovie").click(function () {
    var data = {
        title: $('#title-input').val(),
        rating: $('.form-check-input:checked').val()
    };
    console.log(data);
    $.post('/api/movies', data, function (data) {
        console.log(data);
        renderMovies();
    });
});


// delete movies from the collection
$(document).ready(function() {

    $(document).on("click", ".deleteMovie", function () {
        
        var clicked = $(this).closest('tr');
        var id = clicked.data('id');

        console.log(clicked);
        $.ajax(`/api/movies/${id}`, {
            method: 'DELETE',
            success: function(data) {
                console.log(data)
            }
        });
        renderMovies();
    });


    // activate edit button
    $(document).on("click", ".editMovie", function () {
        var tr = $(this).closest('tr');
        var id = tr.data('id');
        var title =  tr.children().first().text();
        var rating = $(tr.children()[1]).text();

        console.log(tr);
        console.log(id);
        console.log(rating);

        $('#title-edit').val(title);
        // $('')
        
    })

});




