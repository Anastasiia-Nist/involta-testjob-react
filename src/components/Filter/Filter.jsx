import PropTypes from 'prop-types';
import Nav from 'react-bootstrap/Nav';
import './Filter.scss';

function Filter({ setFilter }) {
  function toggleFilter(value) {
    setFilter(value);
    localStorage.setItem('filter', value);
  }
  return (
    <section className="filter">
      <Nav className="filter__nav" defaultActiveKey="/home" as="ul">
        <Nav.Item as="li">
          <Nav.Link href="/">Все</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link href="/lentaru">Lenta.ru</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link href="/mosru">Mos.ru</Nav.Link>
        </Nav.Item>
      </Nav>
      <div className="filter__sort">
        <button onClick={() => toggleFilter('table')} >Таблица</button>
        <button onClick={() => toggleFilter('line')} >Список</button>
      </div>
    </section>
  );
}
Filter.propTypes = {
  setFilter: PropTypes.func,
};
export default Filter;
