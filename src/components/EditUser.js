import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";


const EditUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [existingData, setExistingData] = useState([]); // State to store existing data
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    getUserById();
  },[]);

  const getUserById = async()=>{
    const response = await axios.get(`https://cooperative-puce-pelican.cyclic.cloud/users/${id}`);
    setName(response.data.name);
    setEmail(response.data.email);
  }
  useEffect(() => {
    // Fetch existing data from the server
    const fetchExistingData = async () => {
      try {
        const response = await axios.get("https://cooperative-puce-pelican.cyclic.cloud/users");
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
    if (!name || !email) {
      setError("Please fill in all required fields.");
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
      await axios.post("https://cooperative-puce-pelican.cyclic.cloud/users", {
        name,
        email
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

export default EditUser;
