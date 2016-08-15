var moment = require('moment');

module.exports = {
  contextual: false,
  addFields: [
    {
      name: '_author',
      type: 'joinByOne',
      withType: 'apostrophe-user',
      idField: 'userId',
      label: 'Author'
    }
  ]
};
