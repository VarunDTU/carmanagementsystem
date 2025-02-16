import mongoose from 'mongoose';

const insightSchema = new mongoose.Schema({
  carId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"cars",
    required:true
  },
  marketInsights:{
    type:String,
    required:true
  },
  popularFeatures:{
    type:String,
    required:true
  },
  recommendations:{
    type:String,
    required:true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

// Update the updatedAt timestamp before saving
insightSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export const Insight = mongoose.model('Insight', insightSchema);
