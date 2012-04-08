load('application');

before(loadBook);
before(loadChapter, {only: ['show', 'edit', 'update', 'destroy']});

action('new', function () {
    this.title = 'New chapter';
    this.chapter = new Chapter;
    render();
});

action(function create() {
    this.book.chapters.create(req.body.Chapter, function (err, chapter) {
        if (err) {
            flash('error', 'Chapter can not be created');
            render('new', {
                chapter: chapter,
                title: 'New chapter'
            });
        } else {
            flash('info', 'Chapter created');
            redirect(path_to.book_chapters(params.book_id));
        }
    });
});

action(function index() {
    this.title = 'Chapters index';
    this.book.chapters(function (err, chapters) {
        render({
            chapters: chapters
        });
    });
});

action(function show() {
    this.title = 'Chapter show';
    render();
});

action(function edit() {
    this.title = 'Chapter edit';
    render();
});

action(function update() {
    this.chapter.updateAttributes(body.Chapter, function (err) {
        if (!err) {
            flash('info', 'Chapter updated');
            redirect(path_to.book_chapter(params.book_id, this.chapter));
        } else {
            flash('error', 'Chapter can not be updated');
            this.title = 'Edit chapter details';
            render('edit');
        }
    }.bind(this));
});

action(function destroy() {
    this.chapter.destroy(function (error) {
        if (error) {
            flash('error', 'Can not destroy chapter');
        } else {
            flash('info', 'Chapter successfully removed');
        }
        send("'" + path_to.book_chapters(params.book_id) + "'");
    });
});

function loadBook() {
    Book.find(params.book_id, function (err, book) {
        this.book = book;
        next();
    }.bind(this));
}

function loadChapter() {
    this.book.chapters.find(params.id, function (err, chapter) {
        if (err) {
            redirect(path_to.book_chapters(params.book_id));
        } else {
            this.chapter = chapter;
            next();
        }
    }.bind(this));
}
