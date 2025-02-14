// import React, { useContext, useEffect, useRef, useState } from 'react'
// import { InterviewerContext, UserContext } from '../App';
// import { Toaster } from 'react-hot-toast';
// import axios from 'axios';

// const profileDataStructure = {
//     personal_info: {
//       fullname: "",
//       username: "",
//       email: ""
//     },
//     account_info: {
//       total_interviews: 0,
//       avg_score: 0,
//       avg_rating: 0
//     },
//     social_links: {},
//     professional_info: {
//       company: "",
//       position: "",
//       yearOfExperience: 0
//     },
//     joinedAt: ""
//   };

// function EditProfile() {
//     const { userAuth } = useContext(UserContext);
//     const { interviewerAuth } = useContext(InterviewerContext);
//     let editProfileForm = useRef();

//     const [ profile, setProfile ] = useState(profileDataStructure);
//     const [ loading, setLoading ] = useState(true);

//     const username = userAuth?.username || interviewerAuth?.username || "";
//     const access_token = userAuth?.access_token || interviewerAuth?.access_token || "";
//     const isInterviewer = interviewerAuth.username ? true : false;
//     const endpoint = isInterviewer ? '/get-interviewer-profile' : '/get-candidate-profile';

//     useEffect(()=>{
//         if(access_token){
//             axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}${endpoint}`, { username: username })
//             .then(({ data }) => {
//                 setProfile(data);
//                 setLoading(false);
//             })
//             .catch(err => {
//                 console.log(err);
//             })
//         }
//     }, [access_token])

//     let { personal_info: { fullname, profile_img, email}, social_links} = profile;


//     const handleSubmit = (e) => {
//         e.preventDefault();

//         let form = new FormData(editProfileForm.current);
//         let formData = { };
//         for(let [key, value] of form.entries()){
//             formData[key] = value;
//         }

//         let { username, bio, youtube, facebook, twitter, github, instagram, website } = formData;

//         if(username.length < 3){
//             return toast.error("Username should be atleast 3 letters long");
//         }
//         if(username.includes(" ")){
//             return toast.error("Username should not contain space");
//         }
//         if(bio.length > bioLimit){
//             return toast.error(`Bio should not be more than ${bioLimit}`);
//         }

//         let loadingToast = toast.loading("Updating...");
//         e.target.setAttribute("disabled", true);

//         axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/update-profile", {
//             username, bio, 
//             social_links: { youtube, facebook, twitter, github, instagram, website }
//         },{
//             headers:{
//                 'Authorization': `Bearer ${access_token}`
//             }
//         })
//         .then(({data}) => {
//             if(userAuth.username != data.username){
//                 let newUserAuth = { ...userAuth, username: data.username };

//                 storeInSession("user", JSON.stringify(newUserAuth));
//                 setUserAuth(newUserAuth);
//             }

//             toast.dismiss(loadingToast);
//             e.target.removeAttribute("disabled");
//             toast.success("Profile Updated Successfully...");
//         })
//         .catch(({response}) => {
//             toast.dismiss(loadingToast);
//             e.target.removeAttribute("disabled");
//             toast.error(response.data.error);
//         })
//     }

//     return (
//         <form ref={editProfileForm}>
//             <Toaster/>

//             <h1 className="max-md:hidden">Edit Profile</h1>
//             <div className="flex flex-col lg:flex-row items-start py-10 gap-8 lg:gap-10">
//                 <div className="w-full">
//                     <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5">
//                         <div>
//                             <input type="text" name="fullname" defaultValue={fullname} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black" placeholder="Full Name" disabled />
//                         </div>
//                         <div>
//                             <input type="email" name="email" defaultValue={email} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black" placeholder="Email" disabled />
//                         </div>
//                     </div>
//                     <input type="text" name="username" defaultValue={username} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black" placeholder="Username" />

//                     <p className="text-dark-grey -mt-3">Username will use to search user and will be visible to all user</p>

//                     <p className="my-6 text-dark-grey">Add your social handles below</p>

//                     <div className="md:grid md:grid-cols-2 gap-x-6">
//                         {
//                             Object.keys(social_links).map((key, i) => {
//                                 let link = social_links[key];
//                                 return <input key={i} name={key} type="text" value={link} placeholder="https://" icon={"fi " + (key != 'website' ? "fi-brands-"+key : "fi-rr-globe")}/>
//                             })
//                         }
//                     </div>

//                     <button className="btn-dark w-auto px-10" type="submit" onClick={handleSubmit} >Update</button>

//                 </div>

//             </div>
//         </form>
//     )
// }

// export default EditProfile

// import React, { useContext, useEffect, useRef, useState } from 'react';
// import { InterviewerContext, UserContext } from '../App';
// import { Toaster, toast } from 'react-hot-toast';
// import axios from 'axios';

// const profileDataStructure = {
//   personal_info: {
//     fullname: "",
//     username: "",
//     email: "",
//   },
//   account_info: {
//     total_interviews: 0,
//     avg_score: 0,
//     avg_rating: 0,
//   },
//   social_links: {
//     linkedin: "",
//     github: "",
//     website: "",
//     leetcode: "",
//     codeforces: "",
//     codechef: "",
//   },
//   professional_info: {
//     company: "",
//     position: "",
//     yearOfExperience: 0,
//   },
//   joinedAt: "",
// };

// function EditProfile() {
//   const { userAuth, setUserAuth } = useContext(UserContext);
//   const { interviewerAuth } = useContext(InterviewerContext);
//   let editProfileForm = useRef();

//   const [profile, setProfile] = useState(profileDataStructure);
//   const [loading, setLoading] = useState(true);

//   const username = userAuth?.username || interviewerAuth?.username || "";
//   const access_token = userAuth?.access_token || interviewerAuth?.access_token || "";
//   const isInterviewer = interviewerAuth.username ? true : false;
//   const endpoint = isInterviewer ? '/get-interviewer-profile' : '/get-candidate-profile';

//   useEffect(() => {
//     if (access_token) {
//       axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}${endpoint}`, { username })
//         .then(({ data }) => {
//           setProfile(data);
//           setLoading(false);
//         })
//         .catch(err => {
//           console.log(err);
//         });
//     }
//   }, [access_token]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     let form = new FormData(editProfileForm.current);
//     let formData = {};
//     for (let [key, value] of form.entries()) {
//       formData[key] = value;
//     }

//     if (formData.username.length < 3 || formData.username.includes(" ")) {
//       return toast.error("Username must be at least 3 characters long and not contain spaces");
//     }

//     let loadingToast = toast.loading("Updating...");
//     e.target.setAttribute("disabled", true);

//     axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}/update-profile`, {
//       username: formData.username,
//       social_links: {
//         linkedin: formData.linkedin,
//         github: formData.github,
//         website: formData.website,
//         leetcode: formData.leetcode,
//         codeforces: formData.codeforces,
//         codechef: formData.codechef,
//       },
//       professional_info: isInterviewer ? {
//         company: formData.company,
//         position: formData.position,
//         yearOfExperience: formData.yearOfExperience,
//       } : undefined,
//     }, {
//       headers: {
//         'Authorization': `Bearer ${access_token}`
//       }
//     })
//       .then(({ data }) => {
//         if (userAuth.username !== data.username) {
//           setUserAuth({ ...userAuth, username: data.username });
//         }
//         toast.dismiss(loadingToast);
//         e.target.removeAttribute("disabled");
//         toast.success("Profile Updated Successfully");
//       })
//       .catch(({ response }) => {
//         toast.dismiss(loadingToast);
//         e.target.removeAttribute("disabled");
//         toast.error(response.data.error);
//       });
//   };

//   return (
//     <form ref={editProfileForm} onSubmit={handleSubmit} className="bg-black text-white p-6 rounded-lg w-full max-w-lg mx-auto">
//       <Toaster />
//       <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
//       <div className="flex flex-col gap-3">
//         <input className="p-2 rounded bg-gray-800 text-white" type="text" name="fullname" defaultValue={profile.personal_info.fullname} disabled />
//         <input className="p-2 rounded bg-gray-800 text-white" type="email" name="email" defaultValue={profile.personal_info.email} disabled />
//         <input className="p-2 rounded bg-gray-800 text-white" type="text" name="username" defaultValue={username} required />
//       </div>

//       <p className="mt-4 text-gray-400">Add your social handles below</p>
//       {Object.keys(profile.social_links).map((key, i) => (
//         <input key={i} name={key} type="text" defaultValue={profile.social_links[key]} placeholder={key} className="p-2 rounded bg-gray-800 text-white w-full mt-2" />
//       ))}

//       {isInterviewer && (
//         <>
//           <input className="p-2 rounded bg-gray-800 text-white w-full mt-2" type="text" name="company" defaultValue={profile.professional_info.company} placeholder="Company" />
//           <input className="p-2 rounded bg-gray-800 text-white w-full mt-2" type="text" name="position" defaultValue={profile.professional_info.position} placeholder="Position" />
//           <input className="p-2 rounded bg-gray-800 text-white w-full mt-2" type="number" name="yearOfExperience" defaultValue={profile.professional_info.yearOfExperience} placeholder="Years of Experience" />
//         </>
//       )}

//       <button className="bg-white text-black p-2 rounded mt-4 w-full font-semibold hover:bg-gray-300" type="submit">Update</button>
//     </form>
//   );
// }

// export default EditProfile;


import React, { useContext, useEffect, useRef, useState } from 'react';
import { InterviewerContext, UserContext } from '../App';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';

const profileDataStructure = {
  personal_info: {
    fullname: "",
    username: "",
    email: "",
  },
  account_info: {
    total_interviews: 0,
    avg_score: 0,
    avg_rating: 0,
  },
  social_links: {
    linkedin: "",
    github: "",
    website: "",
    leetcode: "",
    codeforces: "",
    codechef: "",
  },
  professional_info: {
    company: "",
    position: "",
    yearOfExperience: 0,
  },
  joinedAt: "",
};

function EditProfile() {
  const { userAuth, setUserAuth } = useContext(UserContext);
  const { interviewerAuth } = useContext(InterviewerContext);
  let editProfileForm = useRef();

  const [profile, setProfile] = useState(profileDataStructure);
  const [loading, setLoading] = useState(true);

  const username = userAuth?.username || interviewerAuth?.username || "";
  const access_token = userAuth?.access_token || interviewerAuth?.access_token || "";
  const isInterviewer = interviewerAuth.username ? true : false;
  const endpoint = isInterviewer ? '/get-interviewer-profile' : '/get-candidate-profile';

  useEffect(() => {
    if (access_token) {
      axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}${endpoint}`, { username })
        .then(({ data }) => {
          setProfile(data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [access_token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let form = new FormData(editProfileForm.current);
    let formData = {};
    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }

    if (formData.username.length < 3 || formData.username.includes(" ")) {
      return toast.error("Username must be at least 3 characters long and not contain spaces");
    }

    let loadingToast = toast.loading("Updating...");
    e.target.setAttribute("disabled", true);

    axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}/update-profile`, {
      username: formData.username,
      social_links: {
        linkedin: formData.linkedin,
        github: formData.github,
        website: formData.website,
        leetcode: formData.leetcode,
        codeforces: formData.codeforces,
        codechef: formData.codechef,
      },
      professional_info: isInterviewer ? {
        company: formData.company,
        position: formData.position,
        yearOfExperience: formData.yearOfExperience,
      } : undefined,
    }, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    })
      .then(({ data }) => {
        if (userAuth.username !== data.username) {
          setUserAuth({ ...userAuth, username: data.username });
        }
        toast.dismiss(loadingToast);
        e.target.removeAttribute("disabled");
        toast.success("Profile Updated Successfully");
      })
      .catch(({ response }) => {
        toast.dismiss(loadingToast);
        e.target.removeAttribute("disabled");
        toast.error(response.data.error);
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-300 text-gray-800 p-6">
      <form ref={editProfileForm} onSubmit={handleSubmit} className=" text-white p-6 rounded-lg w-full max-w-4xl">
        <Toaster />
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Edit Profile</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <p className='text-gray-900'>Full Name</p>
                <input className="p-3 rounded bg-gray-800 text-white w-full" type="text" name="fullname" defaultValue={profile.personal_info.fullname} disabled />
            </div>
            <div>
                <p className='text-gray-900'>Email</p>
                <input className="p-3 rounded bg-gray-800 text-white w-full" type="email" name="email" defaultValue={profile.personal_info.email} disabled />
            </div>
            <div>
                <p className='text-gray-900'>Username</p>
                <input className="p-3 rounded bg-gray-800 text-white w-full" type="text" name="username" defaultValue={username} required />
            </div>
        </div>

        <p className="mt-6 text-gray-900">Add your social handles below</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          {Object.keys(profile.social_links).map((key, i) => (
            <div>
                <p className='text-gray-900'>{key}</p>
                <input key={i} name={key} type="text" defaultValue={profile.social_links[key]} placeholder="https://" className="p-3 rounded bg-gray-800 text-white w-full" />
            </div>
          ))}
        </div>

        {isInterviewer && (
            <>
            <p className='mt-6 text-gray-900'>Professional Details</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                    <p className='text-gray-900'>Company</p>
                    <input className="p-3 rounded bg-gray-800 text-white w-full" type="text" name="company" defaultValue={profile.professional_info.company} placeholder="Company" />
                </div>
                <div>
                    <p className='text-gray-900'>Position</p>
                    <input className="p-3 rounded bg-gray-800 text-white w-full" type="text" name="position" defaultValue={profile.professional_info.position} placeholder="Position" />
                </div>
                <div>
                    <p className='text-gray-900'>Year of Experience</p>
                    <input className="p-3 rounded bg-gray-800 text-white w-full" type="number" name="yearOfExperience" defaultValue={profile.professional_info.yearOfExperience} placeholder="Years of Experience" />
                </div>
            </div>
            </>
        )}

        <button className="bg-gray-500 text-black p-3 rounded mt-6 w-full font-semibold hover:bg-black hover:text-white" type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditProfile;
