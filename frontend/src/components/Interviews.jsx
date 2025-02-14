import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import InterviewCard from './InterviewCard'; // Assuming you have an InterviewCard component
import { InterviewerContext, UserContext } from '../App';
 
const Interviews = ({ type, interviewer }) => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // if(interviewer){
  //   const {interviewerAuth, interviewerAuth:{access_token}, setInterviewerAuth} = useContext(InterviewerContext);
  // }else{
  //   const { userAuth, userAuth: { access_token }, setUserAuth } = useContext(UserContext);
  // }

  const authContext = interviewer ? useContext(InterviewerContext) : useContext(UserContext);
  const access_token = authContext?.interviewerAuth?.access_token || authContext?.userAuth?.access_token;

  const getInterviews = () => {
    setLoading(true);
    setError(null);
    axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/candidate-interviews", {
      status: type
    },{
        headers:{
            'Authorization': `Bearer ${access_token}`
        }
    })
    .then( async ({data})=>{
      setLoading(false);
      setInterviews(data.interviews)
    })
    .catch(err => {
        setLoading(false);
        setError(err.message || "Something went wrong");
        console.log(err);
    })
  }

  const getAllInterviews = () => {
    setLoading(true);
    setError(null);
    axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/all-interviews", {
      status: type
    },{
      headers:{
          'Authorization': `Bearer ${access_token}`
      }
    })
    .then( async ({data})=>{
      setLoading(false);
      setInterviews(data.interviews)
    })
    .catch(err => {
        setLoading(false);
        setError(err.message || "Something went wrong");
        console.log(err);
    })
  }

  useEffect(()=>{
    if(access_token){
      if(interviewer){
        getAllInterviews()
      }else{
        getInterviews()
      }
    }
  },[access_token,type])

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {interviews.map((interview) => (
        <InterviewCard
          key={interview.interview_id}
          title={interview.title}
          companyType={interview.companyType}
          duration={interview.duration}
          content={interview.interview_id}
        />
      ))}
    </div>
  );
};

export default Interviews;