const { Schema, model } = require('mongoose');
// const assignmentSchema = require('./Assignment');

// Schema to create User model
const usersSchema = new Schema(
    {
        username: {
          type: String,
          required: true,
          unique: true,
          trim: true
        },
        email: {
          type: String,
          required: true,
          unique: true,
          match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
        },
        thoughts: [{
          type: Schema.Types.ObjectId,
          ref: 'Thoughts'
        }],

        friends: [{
          // Array of _id values referencing the Users model (self-reference)
          type: Schema.Types.ObjectId,
          ref: 'Users'
        }],
        // assignments: [assignmentSchema],
      },
      {
        toJSON: {
          getters: true,
          virtuals: true,
        },
      
      }

);

//get total count of friends
usersSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const Users = model('users', usersSchema);

module.exports = Users;