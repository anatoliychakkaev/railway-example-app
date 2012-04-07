load('application');

before(loadBook, {only: ['show', 'edit', 'update', 'destroy']});

action('new', function () {
    this.title = 'New book';
    this.book = new Book;
    render();
});

action(function create() {
    Book.create(req.body.Book, function (err, book) {
        if (err) {
            flash('error', 'Book can not be created');
            render('new', {
                book: book,
                title: 'New book'
            });
        } else {
            flash('info', 'Book created');
            redirect(path_to.books);
        }
    });
});

action(function index() {
    this.title = 'Books index';
    Book.all(function (err, books) {
        render({
            books: books
        });
    });
});

action(function show() {
    this.title = 'Book show';
    render();
});

action(function edit() {
    this.title = 'Book edit';
    render();
});

action(function update() {
    this.book.updateAttributes(body.Book, function (err) {
        if (!err) {
            flash('info', 'Book updated');
            redirect(path_to.book(this.book));
        } else {
            flash('error', 'Book can not be updated');
            this.title = 'Edit book details';
            render('edit');
        }
    }.bind(this));
});

action(function destroy() {
    this.book.destroy(function (error) {
        if (error) {
            flash('error', 'Can not destroy book');
        } else {
            flash('info', 'Book successfully removed');
        }
        send("'" + path_to.books + "'");
    });
});

function loadBook() {
    Book.find(params.id, function (err, book) {
        if (err) {
            redirect(path_to.books);
        } else {
            this.book = book;
            next();
        }
    }.bind(this));
}
