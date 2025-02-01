import mongoose, {Schema} from "mongoose";


const interviewSchema = new mongoose.Schema({
  interview_id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
  },
  companyType: {
    type: String,
    required: true,
  },
  resume: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true
  },
  duration: {
    type: Number, // Duration in minutes
    required: true,
  },
  notes: {
    type: String,
  },
  interviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interviewer',
  },
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['Requested', 'Scheduled', 'Completed'],
    default: 'Requested',
  },
  feedback: {
    type: String,
  },
  score: {
    type: Number,
    min: 0,
    max: 100,
  },
}, { timestamps: true });

export default mongoose.model('Interviews', interviewSchema);
