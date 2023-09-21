import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [point, setPoint] = useState("");
  const [error, setError] = useState("");
  const [existingData, setExistingData] = useState([]); // State to store existing data
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch existing data from the server
    const fetchExistingData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users");
        setExistingData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchExistingData();
  }, []);

  const saveUser = async (e) => {
    e.preventDefault();

    // Check if any of the required fields are empty
    if (!name || !email || !point) {
      setError("Please fill in all required fields.");
      return;
    }

    // Check if the 'point' is within the range of 0 to 100
    const pointValue = parseInt(point, 10);
    if (pointValue < 0 || pointValue > 100) {
      setError("Point must be between 0 and 100.");
      return;
    }

    // Check if the name or email already exist
    if (
      existingData.some((user) => user.name === name || user.email === email)
    ) {
      setError("Name or email Sudah Dipakai");
      return;
    }

    try {
      await axios.post("http://localhost:5000/users", {
        name,
        email,
        point: pointValue,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <div class="box" style={{ width: "50%", margin: "0 auto", marginTop: "50px",paddingBottom:"70px" }}>
        <div className="columns mt-5 is-centered">
          <div className="column is-half">
            <form onSubmit={saveUser}>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Point</label>
                <div className="control">
                  <input
                    type="number"
                    className="input"
                    value={point}
                    onChange={(e) => setPoint(e.target.value)}
                    placeholder="Point"
                  />
                </div>
              </div>
              {error && <p className="has-text-danger">{error}</p>}
              <div className="field">
                <button className="button is-success" type="submit">
                  Tambah
                </button>
                <Link to={"/"} className="button is-normal is-danger ml-2">
                  Kembali
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
