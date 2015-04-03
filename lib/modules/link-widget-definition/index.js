module.exports = {
  extend: 'apostrophe-widget-definition',
  label: 'Link',
  schema: [
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
