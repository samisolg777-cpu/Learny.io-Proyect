function obtenerPasos(roadmap) {
  if (Array.isArray(roadmap)) {
    return roadmap.map((p) => String(p).trim()).filter(Boolean);
  }
  if (typeof roadmap === 'string') {
    return roadmap
      .split(/\r?\n|;/)
      .map((p) => p.trim())
      .filter(Boolean);
  }
  return [];
}

function LibroCard({ libro, onEditar, onEliminar, onAlternar, eliminando }) {
  const pasos = obtenerPasos(libro.roadmap);

  return (
    <article
      className={`card ${eliminando ? 'card--eliminando' : ''} ${libro.completada ? 'card--completada' : ''}`}
    >
      <div className="card__encabezado">
        <span className="card__id">N.º {String(libro.id).padStart(3, '0')}</span>
        <div className="card__acciones">
          <button
            className="btn btn--peligro"
            onClick={() => onEditar(libro)}
            disabled={eliminando}
            aria-label={`Editar ${libro.tema}`}
          >
            ✎
          </button>
          <button
            className="btn btn--peligro"
            onClick={() => onEliminar(libro.id)}
            disabled={eliminando}
            aria-label={`Eliminar ${libro.tema}`}
          >
            {eliminando ? '…' : '✕'}
          </button>
        </div>
      </div>

      <h3 className="card__tema">{libro.tema}</h3>

      <hr className="card__linea" />

      {pasos.length > 0 ? (
        <ol className="card__pasos">
          {pasos.map((paso, i) => (
            <li key={`${libro.id}-${i}`}>{paso}</li>
          ))}
        </ol>
      ) : (
        <p className="card__sin-pasos">Sin roadmap definido.</p>
      )}

      <label className="card__check">
        <input
          type="checkbox"
          checked={Boolean(libro.completada)}
          onChange={() => onAlternar(libro)}
          disabled={eliminando}
        />
        {libro.completada ? 'Ruta completada' : 'Marcar como completada'}
      </label>
    </article>
  );
}

export default LibroCard;
