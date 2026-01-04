import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './app';  // Here we're importing the App component from the App.jsx file

const root = createRoot(document.getElementById('root'));
root.render(<App />);

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;