var moment = require('moment');

module.exports = {
  
  contexual: true,
  
  addFields: [
    {
      name: '_author',
      label: 'Author',
      type: 'joinByOne',
      withType: 'apostrophe-user',
      idField: 'userId',
    }
  ]
  
};
