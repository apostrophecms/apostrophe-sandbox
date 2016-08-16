module.exports = {
  extend: 'apostrophe-widgets',
  label: 'Two Column Block',
  contextualOnly: true,
  addFields: [
    {
      type: 'area',
      name: 'left',
      label: 'Left',
      contextual: true,
    },
    {
      type: 'area',
      name: 'right',
      label: 'Right',
      contextual: true,
    }
  ]
};
