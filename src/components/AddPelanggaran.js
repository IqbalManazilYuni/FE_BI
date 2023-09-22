import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";

const AddPelanggaran = () => {
  const [keterangan, setKeterangan] = useState("");
  const [Kurangpoint, setKurangpoint] = useState(0);
  const navigate = useNavigate();
  const [users, setUser] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getUserById();
  }, []);

  const getUserById = async () => {
    const response = await axios.get(
      `https://cooperative-puce-pelican.cyclic.cloud/users/${id}`
    );
    setUser(response.data);
  };

  const savePelanggaran = async (e) => {
    e.preventDefault();

    // Menghitung jumlah point yang akan dikurangkan
    const totalKurangPoint = parseInt(Kurangpoint, 10);
    // Memastikan total pengurangan point tidak kurang dari 0
    if (totalKurangPoint < 0 || totalKurangPoint > 100) {
      alert("Pengurangan point harus diantara 0 dan 100.");
      return;
    }
    // Memastikan total pengurangan point tidak kurang dari 0
    if (users.point - totalKurangPoint < 0) {
      alert("Pengurangan point Gagal.");
      return;
    }

    try {
      // Mengirim data ke server dalam format yang sesuai
      await axios.post(
        "https://cooperative-puce-pelican.cyclic.cloud/pelanggarans",
        {
          user: users._id,
          date: selectedDate,
          keterangan,
          Kurangpoint: totalKurangPoint, // Menggunakan totalKurangPoint yang sudah dihitung
        }
      );

      // Pengurangan point dari user
      const updatedPoint = users.point - totalKurangPoint;
      await axios.patch(
        `https://cooperative-puce-pelican.cyclic.cloud/users/${id}`,
        {
          point: updatedPoint,
        }
      );

      // Navigasi kembali ke halaman utama setelah berhasil
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div
      className="box"
      style={{
        width: "50%",
        margin: "0 auto",
        marginTop: "50px",
        paddingBottom: "70px",
      }}
    >
      <div className="columns mt-5 is-centered">
        <div className="column is-half">
          <form onSubmit={savePelanggaran}>
            <div className="field">
              <label className="label">Input Tanggal</label>
              <div className="control">
                <DatePicker
                  selected={selectedDate}
                  className="input"
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy" // Format tampilan tanggal dengan jam, menit, dan detik
                  isClearable // Membuat opsi untuk menghapus tanggal
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Keterangan</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={keterangan}
                  onChange={(e) => setKeterangan(e.target.value)}
                  placeholder="Keterangan"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Point</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={Kurangpoint}
                  onChange={(e) => setKurangpoint(e.target.value)}
                  placeholder="Point"
                />
              </div>
            </div>
            <div className="field">
              <button className="button is-success" type="submit">
                Tambah
              </button>
              <Link to={"/"} className="button is-normal is-danger ml-2">
                Menu Utama
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPelanggaran;
