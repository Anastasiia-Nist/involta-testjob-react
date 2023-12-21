import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './Header.scss';

function Header({ onUpdate, onFilteredNews }) {
  const [inputSearch, setInputSearch] = useState('');
  function handleInputChange(evt) {
    setInputSearch(evt.target.value);
  }

  function handleSubmit() {
    onFilteredNews(inputSearch);
    setInputSearch('');
  }
  return (
    <>
      <header className="header">
        <div className="header__update">
          <h1 className="header__title">Список новостей</h1>
          <button onClick={onUpdate} className="header__btn-update"></button>
        </div>
        <div>
          <InputGroup className="header__search">
            <Form.Control
              type="text"
              placeholder=""
              aria-label="search-form"
              value={inputSearch}
              onChange={handleInputChange}
            />
            <Button variant="outline-secondary" onClick={handleSubmit}>
              Поиск
            </Button>
          </InputGroup>
        </div>
      </header>
    </>
  );
}
Header.propTypes = {
  onUpdate: PropTypes.func,
  onFilteredNews: PropTypes.func,
};
export default Header;
