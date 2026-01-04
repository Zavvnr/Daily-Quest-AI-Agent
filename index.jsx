import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './app';

const root = createRoot(document.getElementById('root'));
root.render(<App />);

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/Linear Optimization" element={<LinearOptimizationPage />} />
        <Route path="/Graphs and Networks in Data Science" element={<GraphsAndNetworksInDataSciencePage />} />
        <Route path="/Securing Information Networks" element={<SecuringInformationNetworksPage />} />
        <Route path="/Responsibility-Big Data and AI" element={<ResponsibilityBigDataAndAIPage />} />
        <Route path="/Interaction Design Studio" element={<InteractionDesignStudioPage />} />
        <Route path="/Data Storytelling With Visualization" element={<DataStorytellingWithVisualizationPage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;