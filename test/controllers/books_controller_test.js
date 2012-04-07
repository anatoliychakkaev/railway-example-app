require('../test_helper.js').controller('books', module.exports);

var sinon  = require('sinon');

function ValidAttributes () {
    return {
        name: ''
    };
}

exports['books controller'] = {

    'GET new': function (test) {
        test.get('/books/new', function () {
            test.success();
            test.render('new');
            test.render('form.' + app.set('view engine'));
            test.done();
        });
    },

    'GET index': function (test) {
        test.get('/books', function () {
            test.success();
            test.render('index');
            test.done();
        });
    },

    'GET edit': function (test) {
        var find = Book.find;
        Book.find = sinon.spy(function (id, callback) {
            callback(null, new Book);
        });
        test.get('/books/42/edit', function () {
            test.ok(Book.find.calledWith('42'));
            Book.find = find;
            test.success();
            test.render('edit');
            test.done();
        });
    },

    'GET show': function (test) {
        var find = Book.find;
        Book.find = sinon.spy(function (id, callback) {
            callback(null, new Book);
        });
        test.get('/books/42', function (req, res) {
            test.ok(Book.find.calledWith('42'));
            Book.find = find;
            test.success();
            test.render('show');
            test.done();
        });
    },

    'POST create': function (test) {
        var book = new ValidAttributes;
        var create = Book.create;
        Book.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, book);
            callback(null, book);
        });
        test.post('/books', {Book: book}, function () {
            test.redirect('/books');
            test.flash('info');
            test.done();
        });
    },

    'POST create fail': function (test) {
        var book = new ValidAttributes;
        var create = Book.create;
        Book.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, book);
            callback(new Error, null);
        });
        test.post('/books', {Book: book}, function () {
            test.success();
            test.render('new');
            test.flash('error');
            test.done();
        });
    },

    'PUT update': function (test) {
        Book.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(null); }});
        });
        test.put('/books/1', new ValidAttributes, function () {
            test.redirect('/books/1');
            test.flash('info');
            test.done();
        });
    },

    'PUT update fail': function (test) {
        Book.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(new Error); }});
        });
        test.put('/books/1', new ValidAttributes, function () {
            test.success();
            test.render('edit');
            test.flash('error');
            test.done();
        });
    },

    'DELETE destroy': function (test) {
        test.done();
    },

    'DELETE destroy fail': function (test) {
        test.done();
    }
};

