import { Route, Routes } from "react-router-dom"
import Layout from "./components/layout/Layout"
import Home from "./pages/home/Home"
import CountryDetail from "./pages/countryDetail/CountryDetail"


function App() {
  

  return (
    
      <Layout>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/country/:name" element={<CountryDetail />}/>
        </Routes>
      </Layout>
    
  )
}

export default App
