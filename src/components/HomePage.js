import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [data, setData] = useState([]);
  const [SearchHome, setSearchHome] = useState("");
  const handleSearchHome = (e) => {
    setSearchHome(e.target.value);
  };

  useEffect(() => {
    fetch("https://backend-4ezs.onrender.com/students")
      .then((resp) => resp.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  }, []);
  return (
    <div className="bg">
      <h1 id="heading">View All Graduates Profile</h1>
      <div className="main">
        <div className="searchbox mx-2 my-1.8">
          <div className="card border-light mb-3">
            <div className="card-header bg-transparent border">
              Search Graduates
            </div>
            <div className="card-body text">
              <input
                className="form-control form-control-lg"
                type="text"
                onChange={handleSearchHome}
                placeholder="Name, keyword, tech"
              />
            </div>

            <Link
              to={{
                pathname: "/Sort",
                state: {
                  SearchKeyword: SearchHome,
                },
              }}
            >
              <button type="button" className="btn btn-primary">
                Search
              </button>
            </Link>
          </div>
        </div>
        <div className="user-details">
          {data.map((value, i) => {
            return (
              <div
                className="card flex-row flex-wrap"
                id="user_Detail_card"
                key={i}
              >
                <div className="card-header border-25">
                  <img src="//placehold.it/150" alt="" />
                </div>
                <div className="card-block px-2">
                  <h4 className="card-title">{data[i].name}</h4>

                  <p className="card-text">{data[i].bio}</p>
                  <h6>{data[i].techStack}</h6>
                </div>
                <div className="card-div3">
                  <h6 className="card-seeking">{data[i].seeking}</h6>
                  <button className="btn btn-primary">
                    View Profile
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
