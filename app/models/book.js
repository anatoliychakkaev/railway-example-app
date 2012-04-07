Book.hasMany(Chapter, {as: 'chapters', foreignKey: 'bookId'});
