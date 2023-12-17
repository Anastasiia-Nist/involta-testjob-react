import PropTypes from 'prop-types';
import Pagination from 'react-bootstrap/Pagination';
import './Pagination.scss';

function NewsPagination({ newsPerPage, totalNews, onChangePage }) {
  const pageNumbers = [];
  for (let page = 1; page <= Math.ceil(totalNews / newsPerPage); page++) {
    pageNumbers.push(page);
  }
  return (
    <Pagination>
      {pageNumbers.map((page) => (
        <Pagination.Item key={page} onClick={() => onChangePage(page)}>
          {page}
        </Pagination.Item>
      ))}
    </Pagination>
  );
}
NewsPagination.propTypes = {
  newsPerPage: PropTypes.number,
  totalNews: PropTypes.number,
  onChangePage: PropTypes.func,
};
export default NewsPagination;
