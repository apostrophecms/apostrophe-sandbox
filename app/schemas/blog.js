module.exports = {
  aposName: 'apostrophe-blog-2',
  perPage: 5,
  pieces: {
    addFields: [
      {
        name: '_author',
        type: 'joinByOne',
        withType: 'person',
        idField: 'authorId',
        label: 'Author'
      }
    ]
  }
};