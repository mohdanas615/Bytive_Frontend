import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Header(props) {
  const fieldOfInterests = ["Frontend", "Backend", "Full Stack"];
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
  const location = useLocation();
  const [data, setData] = useState([]);
  const [SearchKeyword, setSearchKeyword] = useState(
    location.state ? location.state.SearchKeyword : ""
  );
  const [TechStack, setTechStack] = useState("Tech Stack");
  const [FieldOfInterest, setFieldOfInterest] = useState("Field Of Interest");
  const [filteredData, setFilteredData] = useState([]);

  const handleSearchKeywordChange = (e) => {
    setSearchKeyword(e.target.value);
  };
  const handleTechStack = (e) => {
    console.log(e.target.value);
    setTechStack(e.target.value);
  };
  const handleSearchButton = (e) => {
    filterTheData();
  };
  const handleFieldOfInterest = (e) => {
    setFieldOfInterest(e.target.value);
    console.log(FieldOfInterest);
  };

  useEffect(() => {
    filterTheData();
  }, [TechStack, FieldOfInterest]);

  function filterTheData() {
    var results = [];
    var searchKeywordMatched = false;
    var FieldOfInterestMatched = false;
    var TechStackMatched = false;
    for (var i = 0; i < data.length; i++) {
      searchKeywordMatched = false;
      FieldOfInterestMatched = false;
      TechStackMatched = false;
      if (SearchKeyword !== "") {
        if (data[i].name.toLowerCase().includes(SearchKeyword.toLowerCase())) {
          searchKeywordMatched = true;
        }
      } else {
        searchKeywordMatched = true;
      }

      if (FieldOfInterest.localeCompare("Field Of Interest") !== 0) {
        if (
          data[i].fieldOfInterest &&
          data[i].fieldOfInterest.toLowerCase() ===
            FieldOfInterest.toLowerCase()
        ) {
          FieldOfInterestMatched = true;
        }
      } else {
        FieldOfInterestMatched = true;
      }
      if (TechStack.localeCompare("Tech Stack") !== 0) {
        if (data[i].techStack) {
          for (var j = 0; j < data[i].techStack.length; j++) {
            if (
              data[i].techStack[j].toLowerCase() === TechStack.toLowerCase()
            ) {
              TechStackMatched = true;
            }
          }
        }
      } else {
        TechStackMatched = true;
      }
      if (searchKeywordMatched && FieldOfInterestMatched && TechStackMatched)
        results.push(data[i]);
    }

    setFilteredData(results);
  }
  useEffect(() => {
    fetch("https://backend-4ezs.onrender.com/students")
      .then((resp) => resp.json())
      .then((data) => {
        setData(data);
        setFilteredData(data);
      });
  }, []);

  return (
    <>
      <div className="temp mx-5 my-3">Sort by</div>
      <div className="sort-family">
        <div className="sort1">
          <select
            className="form-select form-select-lg mb-3 mx-5 w-20"
            aria-label=".form-select-lg example"
            onChange={handleFieldOfInterest}
          >
            <option value="Field Of Interest">Field Of Interest</option>
            {fieldOfInterests.map((fieldOfInterest) => {
              return <option value={fieldOfInterest}>{fieldOfInterest}</option>;
            })}
          </select>
        </div>
        <div className="sort2">
          <select
            className="form-select form-select-lg mb-3 mx-5 w-20"
            aria-label=".form-select-lg example"
            onChange={handleTechStack}
          >
            <option value="Tech Stack">Tech Stack</option>
            {techStacks.map((techStack) => {
              return <option value={techStack}>{techStack}</option>;
            })}
          </select>
        </div>
        <div className="sort3 mx-5">
          <form action="/action_page.php">
            <label htmlFor="birthday">Sort by Cohort</label>
            <input type="date" id="birthday" name="birthday" />
          </form>
        </div>
        <form>
          <fieldset className="search-with-button">
            <legend>Search by Keyword</legend>
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={SearchKeyword}
              onChange={handleSearchKeywordChange}
            />
          </fieldset>
        </form>
        <button
          className="btn btn-outline-primary"
          type="submit"
          onClick={handleSearchButton}
        >
          Search
        </button>
      </div>
      <div className="main-box">
        {filteredData.map((value, i) => {
          return (
            <>
              <div className="sort-box-detail" key={i}>
                <div className="profile-picture">
                  <img src="//placehold.it/150" alt="" />
                </div>
                <div className="sort-box-user">
                  <h4 id="sort-box-username">{value.name}</h4>
                  <h6>{value.fieldOfInterest}</h6>
                  <h6>{value.techStack}</h6>
                </div>
                <div className="sort-box-button">
                  <button id="delete-profile">Delete</button>
                  <button id="DM-profile">DM Student</button>
                  <button id="View-profile">View Profile</button>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
