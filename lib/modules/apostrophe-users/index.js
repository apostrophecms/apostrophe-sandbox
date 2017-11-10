module.exports = {
  groups: [
    {
      title: 'guest',
      // Allows viewing of pages marked "Login Required"
      permissions: [ 'guest' ]
    },
    {
      title: 'edit',
      permissions: [ 'edit' ]
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
  ],

  // A hack just for the demo: block all edits of the admin account, so users don't
  // block each other from using the demo for a day. -Tom and Greg

  construct: function(self, options) {
    var superTrash = self.trash;
    self.trash = function(req, id, callback) {
      return self.find(req, { _id: id }).toObject(function(err, person) {
        if (err) {
          return callback(err);
        }
        // if (person && (person.username === 'admin')) {
        //   return callback(new Error('Reserved'));
        // }
        return superTrash(req, id, callback);
      });
    };
    var superBeforeUpdate = self.beforeUpdate;
    self.beforeUpdate = function(req, piece, options, callback) {
      return self.find(req, { _id: piece._id }).toObject(function(err, person) {
        if (err) {
          return callback(err);
        }
        // if (person && (person.username === 'admin')) {
        //   return callback(new Error('Reserved'));
        // }
        return superBeforeUpdate(req, piece, options, callback);
      });
    };
   }
};
