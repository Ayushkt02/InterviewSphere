import mongoose, {Schema} from "mongoose";

const candidateSchema = mongoose.Schema({

    personal_info: {
        fullname: {
            type: String,
            lowercase: true,
            required: true,
            minlength: [3, 'fullname must be 3 letters long'],
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: [6, 'password should be atleast 6 characters long']
        },
        username: {
            type: String,
            minlength: [3, 'Username must be 3 letters long'],
            unique: true,
        }
    },
    social_links: {
        linkedin: {
            type: String,
            default: "",
        },
        github: {
            type: String,
            default: "",
        },
        leetcode: {
            type: String,
            default: "",
        },
        codeforces: {
            type: String,
            default: "",
        },
        codechef: {
            type: String,
            default: "",
        },
        website: {
            type: String,
            default: "",
        }
    },
    account_info:{
        total_interviews: {
            type: Number,
            default: 0
        },
        avg_score: {
            type: Number,
            default: 0
        },
    },
    interviews: {
        type: [ Schema.Types.ObjectId ],
        ref: 'interviews',
        default: [],
    }

}, 
{ 
    timestamps: {
        createdAt: 'joinedAt'
    } 

})

export default mongoose.model("candidates", candidateSchema);