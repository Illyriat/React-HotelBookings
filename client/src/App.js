import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainContainer from "./container/MainContainer";
import UpdateBooking from "./components/UpdateBooking";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainContainer />} />
                <Route path="/update/:id" element={<UpdateBooking />} />
            </Routes>
        </Router>
    );
}

export default App;
