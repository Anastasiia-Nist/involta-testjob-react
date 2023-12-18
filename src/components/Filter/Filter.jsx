import PropTypes from 'prop-types';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './Filter.scss';
import {
  ENDPOINT_ROOT,
  ENDPOINT_MOS,
  ENDPOINT_LENTA,
} from '../../utils/constants';

function Filter({ setFilter, filter, }) {
  function toggleFilter(event, value) {
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
        <Button  active={filter === 'table'}
          className="filter__btn filter__btn_type_table"
          onClick={(evn) => toggleFilter(evn, 'table')}
        ></Button>
        <Button active={filter === 'line'}
          className="filter__btn filter__btn_type_line"
          onClick={(evn) => toggleFilter(evn, 'line')}
        ></Button>
      </div>
    </section>
  );
}
Filter.propTypes = {
  setFilter: PropTypes.func,
  filter: PropTypes.string,
};
export default Filter;
