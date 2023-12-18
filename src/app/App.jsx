import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header/Header';
import Filter from '../components/Filter/Filter';
import NewsList from '../components/NewsList/NewsList';
import newsApi from '../utils/NewsApi';
import {
  ENDPOINT_ROOT,
  ENDPOINT_MOS,
  ENDPOINT_LENTA,
} from '../utils/constants';

function App() {
  // const { pathname } = useLocation();
  const [newsMos, setNewsMos] = useState([]);
  const [newsLenta, setNewsLenta] = useState([]);
  const [allNews, setAllNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState(
    localStorage.getItem('filter') || 'table'
  );

  function filteredNews(inputSearch = '') {
    const mosNews = JSON.parse(localStorage.getItem('filterMosNews') ?? []);
    const lentaNews = JSON.parse(localStorage.getItem('filterLentaNews') ?? []);

    const filterMosNews = mosNews.filter(
      ({ title, description }) =>
        title.toLowerCase().includes(inputSearch.toLowerCase()) ||
        description.toLowerCase().includes(inputSearch.toLowerCase())
    );
    setNewsMos(filterMosNews);

    const filterLentaNews = lentaNews.filter(
      ({ title, description }) =>
        title.toLowerCase().includes(inputSearch.toLowerCase()) ||
        description.toLowerCase().includes(inputSearch.toLowerCase())
    );
    setNewsLenta(filterLentaNews);

    const filter = [...mosNews, ...lentaNews].filter(
      ({ title, description }) =>
        title.toLowerCase().includes(inputSearch.toLowerCase()) ||
        description.toLowerCase().includes(inputSearch.toLowerCase())
    );
    setAllNews(filter);
  }

  function updateNews(evn) {
    getAllNews();
    evn.target.classList.toggle('rotate');
  }
  function getAllNews() {
    setIsLoading(true);
    Promise.all([newsApi.getNewsMos(), newsApi.getNewsLenta()])
      .then(([mos, lenta]) => {
        localStorage.setItem('filterMosNews', JSON.stringify(mos.items));
        localStorage.setItem('filterLentaNews', JSON.stringify(lenta.items));
        setAllNews([...mos.items, ...lenta.items]);
        setNewsMos(mos.items);
        setNewsLenta(lenta.items);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }
  useEffect(() => {
    getAllNews();
  }, []);

  return (
    <>
      <Header
        onUpdate={updateNews}
        onFilteredNews={filteredNews}
        newsMos={newsMos}
        newsLenta={newsLenta}
      />
      <Filter setFilter={setFilter} filter={filter}/>
      <Routes>
        <Route
          path={ENDPOINT_ROOT}
          element={
            <NewsList cards={allNews} filter={filter} onLoading={isLoading} />
          }
        />
        <Route
          path={ENDPOINT_MOS}
          element={
            <NewsList cards={newsMos} filter={filter} onLoading={isLoading} />
          }
        />
        <Route
          path={ENDPOINT_LENTA}
          element={
            <NewsList cards={newsLenta} filter={filter} onLoading={isLoading} />
          }
        />
      </Routes>
    </>
  );
}

export default App;
