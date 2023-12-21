import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import News from '../News/News';
import NewsPagination from '../Pagination/Pagination';
import './NewsList.scss';

function NewsList({ cards, filter, onLoading }) {
  const [message, setMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage] = useState(4);
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = cards.slice(indexOfFirstNews, indexOfLastNews);

  useEffect(() => {
    cards.length === 0 ? setMessage('Ничего не найдено') : setMessage('');
  }, [cards]);

  function handleChangePage(pageNumber) {
    setCurrentPage(pageNumber);
  }
  return (
    <>
      {onLoading ? (
        <p>...Загрузка</p>
      ) : (
        <>
          <div>
            <p>{message}</p>
          </div>
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
      )}
    </>
  );
}
NewsList.propTypes = {
  cards: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired,
  onLoading: PropTypes.bool,
};

export default NewsList;
