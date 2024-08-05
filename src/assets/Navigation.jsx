const Navigation = ({
  handleHome,
  handleFilter,
  isVisible,
  handleIsVisible,
}) => {
  return (
    <nav className="navigation">
      <p className="logoTitle" onClick={handleHome}>
        MOVIES SEARCH
      </p>
      <div className="filterContainer">
        <p onClick={handleHome}>Home</p>
        <div className="dropdown">
          <button className="dropbtn" onClick={() => handleIsVisible("block")}>
            Filter
          </button>
          <div style={{ display: `${isVisible}` }} className="dropdown-content">
            <span onClick={() => handleFilter("all")}>All</span>
            <span onClick={() => handleFilter("movie")}>Movies</span>
            <span onClick={() => handleFilter("series")}>Series</span>
            <span onClick={() => handleFilter("game")}>Games</span>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navigation;
