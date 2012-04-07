require('../test_helper.js').controller('chapters', module.exports);

var sinon  = require('sinon');

function ValidAttributes () {
    return {
        title: ''
    };
}

exports['chapters controller'] = {

    'GET new': function (test) {
        test.get('/chapters/new', function () {
            test.success();
            test.render('new');
            test.render('form.' + app.set('view engine'));
            test.done();
        });
    },

    'GET index': function (test) {
        test.get('/chapters', function () {
            test.success();
            test.render('index');
            test.done();
        });
    },

    'GET edit': function (test) {
        var find = Chapter.find;
        Chapter.find = sinon.spy(function (id, callback) {
            callback(null, new Chapter);
        });
        test.get('/chapters/42/edit', function () {
            test.ok(Chapter.find.calledWith('42'));
            Chapter.find = find;
            test.success();
            test.render('edit');
            test.done();
        });
    },

    'GET show': function (test) {
        var find = Chapter.find;
        Chapter.find = sinon.spy(function (id, callback) {
            callback(null, new Chapter);
        });
        test.get('/chapters/42', function (req, res) {
            test.ok(Chapter.find.calledWith('42'));
            Chapter.find = find;
            test.success();
            test.render('show');
            test.done();
        });
    },

    'POST create': function (test) {
        var chapter = new ValidAttributes;
        var create = Chapter.create;
        Chapter.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, chapter);
            callback(null, chapter);
        });
        test.post('/chapters', {Chapter: chapter}, function () {
            test.redirect('/chapters');
            test.flash('info');
            test.done();
        });
    },

    'POST create fail': function (test) {
        var chapter = new ValidAttributes;
        var create = Chapter.create;
        Chapter.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, chapter);
            callback(new Error, null);
        });
        test.post('/chapters', {Chapter: chapter}, function () {
            test.success();
            test.render('new');
            test.flash('error');
            test.done();
        });
    },

    'PUT update': function (test) {
        Chapter.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(null); }});
        });
        test.put('/chapters/1', new ValidAttributes, function () {
            test.redirect('/chapters/1');
            test.flash('info');
            test.done();
        });
    },

    'PUT update fail': function (test) {
        Chapter.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(new Error); }});
        });
        test.put('/chapters/1', new ValidAttributes, function () {
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

