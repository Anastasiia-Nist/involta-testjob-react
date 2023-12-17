import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import './News.scss';

function News({ card, filter }) {
  return (
    <Card>
      <div className='card-body-wrapper'>
        {filter === 'line' ? (
        <Card.Img variant="top" src={card?.enclosure?.link} />
      ) : (
        ''
      )}
      <Card.Body>
        <Card.Title>{card.title}</Card.Title>
        <Card.Text>{card.description}</Card.Text>
        <Card.Link href={card.link}>Подробнее</Card.Link>
      </Card.Body>
      </div>
      <Card.Footer className="text-muted">
        <p>{card.pubDate}</p>
        <p>{card.link.includes('lenta') ? 'lenta.ru' : 'mos.ru'}</p>
      </Card.Footer>
    </Card>
  );
}
News.propTypes = {
  card: PropTypes.object.isRequired,
  filter: PropTypes.string,
};
export default News;
