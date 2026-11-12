// URL del backend. En producción se define con VITE_API_URL (ver .env.example)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/libros';

// Convierte una respuesta fallida en un Error con el mensaje que envió el backend
async function manejarRespuesta(res, mensajePorDefecto) {
  if (res.ok) return res;
  let detalle = '';
  try {
    const cuerpo = await res.json();
    detalle = cuerpo.error ? `: ${cuerpo.error}` : '';
  } catch {
    // la respuesta no traía JSON, se usa el mensaje por defecto
  }
  throw new Error(`${mensajePorDefecto}${detalle}`);
}

export async function getLibros(signal) {
  const res = await fetch(API_URL, { signal });
  await manejarRespuesta(res, 'Error al obtener los libros');
  const datos = await res.json();
  return Array.isArray(datos) ? datos : [];
}

export async function getLibro(id) {
  const res = await fetch(`${API_URL}/${id}`);
  await manejarRespuesta(res, 'Error al obtener el libro');
  return res.json();
}

export async function crearLibro(libro) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(libro),
  });
  await manejarRespuesta(res, 'Error al crear el libro');
  return res.json();
}

export async function actualizarLibro(id, cambios) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cambios),
  });
  await manejarRespuesta(res, 'Error al actualizar el libro');
  return res.json();
}

export async function eliminarLibro(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  await manejarRespuesta(res, 'Error al eliminar el libro');
}
