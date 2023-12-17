import PropTypes from 'prop-types';
import { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import News from '../News/News';
import NewsPagination from '../Pagination/Pagination';
import './NewsList.scss';

function NewsList({ cards, filter }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage] = useState(4);
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = cards.slice(indexOfFirstNews, indexOfLastNews);

  function handleChangePage(pageNumber) {
    setCurrentPage(pageNumber);
  }
  return (
    <>
      <ListGroup className={`${filter}`}>
        {currentNews.map((card, index) => (
          <News key={index} card={card} filter={filter} />
        ))}
      </ListGroup>
      <NewsPagination
        newsPerPage={newsPerPage}
        totalNews={cards.length}
        onChangePage={handleChangePage}
      />
    </>
  );
}
NewsList.propTypes = {
  cards: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired,
};

export default NewsList;
