import {Routes, Route} from "react-router-dom";
import { Layout } from "./components/Layout.jsx";
import { Index } from "./pages/Index.jsx";
import { Venues } from "./pages/Venues.jsx";
import { Singlevenue } from "./pages/Singlevenue.jsx";


function App() {
  return (
    <>
      <Layout>
        <main className="container">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/venues" element={<Venues />} />
            <Route path="/venues/:id" element={<Singlevenue />} />
          </Routes>
        </main>
      </Layout>
    </>
  );
}

export default App
