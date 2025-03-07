import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Songs from './Components/Songs';
import Sidebar from './Components/Sidebar';
import Favorities from './Components/Favorities';
import Playlist from './Components/Playlist';


function App() {
  return (
    <BrowserRouter>
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar on all pages */}
          <div className="col-md-3">
            <Sidebar />
          </div>
          {/* Main content area for songs and other routes */}
          <div className="col-md-9">
            <Routes>
              <Route path="/" element={<Songs />} />
              <Route path="/songs" element={<Songs />} />
              <Route path="/favorities" element={<Favorities />} />
              <Route path="/playlist" element={<Playlist />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
