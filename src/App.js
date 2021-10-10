import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Booking from "./Components/Booking/Booking";
import Login from "./Components/Login-Signin/Login";
import Hotels from "./Components/Hotels/Hotels";
import Destination from "./Components/Destination/Destination";
import { createContext, useState } from "react";
import { destinations } from "./Assets/Data/DestinationsData";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

export const userContext = createContext();

function App() {
  // const userData = useContext(userContext);

  const [bookingInfo, setBookingInfo] = useState({
    isDone: false,
    from: "",
    to: "",
    days: "",
    origin: "",
    destination: "",
  });

  const [selectedDestination, setSelectedDestination] = useState(
    destinations[0]
  );

  const [loggedInUser, setLoggedInUser] = useState({
    isSigned: false,
    name: "",
    email: "",
    password: "",
    message: "",
  });

  return (
    <userContext.Provider
      value={{
        destination: [selectedDestination, setSelectedDestination],
        booking: [bookingInfo, setBookingInfo],
        user: [loggedInUser, setLoggedInUser],
      }}
    >
      <div className="App">
        <div className="body">
          <Router>
            <Header></Header>
            <Switch>
              <Route exact path="/">
                <Destination></Destination>
              </Route>
              <Route path="/booking">
                <Booking></Booking>
              </Route>
              <Route path="/Auth">
                <Login></Login>
              </Route>
              <ProtectedRoute path="/hotels">
                <Hotels></Hotels>
              </ProtectedRoute>
            </Switch>
          </Router>
        </div>
      </div>
    </userContext.Provider>
  );
}

export default App;
