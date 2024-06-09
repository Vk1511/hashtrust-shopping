import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrimaryLayout from "./Layout/PrimaryLayout/PrimaryLayout";
import PrivateRoute from "./Routes/PrivateRoutes";
import { Home, Checkout, Authentication } from "./Screens";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <PrivateRoute>
              <Authentication />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<PrimaryLayout />}>
          <Route index element={<Home />} />
          <Route
            path="check-out"
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
    // <PrimaryLayout>
    //   <Home />
    // </PrimaryLayout>
  );
}

export default App;
