module.exports = {
  groups: [
    {
      title: 'guest',
      permissions: [ ]
    },
    {
      title: 'admin',
      permissions: [ 'admin' ]
    }
  ],
  
  addFields: [
    {
      name: '_blogPosts',
      type: 'joinByOneReverse',
      withType: 'apostrophe-blog',
      idField: 'userId',
      label: 'Author',
    },
    {
      name: 'thumbnail',
      type: 'singleton',
      widgetType: 'apostrophe-images',
      label: 'Picture',
      options: {
        limit: 1,
        aspectRatio: [100,100]
      },
    }
  ]
};
