import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AboutProducts from "./Components/AboutProducts/AboutProducts";
import MobileBlog from "./Components/Blog/MobileBlog";
import MobileContactSection from "./Components/ContactSection/ContactSection";
import MobileFooter from "./Components/Footer/MobileFooter";
import MobileHero from "./Components/Hero/MobileHero/MobileHero";
import MobileNavbar from "./Components/Navbar/MobileNavbar/MobileNavbar";
import Products from "./Components/Products/Products";
import MobileShop from "./Components/Shop/MobileShop";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <MobileNavbar />
        <MobileHero />
        <Products />
        <MobileShop />
        <MobileBlog />
        <MobileContactSection />
        <MobileFooter />
      </>
    ),
  },
  {
    path: "/products/:id",
    element: <AboutProducts />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/shop",
    element: <MobileShop />,
  },
  {
    path: "/blog",
    element: <MobileBlog />,
  },
  {
    path: "/contact",
    element: <MobileContactSection />,
  },
  {
    path: "/favorites",
    element: <div>Favorites Page</div>,
  },
  {
    path: "/cart",
    element: <div>Cart Page</div>,
  },
  {
    path: "/profile",
    element: <div>Profile Page</div>,
  },
  {
    path: "",
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
