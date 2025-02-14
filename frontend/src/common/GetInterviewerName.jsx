import axios from "axios";

export const getInterviewerName = async (interviewer_id) => {
    if (!interviewer_id) return "";

    try {
        const { data } = await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-interviewer-username", { interviewer_id });
        return data.personal_info.username;
    } catch (error) {
        console.log("Error fetching interviewer name:", error);
        return "Unknown";
    }
};

export const getCandidateName = async (candidate_id) => {
    if (!candidate_id) return "";

    try {
        const { data } = await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-candidate-username", { candidate_id });
        return data.personal_info.username;        
    } catch (error) {
        console.log("Error fetching candidate name:", error);
        return "Unknown";   
    }
};