import { useState } from 'react';
import PropTypes from 'prop-types';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import './Filter.scss';

function Filter({ setFilter, filter, onFilteredNews, param }) {
  const [activeBtn, setActiveBtn] = useState(param);
  function toggleFilter(e, value) {
    setFilter(value);
    localStorage.setItem('filter', value);
  }
  function handleFilterNews(e, value) {
    setActiveBtn(value);
    onFilteredNews(value);
  }
  return (
    <section className="filter">
      <Nav className="filter__nav" as="ul">
        <Nav.Item as="li">
          <Button
            active={activeBtn === 'all'}
            onClick={(evn) => handleFilterNews(evn, 'all')}
          >
            {'Все'}
          </Button>
        </Nav.Item>
        <Nav.Item as="li">
          <Button
            active={activeBtn === 'lenta'}
            onClick={(evn) => handleFilterNews(evn, 'lenta')}
          >
            {'Lenta.ru'}
          </Button>
        </Nav.Item>
        <Nav.Item as="li">
          <Button
            active={activeBtn === 'mos'}
            onClick={(evn) => handleFilterNews(evn, 'mos')}
          >
            {'Mos.ru'}
          </Button>
        </Nav.Item>
      </Nav>
      <div className="filter__sort">
        <Button
          active={filter === 'table'}
          className="filter__btn filter__btn_type_table"
          onClick={(evn) => toggleFilter(evn, 'table')}
        ></Button>
        <Button
          active={filter === 'line'}
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
  onFilteredNews: PropTypes.func,
  param:  PropTypes.string,
};
export default Filter;
