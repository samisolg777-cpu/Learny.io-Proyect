import { useCallback, useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import LibroForm from './components/LibroForm.jsx';
import LibroCard from './components/LibroCard.jsx';
import { Mascota } from './components/Mascot.jsx';
import {
  getLibros,
  crearLibro,
  actualizarLibro,
  eliminarLibro,
} from './api.js';

function App() {
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [eliminandoId, setEliminandoId] = useState(null);
  const [libroEditando, setLibroEditando] = useState(null);
  const [errorAccion, setErrorAccion] = useState('');

  const cargarLibros = useCallback(async (signal) => {
    setLoading(true);
    setError('');

    try {
      const datos = await getLibros(signal);
      setLibros(datos);
    } catch (err) {
      if (err.name === 'AbortError') return;
      setError(
        'No se pudo conectar con el servidor. Verifica que el backend esté corriendo y que CORS esté habilitado.'
      );
    } finally {
      if (!signal || !signal.aborted) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const controlador = new AbortController();
    cargarLibros(controlador.signal);
    return () => controlador.abort();
  }, [cargarLibros]);

  // Crea o actualiza según haya un libro en edición
  const guardarLibro = async ({ tema, roadmap }) => {
    setEnviando(true);
    setErrorAccion('');

    try {
      if (libroEditando) {
        const actualizado = await actualizarLibro(libroEditando.id, { tema, roadmap });
        const nuevo = Array.isArray(actualizado) ? actualizado[0] : actualizado;
        setLibros((prev) =>
          prev.map((l) => (l.id === libroEditando.id ? { ...l, ...nuevo } : l))
        );
        setLibroEditando(null);
      } else {
        await crearLibro({ tema, roadmap });
        await cargarLibros();
      }
      return true;
    } catch {
      setErrorAccion(
        libroEditando
          ? 'No se pudo actualizar la entrada. Intenta de nuevo.'
          : 'No se pudo crear la entrada. Intenta de nuevo.'
      );
      return false;
    } finally {
      setEnviando(false);
    }
  };

  const alternarCompletada = async (libro) => {
    setErrorAccion('');
    const completada = !libro.completada;

    // Actualización optimista: se refleja ya y se revierte si falla
    setLibros((prev) =>
      prev.map((l) => (l.id === libro.id ? { ...l, completada } : l))
    );
    try {
      await actualizarLibro(libro.id, { completada });
    } catch {
      setLibros((prev) =>
        prev.map((l) => (l.id === libro.id ? { ...l, completada: libro.completada } : l))
      );
      setErrorAccion('No se pudo cambiar el estado de la entrada.');
    }
  };

  const borrarLibro = async (id) => {
    const confirmado = window.confirm('¿Seguro que quieres eliminar esta entrada?');
    if (!confirmado) return;

    setEliminandoId(id);
    setErrorAccion('');

    try {
      await eliminarLibro(id);
      setLibros((prev) => prev.filter((libro) => libro.id !== id));
      if (libroEditando?.id === id) setLibroEditando(null);
    } catch {
      setErrorAccion('No se pudo eliminar la entrada. Intenta de nuevo.');
    } finally {
      setEliminandoId(null);
    }
  };

  const iniciarEdicion = (libro) => {
    setErrorAccion('');
    setLibroEditando(libro);
    document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' });
  };

  const renderContenido = () => {
    if (loading) {
      return (
        <div className="estado">
          <p className="estado__texto">
            Cargando archivo<span className="estado__puntos">...</span>
          </p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="estado estado--error">
          <p className="estado__titulo">⚠ Error de conexión</p>
          <p className="estado__texto">{error}</p>
          <button className="btn btn--primario" onClick={() => cargarLibros()}>
            Reintentar
          </button>
        </div>
      );
    }

    if (libros.length === 0) {
      return (
        <div className="estado">
          <p className="estado__titulo">Archivo vacío</p>
          <p className="estado__texto">
            Aún no hay libros ni rutas publicadas. Usa el formulario para crear la primera entrada.
          </p>
        </div>
      );
    }

    return (
      <div className="grid">
        {libros.map((libro) => (
          <LibroCard
            key={libro.id}
            libro={libro}
            onEditar={iniciarEdicion}
            onEliminar={borrarLibro}
            onAlternar={alternarCompletada}
            eliminando={eliminandoId === libro.id}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="app">
      <div id="app-border">
        <Header total={libros.length} cargando={loading} />
        <Mascota />
        <main className="layout">
          <aside className="layout__lateral" id="formulario">
            <LibroForm
              key={libroEditando?.id ?? 'nueva'}
              onGuardar={guardarLibro}
              libroEditando={libroEditando}
              onCancelar={() => setLibroEditando(null)}
              enviando={enviando}
            />
            {errorAccion && <p className="aviso-error">{errorAccion}</p>}
          </aside>

          <section className="layout__principal">
            <h2 className="seccion-titulo">Archivo de rutas</h2>
            {renderContenido()}
          </section>
        </main>

        <footer className="footer">
          Learny.io · Hecho con tinta digital · Universidad de La Salle, Bogotá
        </footer>
      </div>
    </div>
  );
}

export default App;
