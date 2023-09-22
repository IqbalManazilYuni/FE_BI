import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const DetailUser = () => {
  const [user, setUser] = useState({});
  const [pelanggarans, setPelanggarans] = useState([]);
  const [Kurangpoint, setKurangpoint] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [point, setPoint] = useState("");
  const { id } = useParams();

  // Tambahkan state loading untuk menunjukkan bahwa data sedang diambil
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mengambil data pengguna berdasarkan ID
    axios
      .get(`https://cooperative-puce-pelican.cyclic.cloud/users/${id}`)
      .then((response) => {
        setName(response.data.name);
        setEmail(response.data.email);
        setPoint(response.data.point);
        setUser(response.data);
        setLoading(false); // Set loading menjadi false setelah data diterima
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });

    // Mengambil semua data pelanggaran
    axios
      .get("https://cooperative-puce-pelican.cyclic.cloud/pelanggarans")
      .then((response) => {
        // Menerapkan filter pada pelanggaran berdasarkan ID pengguna
        const filteredPelanggarans = response.data.filter(
          (pelanggaran) => pelanggaran.user === id
        );
        setPelanggarans(filteredPelanggarans);
      })
      .catch((error) => {
        console.error("Error fetching pelanggaran data:", error);
      });
  }, [id]);

  // Untuk mengubah format tanggal
  function formatDate(dateString) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString("en-US", options);
  }

  const deletePelanggaran = async (pelanggaranId) => {
    try {
      // Hapus pelanggaran terlebih dahulu
      await axios.delete(`https://cooperative-puce-pelican.cyclic.cloud/pelanggarans/${pelanggaranId}`);

      // Tambahkan Kurangpoint ke point user
      const updatedPoint = point + Kurangpoint;
      await axios.patch(`https://cooperative-puce-pelican.cyclic.cloud/users/${id}`, {
        point: updatedPoint,
      });

      // Refresh data pelanggaran dan point user
      // Mengambil data pengguna berdasarkan ID
      const userResponse = await axios.get(`https://cooperative-puce-pelican.cyclic.cloud/users/${id}`);
      setName(userResponse.data.name);
      setEmail(userResponse.data.email);
      setPoint(userResponse.data.point);

      // Mengambil semua data pelanggaran
      const pelanggaranResponse = await axios.get("https://cooperative-puce-pelican.cyclic.cloud/pelanggarans");
      // Menerapkan filter pada pelanggaran berdasarkan ID pengguna
      const filteredPelanggarans = pelanggaranResponse.data.filter(
        (pelanggaran) => pelanggaran.user === id
      );
      setPelanggarans(filteredPelanggarans);
    } catch (error) {
      console.error("Error deleting pelanggaran:", error);
    }
  };

  return (
    <div
      className="box"
      style={{
        width: "75%",
        margin: "0 auto",
        marginTop: "50px",
        paddingBottom: "70px",
      }}
    >
      <div>
        <h1
          style={{
            textAlign: "center",
            fontSize: "2rem",
            marginBottom: "30px",
          }}
        >
          Detail Informasi Pelanggaran
        </h1>
      </div>
      {loading ? ( // Tampilkan pesan loading jika data sedang diambil
        <p>Data Sedang Di Proses...</p>
      ) : (
        <div>
          <div className="columns">
            <div className="column is-1">Nama :</div>
            <div className="column">{name}</div>
          </div>
          <div className="columns">
            <div className="column is-1">Email :</div>
            <div className="column">{email}</div>
          </div>
          <div className="columns">
            <div className="column is-1">Point :</div>
            <div className="column">{point}</div>
          </div>
          <div className="container mt-5">
            <div className="columns is-centered">
              <div className="column is-four-fifths">
                <Link
                  to={"add/pelanggaran/"} 
                  className="button is-primary is-rounded"
                >
                  Tambah
                </Link>
                <Link to={"/"} className="button is-normal is-danger ml-2 is-rounded">
                Menu Utama
              </Link>
                <div className="table-container">
                  <table className="table is-fullwidth is-striped is-hoverable is-responsive">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Tanggal</th>
                        <th>Pelanggaran</th>
                        <th>Pengurangan Point</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pelanggarans.map((pelanggaran, index) => (
                        <tr key={pelanggaran._id}>
                          <td>{index + 1}</td>
                          <td>{formatDate(pelanggaran.date)}</td>
                          <td>{pelanggaran.keterangan}</td>
                          <td>{pelanggaran.Kurangpoint}</td>
                          <td>
                            <button onClick={() => deletePelanggaran(pelanggaran._id)} className="button is-danger is-rounded">
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailUser;
