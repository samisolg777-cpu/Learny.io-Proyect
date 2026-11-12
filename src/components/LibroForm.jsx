import { useState } from 'react';

// El roadmap puede llegar como texto o como arreglo; el textarea siempre usa texto
function roadmapATexto(roadmap) {
  if (Array.isArray(roadmap)) return roadmap.join('\n');
  return typeof roadmap === 'string' ? roadmap : '';
}

// App monta este componente con key={id del libro en edición}, así que el estado
// inicial se calcula una sola vez por cada libro (o por "nueva entrada")
function LibroForm({ onGuardar, libroEditando, onCancelar, enviando }) {
  const [tema, setTema] = useState(libroEditando?.tema || '');
  const [roadmap, setRoadmap] = useState(roadmapATexto(libroEditando?.roadmap));
  const [errorLocal, setErrorLocal] = useState('');

  const manejarEnvio = async (e) => {
    e.preventDefault();

    const temaLimpio = tema.trim();
    const roadmapLimpio = roadmap.trim();

    if (!temaLimpio || !roadmapLimpio) {
      setErrorLocal('Completa el tema y el roadmap antes de publicar.');
      return;
    }

    setErrorLocal('');
    const exito = await onGuardar({ tema: temaLimpio, roadmap: roadmapLimpio });

    if (exito && !libroEditando) {
      setTema('');
      setRoadmap('');
    }
  };

  return (
    <form className="form" onSubmit={manejarEnvio}>
      <h2 className="form__titulo">
        {libroEditando ? `Editando N.º ${String(libroEditando.id).padStart(3, '0')}` : 'Nueva entrada'}
      </h2>

      <label className="form__label" htmlFor="tema">
        Tema
      </label>
      <input
        id="tema"
        className="form__input"
        type="text"
        placeholder="Ej: Estructuras de datos"
        value={tema}
        onChange={(e) => setTema(e.target.value)}
        disabled={enviando}
      />

      <label className="form__label" htmlFor="roadmap">
        Roadmap <span className="form__ayuda">(un paso por línea)</span>
      </label>
      <textarea
        id="roadmap"
        className="form__input form__textarea"
        rows={6}
        placeholder={'Arrays y listas\nPilas y colas\nÁrboles\nGrafos'}
        value={roadmap}
        onChange={(e) => setRoadmap(e.target.value)}
        disabled={enviando}
      />

      {errorLocal && <p className="form__error">{errorLocal}</p>}

      <button className="btn btn--primario" type="submit" disabled={enviando}>
        {enviando
          ? libroEditando ? 'Guardando…' : 'Publicando…'
          : libroEditando ? 'Guardar cambios →' : 'Publicar →'}
      </button>

      {libroEditando && (
        <button className="btn" type="button" onClick={onCancelar} disabled={enviando}>
          Cancelar
        </button>
      )}
    </form>
  );
}

export default LibroForm;
