import {BrowserRouter, Routes, Route} from "react-router-dom";
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import DetailUser from "./components/DetailUser";
import AddPelanggaran from "./components/AddPelanggaran";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserList/>}/>
        <Route path="add" element={<AddUser/>}/>
        <Route path="edit/:id" element={<EditUser/>}/>
        <Route path="detail/:id" element={<DetailUser/>}/>
        <Route path="detail/:id/add/pelanggaran" element={<AddPelanggaran/>}/>
      </Routes>
      </BrowserRouter>
  );
}

export default App;
