import { Route, Routes } from "react-router-dom";
import Home from "./Pages/HomePage/Home";
import LoginPage from "./Pages/LoginPage/LoginPage";
import { AuthContextProvider } from "./Context/AuthContext";
import Protected from "./Components/Protected";
import AddJourney from "./Pages/AddJourney/AddJourneyV2";
import Profile from "./Pages/Profile Page/Profile";
import ActivityPage from "./Components/Activity/Activity";
import FullView from "./Pages/HomePage/FullView";
import FilteredResults from "./Components/Results";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/:userName/:documentRef" element={<ActivityPage />} />
          <Route path="/search/:explore" element={<FullView />} />
          <Route path="/filtered-results" element={<FilteredResults />} />
          <Route
            path="/AddJourney"
            element={
              <Protected>
                {/* Only acsess home if you are logged in */} <AddJourney />{" "}
              </Protected>
            }
          />
          <Route
            path="/:userName"
            element={
              <Protected>
                {/* Only acsess home if you are logged in */} <Profile />{" "}
              </Protected>
            }
          />          
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
