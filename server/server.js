import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';
import jwt from 'jsonwebtoken';
import cors from 'cors';

const server = express();
let PORT = 3000;

server.use(express.json());
server.use(cors());

mongoose.connect(process.env.DB_LOCATION, {
    autoIndex: true
});

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

import Candidate from './Schema/Candidate.js';
import Interview from './Schema/Interview.js';

const generateUsername = async (email) => {
    let username = email.split("@")[0];
    let isUsernameUnique = await Candidate.exists({"personal_info.username": username}).then((res) => res)

    isUsernameUnique ? username += nanoid().substring(0, 5) : "";
    return username;
}

const formatDatatoSend = (candidate) => {
    const access_token = jwt.sign({ id: candidate._id }, process.env.SECRET_ACCESS_KEY)
    return {
        access_token,
        username: candidate.personal_info.username,
        fullname: candidate.personal_info.fullname,
        avg_score: candidate.account_info.avg_score,
        total_interviews: candidate.account_info.total_interviews,
    }
}

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if(token == null){
        return res.status(401).json({ error: "No access token" });
    }
    
    jwt.verify(token, process.env.SECRET_ACCESS_KEY, (err, user) => {
        if(err){
            return res.status(403).json({ error: "Access token is invalid" })
        }
        req.user = user.id;
        next();
    })
}


server.post("/join-candidate/signup", (req, res) => {
    let { fullname, email, password } = req.body;

    if(fullname.length < 3){
        return res.status(403).json({ "error" : "FullName must be atleast 3 letters long" })
    }
    if(email.length==0){
        return res.status(403).json({ "error": "Enter Email" })
    }
    if(!emailRegex.test(email)){
        return res.status(403).json({ "error": "Email is invalid"})
    }
    if(!passwordRegex.test(password)){
        return res.status(403).json({ "error": "password should be 6 to 20 character long with a numeric, 1 lowercase and 1 uppercase"})
    }

    bcrypt.hash(password, 10, async (err, hashed_password)=>{
        let username = await generateUsername(email);

        let candidate = new Candidate({
            personal_info: { fullname, email, password: hashed_password, username }
        })

        candidate.save().then((u) => {
            return res.status(200).json(formatDatatoSend(u));
        })
        .catch((err) => {
            if(err.code == 11000){
                return res.status(500).json({"error": "Email already exists"});
            }
            return res.status(500).json({"error": err.message})
        })
    })
});

server.post("/join-candidate/signin", (req, res)=>{
    let { email, password } = req.body;

    Candidate.findOne({ "personal_info.email": email })
    .then((candidate) => {
        if(!candidate){
            return res.status(403).json({ "error": "email not found" })
        }
        bcrypt.compare(password, candidate.personal_info.password, (err, result) => {
            if(err){
                return res.status(403).json({ "error": "Error occured while login please try again" })
            }

            if(!result){
                return res.status(403).json({ "error": "incorrect password" })
            }else{
                return res.status(200).json(formatDatatoSend(candidate));
            }
        })
    })
    .catch((err)=>{
        return res.status(500).json({ "error": err.message })
    })
})

server.post('/interview-request', verifyJWT, (req, res) => {

    let candidateId = req.user;
    let { title, companyType, resume, date, time, duration, notes, id } = req.body;

    if(!title.length){
        return res.status(403).json({ error: "You must provide a title" });
    }
    if(!companyType.length){
        return res.status(403).json({ error: "You must provide company type" });
    }
    if(!resume.length){
        return res.status(403).json({ error: "You must provide a resume" });
    }
    if(!date.length){
        return res.status(403).json({ error: "You must provide a date" });
    }
    if(!time.length){
        return res.status(403).json({ error: "You must provide a time" });
    }
    if(!duration.length){
        return res.status(403).json({ error: "You must provide a duration" });
    }

    let interview_id = id || title.replace(/[^a-zA-Z0-9]/g, ' ').replace(/\s+/g, "-").trim() + nanoid();

    let interview = new Interview({
        title, companyType, resume, date, time, duration, notes, candidate: candidateId, interview_id
    })
    interview.save().then(interview => {
        Candidate.findOneAndUpdate({ _id: candidateId }, { $push: { "interviews": interview._id } }, { $inc : { "account_info.total_interviews": 1 } })
        .then(user => {
            return res.status(200).json({ id: interview.interview_id });
        })
        .catch(err => {
            return res.status(500).json({ error: "Failed to update total interview number" });
        })
    })
    .catch(err => {
        return res.status(500).json({ error: err.message });
    })
})

server.post('/all-interviews', verifyJWT, (req, res) => {
    let candidate_id = req.user;
    let { status } = req.body;
    Interview.find({status, candidate: candidate_id})
    .sort({ updatedAt: -1 })
    .select("interview_id title companyType duration")
    .then(interviews => {
        return res.status(200).json({ interviews });
    })
    .catch(err => {
        return res.status(500).json({ error: err.message });
    })
})

server.post("/get-interview", (req, res) => {
    let { interview_id } = req.body;
    Interview.findOne({ interview_id })
    .select("title companyType resume date time duration notes interviewer status createdAt interview_id -_id")
    .then(interview => {
        return res.status(200).json({ interview });
    })
    .catch(err => {
        return res.status(500).json({error: err.message})
    })
})

server.post('/get-candidate-profile', (req, res) => {

    let { username } = req.body;

    Candidate.findOne({ "personal_info.username": username })
    .select("-personal_info.password -google_auth, -updatedAt -interviews")
    .then(candidate => {
        return res.status(200).json(candidate)
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({ error: err.message });
    })
})

server.post("/delete-interview", verifyJWT, (req, res) => {
    let { interview_id } = req.body;

    Interview.findOneAndDelete({ interview_id })
    .then(blog => {
        return res.status(200).json({ status: 'done' });
    })
    .catch(err => {
        console.log(err.message);
        return res.status(500).json({ error: err.message });
    })
})


server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
})

