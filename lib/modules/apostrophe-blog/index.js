var moment = require('moment');

module.exports = {
  
  contextual: true,
  
  addFields: [
    {
      name: '_author',
      label: 'Author',
      type: 'joinByOne',
      withType: 'apostrophe-user',
      idField: 'userId',
    },
    {
      name: '_related',
      label: 'Related',
      type: 'joinByArray',
      withType: 'apostrophe-blog',
      idsField: 'relatedIds',
    },
  ]
  
};
