import { BrowserRouter, Route, Routes } from "react-router-dom";
import ImageViewer from './pages/ImageViewer'

export const Layout: React.FC<{ children: any }> = (props) => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/img-view" element={ <ImageViewer /> }></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};
