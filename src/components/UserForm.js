import React, { useState, useEffect } from "react";
import PasswordStrengthBar from "react-password-strength-bar";

export default function UserForm(props) {
  const seeking = ["Internship", "Remote", "FT Position", "not seeking"];
  const fieldOfInterests = ["Frontend", "Backend", "Full Stack"];
  const locatedCity = [
    "Delhi",
    "Noida",
    "Gurugram",
    "Banglore",
    "Hyderabad",
    "Lucknow",
  ];
  const techStacks = [
    "HTML/CSS",
    "JavaScript",
    "ReactJS",
    "Ruby",
    "Swift",
    "GoLang",
    "C++",
    "NodeJS",
    "MySql",
    "PostgreSQL",
    "mongoDB",
  ];
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [DG, setDG] = useState("");
  const [GitHubLink, setGitHubLink] = useState("");
  const [WebsiteLink, setWebsiteLink] = useState("");
  const [City, setCity] = useState("");
  const [Text, setText] = useState("");
  const [ID, setID] = useState("");
  const [SelectedImage, setSelectedImage] = useState(null);
  const [FieldOfInterest, setFieldOfInterest] = useState("Field Of Interest");
  const [Seeking, setSeeking] = useState([]);
  const [TechStack, setTechStack] = useState([]);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [NameValidated, setNameValidated] = useState(true);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleDGChange = (e) => {
    setDG(e.target.value);
  };
  const handleGitHubLinkChange = (e) => {
    setGitHubLink(e.target.value);
  };
  const handleWebsiteLinkChange = (e) => {
    setWebsiteLink(e.target.value);
  };
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };
  const handleTextChange = (e) => {
    setText(e.target.value);
  };
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };
  const handleFieldOfInterest = (e) => {
    setFieldOfInterest(e.target.value);
  };
  const handleTechStack = (e) => {
    if (TechStack.includes(e.target.value)) {
      setTechStack(TechStack.filter((item) => item !== e.target.value));
    } else {
      setTechStack([...TechStack, e.target.value]);
    }
    console.log(TechStack);
  };
  const handleSeeking = (e) => {
    if (Seeking.includes(e.target.value)) {
      setSeeking(Seeking.filter((item) => item !== e.target.value));
    } else {
      setSeeking([...Seeking, e.target.value]);
    }
    console.log(Seeking);
  };
  useEffect(() => {
    fetch("https://backend-4ezs.onrender.com/students")
      .then((resp) => resp.json())
      .then((data) => {
        setID(data[data.length - 1].id);
      });
  }, []);
  const validateFormData = () => {
    if (Name.length > 2) {
      setNameValidated(true);
      if (Password.length > 8 && Password === ConfirmPassword) {
        setPasswordsMatch(true);
        submitForm();
      } else {
        setPasswordsMatch(false);
      }
    } else {
      setNameValidated(false);
    }
  };
  const submitForm = (e) => {
    
    fetch("https://backend-4ezs.onrender.com/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: ID + 1,
        name: Name,
        email: Email,
        password: Password,
        github: GitHubLink,
        website: WebsiteLink,
        location: City,
        bio: Text,
        image: SelectedImage,
        fieldOfInterest: FieldOfInterest,
        seeking: Seeking,
        techStack: TechStack,
      }),
    })
      .then((response) => {
        response.json()
        alert("Form Created")
      }
      )
      .catch((error) => console.error(error));
  };
  return (
    <div className="userForm-detail mx-1 my-5">
      <div className="userFrom-detail1">
        <h1 id="userForm-heading">Academic Student Sign Up</h1>
        <div className="user-detail1-child1 my-3">
          <div className="userForm-Name">
            <label htmlFor="name">Name:</label>
            <input
              id="text"
              type="text"
              placeholder="name text"
              required
              value={Name}
              onChange={handleNameChange}
            />
          </div>

          <div className="form-check form-switch mx-5">
            <label htmlFor="flexSwitchCheckedDefault">Hireable</label>
            <input
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckedDefault"
            />
          </div>
        </div>
        {!NameValidated && (
          <p style={{ color: "red" }}>Name should be of atleast 3 characters</p>
        )}
        <div className="userForm-Email">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="Email"
            placeholder="xyz@gmail.com"
            required
            value={Email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="userForm-Password my-3">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="Password"
            placeholder="password"
            required
            value={Password}
            onChange={handlePasswordChange}
          />
        </div>

        <div className="userForm-ConfirmPassword my-1">
          <label htmlFor="confirm password">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="confirm password"
            required
            value={ConfirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        {!passwordsMatch && (
          <p style={{ color: "red" }}>Password do not Matched</p>
        )}
        <PasswordStrengthBar password={Password} />
        <div className="userForm-DG">
          <label htmlFor="Date of Graduation">Date of Graduation:</label>
          <input
            type="date"
            id="DG"
            required
            value={DG}
            onChange={handleDGChange}
          />
        </div>
        <div className="userForm-GitHub my-3">
          <label htmlFor="GitHub">GitHub:</label>
          <input
            type="text"
            id="GitHub"
            placeholder="username"
            value={GitHubLink}
            onChange={handleGitHubLinkChange}
          />
        </div>
        <div className="user-detail1-child2">
          <div className="userForm-Website">
            <label htmlFor="Website">Website:</label>
            <input
              type="text"
              id="Website"
              placeholder="URL"
              value={WebsiteLink}
              onChange={handleWebsiteLinkChange}
            />
          </div>
          <div className="location mx-5">
            <label htmlFor="location">Location:</label>
            <select className="city" onClick={handleCityChange} required>
              <option value="Choose a City">Choose a City</option>
              {locatedCity.map((city) => {
                return <option value={city}>{city}</option>;
              })}
            </select>
          </div>
        </div>
        <div className="user-bio my-3">
          <label htmlFor="Bio">Bio:</label>
          <input
            type="textbox"
            id="bio"
            placeholder="Free textfield"
            onChange={handleTextChange}
          ></input>
        </div>
      </div>
      <div className="vertical-line"></div>
      <div className="userFrom-detail2">
        <div className="userForm-Profile my-3">
          <div className="profile">
            <label htmlFor="Profile">Upload Profile Pic:</label>
            <input type="file" onChange={handleImage} />
          </div>
          <div className="profile-preview">
            {SelectedImage && (
              <img src={SelectedImage} width="100" height="100" />
            )}
          </div>
        </div>
        <div className="Field-of-Interest">
          <label htmlFor="Field of Interest">Field of Interest:</label>
          <select
            className="field-of-Interest"
            onChange={handleFieldOfInterest}
          >
            <option value="Field Of Interest">Security</option>
            {fieldOfInterests.map((fieldOfInterest) => {
              return <option value={fieldOfInterest}>{fieldOfInterest}</option>;
            })}
          </select>
        </div>
        <div className="seeking my-4">
          <label htmlFor="seeking">Seeking:</label>
          <select
            multiple
            size={seeking.length}
            id="seeking-option"
            onChange={handleSeeking}
          >
            {seeking.map((seeking) => {
              return <option value={seeking}>{seeking}</option>;
            })}
          </select>
        </div>
        <div className="techStack">
          <label htmlFor="seeking">Tech Stack:</label>
          <select multiple id="techStack-option" onChange={handleTechStack}>
            {techStacks.map((techStack) => {
              return <option value={techStack}>{techStack}</option>;
            })}
          </select>
        </div>
        <div className="submitForm">
          <button id="submitForm" onClick={validateFormData}>
            {" "}
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
