module.exports = {
  extend: 'apostrophe-widgets',
  label: 'Link',
  addFields: [
    {
      type: 'url',
      name: 'url',
      label: 'URL'
    },
    {
      type: 'string',
      name: 'label',
      label: 'Label'
    }
  ]
};
