import './Right.css';
import React,{ useState , useEffect} from 'react';

function Right() {

  const[FormData,setFormData]=useState({
    name:"",
    email:"",
    password:""
  });
  const[Skillset,setSkillset]=useState([]);
  const[isDisabled,setisDisabled]=useState(false);
  const[Message,setMessage]=useState(
    "Try it free 7 days then ₹180/mo. thereafter"
  );
  const handleChange=(e)=>{
    setFormData({...FormData,[e.target.name]:e.target.value});
  };
  const handleSkill=(e)=>{
    const skill = e.target.value;
    e.target.value = "Choose your skills";
    if (skill && !Skillset.includes(skill)) {
      setSkillset((prevSkills) => [...prevSkills,skill]);
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkillset((prevSkills) =>
      prevSkills.filter((skill) => skill !== skillToRemove)
    );
  };

  const isFormSubmit = () => {
    if (FormData.name && FormData.email && FormData.password && Skillset.length > 0) 
      return true;
    return false;
  };

  const claimYourTrial=(e)=>{
      e.preventDefault();
      if (!isFormSubmit()) {
      return;
      }
    setFormData({
      name:"",
      email:"",
      password:""
    });
    setSkillset([]);
    setisDisabled(true);
    setMessage("You have successfully subscribed to our plan");
  };

  const claim=(e)=>{
    e.preventDefault();
    if(isDisabled)
    return claimYourTrial;
    return;
  }

  useEffect(()=>{
    setisDisabled(isFormSubmit());
  },[FormData,Skillset]);

  return(
    <div className="form" onSubmit={claimYourTrial}>
      <div className="form-header">{Message}</div>
      <form className="form-body">
        <input type="text" name="name" placeholder="Name" value={FormData.name} onChange={handleChange} required/>
        <input type="email" name="email" placeholder="Email Address" value={FormData.email} onChange={handleChange} required/>
        <input type="password" name="password" placeholder="Password" value={FormData.password} onChange={handleChange} required/>
        <select name="skills" className="form-selectSkillSet" onChange={handleSkill}>
          <option value="Choose your skills">Choose your skills</option>
          <option value="HTML">HTML</option>
          <option value="CSS">CSS</option>
          <option value="JS">JS</option>
          <option value="REACT">REACT</option>
        </select>

        {Skillset && (
          <div className="form-skillset">
            {Skillset.map((skill) => {
              return (
                <div key="skill" className="form-skillTag">
                  {skill} &nbsp;
                  <span onClick={() => handleRemoveSkill(skill)}>x</span>
                </div>
              );
            })}
          </div>
        )}

        <button type="submit" className={`${isDisabled ? "form-ButtonActive" : "form-ButtonInactive"}`}>
          CLAIM YOUR FREE TRIAL
        </button>

        <div className="form-note">
          By clicking the button you are agreeing to our{" "}
          <span>Terms and Services</span>
        </div>
      </form>
    </div>
  );
}

export default Right