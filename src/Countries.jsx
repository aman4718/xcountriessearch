import React, { useEffect, useState } from "react";

function CountriesCard({ name, flag,key }) {
    console.log('----------->',key)
  return (
    <div key={flag}
      style={{
        border: "1px solid gray",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "250px",
        height: "250px",
        padding: "10px",
        textAlign: "center",
      }}
    >
      <img src={flag} alt={flag} key={flag} style={{ height: "100px", width: "100px" }} />
      <h2>{name}</h2>
    </div>
  );
}

const Countries = () => {
  const API_URL = "https://restcountries.com/v3.1/all";
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);

  // Fetch countries data
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log('data-->',data)
        setCountries(data);
        setSearchData(data); // Initially set all countries to searchData
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Search countries based on searchTerm with a debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      searchCountries();
    }, 300);

    return () => clearTimeout(timer); // Clean up the timeout if searchTerm changes
  }, [searchTerm]);

  // Filter countries based on searchTerm
  const searchCountries = () => {
    if (searchTerm === "") {
      setSearchData(countries); // Reset searchData to all countries if searchTerm is empty
      return;
    }

    const filteredCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchData(filteredCountries); // Update searchData with filtered countries
  };

  return (
    <>
      {/* Search Input */}
      <div style={{ margin: "20px", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm as user types
          style={{
            padding: "10px",
            width: "300px",
            fontSize: "1rem",
            borderRadius: "5px",
            border: "1px solid gray",
          }}
        />
      </div>

      {/* Display Filtered Countries */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          justifyContent: "center",
        }}
      >
        {searchData.map((country,index) => {
        //  console.log("Rendering Country:", country); // Log each country being rendered
          return (
            <CountriesCard
              name={country.name.common}
              flag={country.flags.svg}
              key={index}
            />
          );
        })}
      </div>
    </>
  );
};

export default Countries;
