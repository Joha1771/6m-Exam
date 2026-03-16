import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

// Mobile components
import AboutProducts from "./Components/AboutProducts/AboutProducts";
import MobileBlog from "./Components/Blog/MobileBlog";
import MobileContactSection from "./Components/ContactSection/ContactSection";
import MobileFooter from "./Components/Footer/MobileFooter";
import MobileHero from "./Components/Hero/MobileHero/MobileHero";
import MobileNavbar from "./Components/Navbar/MobileNavbar/MobileNavbar";
import Products from "./Components/Products/Products";
import MobileShop from "./Components/Shop/MobileShop";

// Desktop components
import DesktopNavbar from "./Components/Navbar/DesktopNavbar/DesktopNavbar";
import DesktopHero from "./Components/Hero/DesktopHero/DesktopHero";
import DesktopProducts from "./Components/Products/DesktopProducts";
import DesktopShop from "./Components/Shop/DesktopShop";
import DesktopBlog from "./Components/Blog/DesktopBlog";
import DesktopFooter from "./Components/Footer/DesktopFooter";

const HomePage = () => (
  <>
    {/* Mobile — скрыт на md+ */}
    <div className="md:hidden">
      <MobileNavbar />
      <MobileHero />
      <Products />
      <MobileShop />
      <MobileBlog />
      <MobileContactSection />
      <MobileFooter />
    </div>

    {/* Desktop — скрыт на mobile */}
    <div className="hidden md:block">
      <DesktopNavbar />
      <DesktopHero />
      <DesktopProducts />
      <DesktopShop />
      <DesktopBlog />
      <DesktopFooter />
    </div>
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
