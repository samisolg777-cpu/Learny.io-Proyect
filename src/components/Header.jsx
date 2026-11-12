function Header({ total, cargando }) {
  const fecha = new Date().toLocaleDateString('es-CO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Lleva al formulario sin recargar la página
  const irAlFormulario = () => {
    const formulario = document.getElementById('formulario');
    formulario?.scrollIntoView({ behavior: 'smooth' });
    formulario?.querySelector('input')?.focus({ preventScroll: true });
  };

  return (
    <header className="header">
      <div className="header__barra">
        <span>Edición Estudiantil</span>
        <span className="header__fecha">{fecha}</span>
        <span>Ing. de Sistemas · La Salle</span>
      </div>

      <div id="center">
        <h1 className="header__titulo">
          Learny<span className="header__punto">.io</span>
        </h1>

        <p className="header__lema">
          Libros y rutas de estudio para sobrevivir (y disfrutar) la carrera.
        </p>
        <button className="header__btn" type="button" onClick={irAlFormulario}>
          Comenzar
        </button>
      </div>

      <div className="header__contador">
        {cargando
          ? 'Contando ejemplares…'
          : `${total} ${total === 1 ? 'entrada' : 'entradas'} en el archivo`}
      </div>
    </header>
  );
}

export default Header;
