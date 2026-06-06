import { NavLink, Route, Routes } from "react-router-dom";

import { Button } from "@/components/ui/button";
import Entities from "@/pages/Entities";
import Home from "@/pages/Home";

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <header className="sticky top-0 z-50 border-b border-orange-300 bg-orange-500/95 shadow-sm backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <NavLink to="/" className="text-lg font-black tracking-normal text-white">
            Dragon Ball Explorer
          </NavLink>

          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" className="text-white hover:bg-orange-600 hover:text-white">
              <NavLink to="/">Home</NavLink>
            </Button>
            <Button asChild className="bg-blue-700 text-white hover:bg-blue-800">
              <NavLink to="/entities">Personajes</NavLink>
            </Button>
          </div>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/entities" element={<Entities />} />
        </Routes>
      </main>

      <footer className="border-t border-slate-200 bg-white px-4 py-6 text-center text-sm text-slate-600">
        Hecho por Luis Dionicio - C24
      </footer>
    </div>
  );
}

export default App;
