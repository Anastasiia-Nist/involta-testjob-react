import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../components/Header/Header';
import Filter from '../components/Filter/Filter';
import NewsList from '../components/NewsList/NewsList';
import newsApi from '../utils/NewsApi';

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [newsParam, setNewsParam] = useState(searchParams.get('news') || '');
  const [searchParam, setSearchParam] = useState(
    searchParams.get('search') || ''
  );
  const [allNews, setAllNews] = useState([]);
  const [filterNews, setFilterNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState(
    localStorage.getItem('filter') || 'table'
  );

  function filteredNewsBySearch(inputSearch) {
    const filter = allNews.filter(
      ({ title, description }) =>
        title.toLowerCase().includes(inputSearch.toLowerCase()) ||
        description.toLowerCase().includes(inputSearch.toLowerCase())
    );
    setFilterNews(filter);
    setSearchParam(inputSearch);
    searchParams.set('search', inputSearch);
    navigate(`/?${searchParams.toString()}`);
  }

  function filteredNewsByType(typeNews) {
    const searchParam = searchParams.get('search');
    if (searchParam) {
      if (typeNews === 'all') {
        const filter = allNews.filter(
          ({ title, description }) =>
            title.toLowerCase().includes(searchParam.toLowerCase()) ||
            description.toLowerCase().includes(searchParam.toLowerCase())
        );
        setFilterNews(filter);
      }
      if (typeNews === 'lenta') {
        const filter = allNews.filter(
          ({ title, description, link }) =>
            link.toLowerCase().includes(typeNews.toLowerCase()) &&
            (title.toLowerCase().includes(searchParam.toLowerCase()) ||
              description.toLowerCase().includes(searchParam.toLowerCase()))
        );
        setFilterNews(filter);
      }
      if (typeNews === 'mos') {
        const filter = allNews.filter(
          ({ title, description, link }) =>
            link.toLowerCase().includes('mk'.toLowerCase()) &&
            (title.toLowerCase().includes(searchParam.toLowerCase()) ||
              description.toLowerCase().includes(searchParam.toLowerCase()))
        );
        setFilterNews(filter);
      }
    } else {
      if (typeNews === 'all') setFilterNews(allNews);
      if (typeNews === 'lenta') {
        const filter = allNews.filter(({ link }) =>
          link.toLowerCase().includes(typeNews.toLowerCase())
        );
        setFilterNews(filter);
      }
      if (typeNews === 'mos') {
        const filter = allNews.filter(({ link }) =>
          link.toLowerCase().includes('mk'.toLowerCase())
        );
        setFilterNews(filter);
      }
    }
    setNewsParam(typeNews);
    searchParams.set('news', typeNews);
    navigate(`/?${searchParams.toString()}`);
  }

  function updateNews(evn) {
    searchParams.delete('news');
    searchParams.delete('search');
    searchParams.delete('page');
    setSearchParams(searchParams);
    getAllNews();
    evn.target.classList.toggle('rotate');
  }
  function getAllNews() {
    setIsLoading(true);
    Promise.all([newsApi.getNewsMos(), newsApi.getNewsLenta()])
      .then(([mos, lenta]) => {
        setAllNews([...mos.items, ...lenta.items]);
        setFilterNews([...mos.items, ...lenta.items]);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }
  useEffect(() => {
    getAllNews();
    filteredNewsByType(searchParams.get('news'));
  }, []);

  return (
    <>
      <Header onUpdate={updateNews} onFilteredNews={filteredNewsBySearch} />
      <Filter
        setFilter={setFilter}
        filter={filter}
        onFilteredNews={filteredNewsByType}
        param={newsParam}
      />
      <NewsList cards={filterNews} filter={filter} onLoading={isLoading} />
    </>
  );
}

export default App;
