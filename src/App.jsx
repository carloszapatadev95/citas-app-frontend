import { Outlet } from "react-router-dom";
import { useContext } from 'react'; 
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ThemeContext } from "./context/ThemeContext.jsx"; // Importa el ThemeContext
import { themeConfig } from "./theme/themeConfig";



function App() {

    const { theme } = useContext(ThemeContext);

   const styles = themeConfig[theme];

  return (
 <div className={`min-h-screen flex flex-col transition-colors duration-300 ${styles.app}`}>
      <Navbar />
   <main className="flex-grow container mx-auto px-4 pb-8" style={{ marginTop: '5rem' }}>
        {/* Aquí se renderizarán las rutas hijas */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;