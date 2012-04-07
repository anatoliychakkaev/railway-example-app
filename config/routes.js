exports.routes = function (map) {
    map.resources('books', function (book) {
        book.resources('chapters');
    });

    // Generic routes. Add all your routes below this line
    // feel free to remove generic routes
    map.all(':controller/:action');
    map.all(':controller/:action/:id');
};
