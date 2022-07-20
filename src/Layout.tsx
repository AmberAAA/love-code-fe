import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Camera } from "./pages/Camera";
import ImageViewer from './pages/ImageViewer'

export const Layout: React.FC<{ children: any }> = (props) => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Camera />} ></Route>
          <Route path="/img-view" element={ <ImageViewer /> }></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};
