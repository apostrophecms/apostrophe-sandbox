module.exports = {
  extend: 'apostrophe-widgets',
  label: 'Block',
  addFields: [
    {
      name: 'title',
      label: 'Title',
      type: 'string'
    },
    {
      type: 'area',
      name: 'body',
      contextual: true
      // let the template supply the options
    }
  ]
}
