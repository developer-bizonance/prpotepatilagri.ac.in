
import ImageSlider from "./components/home-slider.jsx";
import InfoWithNews from "./components/newsandnotices.jsx";
import InspirationAndPillars from "./components/our-inspiration.jsx";

import VideoCarousel from "./components/video-crousel.jsx";


import FacultiesPage from "./components/faculty.jsx";
import EminentGuests from "./components/eminant-guests.jsx";

import UpcomingEvents from "./components/upcoming-events.jsx";
import HighlightEvents from "./components/highlightevents.jsx";
import OtherIns from "./components/other-institutes.jsx";
import VisionMission from "./components/vision.jsx";


export default function Home() {
  return (
    <div>
      <ImageSlider/>
      <InfoWithNews/>
      <InspirationAndPillars/>
      <VisionMission/>
      <UpcomingEvents/>
      <HighlightEvents/>
      <EminentGuests/>
      <FacultiesPage/>
      <VideoCarousel/>
      <OtherIns/>
    </div>
  );
}
