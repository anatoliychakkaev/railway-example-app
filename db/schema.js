define('User', function () {
    property('email', String, { index: true });
    property('password', String);
    property('activated', Boolean, {default: false});
});

var Book = describe('Book', function () {
    property('name', String);
});

var Chapter = describe('Chapter', function () {
    property('title', String);
    property('updatedAt', Date);
});

