import { ProgressDataProvider } from './context/ProgressDataContext';
import { ProgressBar } from './components/ProgressBar';

import Home from "./page";
import AstronomyPage from "./pages/astronomy";
import GeologyPage from "./pages/geology";
import HistoryPage from "./pages/history";
import CompletedPage from "./pages/huntcompleted";
import InstructionsPage from "./pages/instructions";
import SustainabilityPage from "./pages/sustainability";

// This app uses query parameters for routing because of the Bolt servers it will be placed on

type Page = "home" | "astronomy" | "geology" | "history" | "huntcompleted" | "instructions" | "sustainability";

const locationOptions: Page[] = ["home", "astronomy", "geology", "history", "huntcompleted", "instructions", "sustainability"];

export default function App() {
  const localLocation = (() => {
    const initial = window.location.search.split("?");
    const pageParam = initial[1];
    if (pageParam) {
      const page = pageParam.split("=")[1];
      if (locationOptions.includes(page as Page)) {
        return page as Page;
      }
    }

    window.location.search = "page=home";

    return "home";
  })();

  const pageMap: Record<Page, JSX.Element> = {
    home: (
      <Home />
    ),
    astronomy: (
      <AstronomyPage />
    ),
    geology: (
      <GeologyPage />
    ),
    history: (
      <HistoryPage />
    ),
    sustainability: (
      <SustainabilityPage />
    ),
    huntcompleted: (
      <CompletedPage />
    ),
    instructions: (
      <InstructionsPage />
    )
  };

  return (
    <ProgressDataProvider>
      <div className='font-monterrat'>
        <div className='h-[86px]'></div>
        <ProgressBar />
        {pageMap[localLocation]}
      </div>
    </ProgressDataProvider>
  );
}
