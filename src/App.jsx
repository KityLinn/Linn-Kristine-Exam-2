import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout.jsx";
import { Index } from "./pages/Index.jsx";
import { Venues } from "./pages/Venues.jsx";
import { Singlevenue } from "./pages/Singlevenue.jsx";
import { Profile } from "./pages/Profile.jsx"
import { Newvenue } from "./pages/Newvenue.jsx";
import { Login } from "./pages/Login.jsx"
import { Logout } from "./pages/Logout.jsx"
import { Register } from "./pages/Register.jsx"
import { EditVenue } from "./pages/EditVenue.jsx"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function App() {
  return (
    <>
      <Layout>
        <main className="container">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/venues" element={<Venues />} />
            <Route path="/venues/:id" element={<Singlevenue />} />
            <Route path="/profile/:name" element={<Profile />} />
            <Route path="/newvenue" element={<Newvenue />} />
            <Route path="/editvenue/:id" element={<EditVenue />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </main>
      </Layout>
      <ToastContainer />
    </>
  );
}

export default App
