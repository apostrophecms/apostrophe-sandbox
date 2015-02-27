module.exports = {
  aposName: 'apostrophe-people',
  addFields: [
    {
      name: '_blogPosts',
      type: 'joinByOneReverse',
      withType: 'blogPost',
      idField: 'authorId',
      label: 'Author',
      withJoins: [ '_editor' ]
    },
    {
      name: 'thumbnail',
      type: 'singleton',
      widgetType: 'slideshow',
      label: 'Picture',
      options: {
        aspectRatio: [100,100]
      }
    }
  ]
};