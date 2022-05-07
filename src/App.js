import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "../src/pages/Home";
import CryptoCurrency from "../src/pages/CryptoCurrency";
import FavList from "../src/pages/FavList";
import News from "../src/pages/News";
import CryptoDetail from "./components/CryptoDetail/CryptoDetail";
function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="cryptocurrency/" element={<CryptoCurrency />} />
          <Route path="cryptocurrency/:coinId" element={<CryptoDetail />} />
          <Route path="favorite" element={<FavList />} />
          <Route path="news" element={<News />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
