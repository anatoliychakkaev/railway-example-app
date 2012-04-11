exports.routes = function (map) {
    map.root('books#index');
    map.resources('books', function (book) {
        book.resources('chapters');
    });
};
