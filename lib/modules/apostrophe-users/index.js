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
      name: 'thumbnail',
      type: 'singleton',
      widgetType: 'apostrophe-images',
      label: 'Picture',
      options: {
        limit: 1,
        aspectRatio: [100,100]
      }
    } 
  ]
};
