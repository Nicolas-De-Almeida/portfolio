import { useEffect, useState } from "react";
import Header from "./components/Header";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Experiences from "./pages/Experiences";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";

function App() {
  const [language, setLanguage] = useState("pt");

  // Atualiza o atributo lang para poder mudar de idioma
  useEffect(() => {
    document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
  }, [language]);

  return (
    <div>
      <Header language={language} setLanguage={setLanguage} />
      <main>
        <About language={language} />
        <Projects language={language}/>
        <Experiences language={language} />
        <Contact />
      </main>
      <Footer/>
    </div>
  );
}

export default App;