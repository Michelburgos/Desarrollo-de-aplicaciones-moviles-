function SearchBar({ onSearch }) {
  return (
    <>
      <h3>Buscar</h3>
      <input
        placeholder="Nombre, apellido o CC"
        onChange={e => onSearch(e.target.value)}
      />
    </>
  );
}

export default SearchBar;