import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import CharacterCard from "@/components/CharacterCard";
import { Button } from "@/components/ui/button";
import { getCharacters } from "@/services/dragonballApi";

function Home() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCharacters() {
      try {
        const data = await getCharacters();
        setCharacters(data);
      } catch (err) {
        setError("No se pudieron cargar los personajes. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    }

    loadCharacters();
  }, []);

  return (
    <section>
      <div className="bg-gradient-to-br from-orange-500 via-orange-400 to-blue-700">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
          <div className="flex flex-col justify-center text-white">
            <p className="mb-3 text-sm font-bold uppercase tracking-wide text-blue-950">
              API publica de Dragon Ball
            </p>
            <h1 className="max-w-3xl text-4xl font-black tracking-normal sm:text-5xl lg:text-6xl">
              Dragon Ball Explorer
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-orange-50 sm:text-lg">
              Explora personajes de Dragon Ball consumiendo datos reales desde la API,
              con tarjetas responsivas, busqueda y una interfaz moderna inspirada en la
              energia de la serie.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="bg-blue-800 text-white shadow-lg hover:bg-blue-950">
                <Link to="/entities">Ver personajes</Link>
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative h-72 w-72 rounded-full bg-white/20 shadow-2xl ring-8 ring-white/20 sm:h-80 sm:w-80">
              <div className="absolute inset-8 rounded-full bg-orange-200 shadow-inner" />
              <div className="absolute left-1/2 top-8 h-10 w-10 -translate-x-1/2 rounded-full bg-red-500 shadow" />
              <div className="absolute bottom-20 left-16 h-8 w-8 rounded-full bg-red-500 shadow" />
              <div className="absolute bottom-20 right-16 h-8 w-8 rounded-full bg-red-500 shadow" />
              <div className="absolute inset-0 rounded-full border-4 border-orange-100/70" />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-black tracking-normal text-slate-950">
              Personajes destacados
            </h2>
            <p className="mt-2 text-slate-600">
              Personajes obtenidos: {characters.length}
            </p>
          </div>
        </div>

        {loading && (
          <div className="flex min-h-40 items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-200 border-t-orange-500" />
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {characters.slice(0, 8).map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Home;
