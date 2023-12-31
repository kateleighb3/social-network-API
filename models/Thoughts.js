const { Schema, model, Types } = require('mongoose');
// const moment = require('moment');

// ReactionsSchema
const reactionsSchema = new Schema(
  {
  // Set custom ID 
  reactionId: {
      type: Schema.Types.ObjectId,
      default: ()=> new Types.ObjectId()
  },
  reactionBody: {
      type: String,
      required: true,
      maxlength: 280
  },
  username: {
      type: String,
      required: true
  },
  createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
  }
  },
  {
  toJSON: {
      getters: true
  } 
  }
);

// thoughtsSchema
const thoughtsSchema = new Schema(
  {
  thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
  },
  createdAt: {
      type: Date,
      default: Date.now,
      // Moment
      get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
  },
  username: {
      type: String,
      required: true
  },
  // Use reactionsSchema to validate data
  reactions: [reactionsSchema]
  },
  {
  toJSON: {
      virtuals: true,
      getters: true
  },
  id: false
  }
)

// get total count of reactions
thoughtsSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

// create the Thoughts model using the Thoughts Schema
const Thoughts = model('thoughts', thoughtsSchema);

// Export Thoughts Module
module.exports = Thoughts;