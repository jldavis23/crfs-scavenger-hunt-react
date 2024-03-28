import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Page from './page';
import CompletedPage from './pages/huntcompleted';
import AstronomyPage from './pages/astronomy';
import GeologyPage from './pages/geology';
import HistoryPage from './pages/history';
import InstructionsPage from './pages/instructions';
import SustainabilityPage from './pages/sustainability';
import { ProgressDataProvider } from './context/ProgressDataContext';
import { ProgressBar } from './components/ProgressBar';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Page />,
  },
  {
    path: "huntcompleted",
    element: <CompletedPage />
  },
  {
    path: "/astronomy",
    element: <AstronomyPage />
  },
  {
    path: "/geology",
    element: <GeologyPage />
  },
  {
    path: "/history",
    element: <HistoryPage />
  },
  {
    path: "/instructions",
    element: <InstructionsPage />
  },
  {
    path: "/sustainability",
    element: <SustainabilityPage />
  },
  {
    path: "*", 
    element: <Navigate to="/" replace/>
  }

]);

function App() {

  return (
    <ProgressDataProvider>
      <div className='font-monterrat'>
        <div className='h-[86px]'></div>
        <ProgressBar />
        <RouterProvider router={router} />
        
      </div>
    </ProgressDataProvider>
  )
}

export default App
