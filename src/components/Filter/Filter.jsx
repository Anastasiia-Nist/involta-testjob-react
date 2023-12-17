import PropTypes from 'prop-types';
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";
import './Filter.scss';
import {
  ENDPOINT_ROOT,
  ENDPOINT_MOS,
  ENDPOINT_LENTA,
} from '../../utils/constants';

function Filter({ setFilter }) {
  function toggleFilter(value) {
    setFilter(value);
    localStorage.setItem('filter', value);
  }
  return (
    <section className="filter">
      <Nav className="filter__nav" defaultActiveKey={ENDPOINT_ROOT} as="ul">
        <Nav.Item as="li">
          <Link to={ENDPOINT_ROOT}>Все</Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Link to={ENDPOINT_LENTA}>Lenta.ru</Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Link to={ENDPOINT_MOS}>Mos.ru</Link>
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
