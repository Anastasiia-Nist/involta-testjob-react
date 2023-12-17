import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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
  const { pathname } = useLocation();
  const [newsMos, setNewsMos] = useState([]);
  const [newsLenta, setNewsLenta] = useState([]);
  const [allNews, setAllNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState(
    localStorage.getItem('filter') || 'table'
  );

  function filteredNews(inputSearch = '') {
    if (pathname === ENDPOINT_MOS) {
      const filter = newsMos.filter(
        ({ title, description }) =>
          title.toLowerCase().includes(inputSearch.toLowerCase()) ||
          description.toLowerCase().includes(inputSearch.toLowerCase())
      );
      setNewsMos(filter);
    }
    if (pathname === ENDPOINT_LENTA) {
      const filter = newsLenta.filter(
        ({ title, description }) =>
          title.toLowerCase().includes(inputSearch.toLowerCase()) ||
          description.toLowerCase().includes(inputSearch.toLowerCase())
      );
      setNewsLenta(filter);
    } else {
      const filter = allNews.filter(
        ({ title, description }) =>
          title.toLowerCase().includes(inputSearch.toLowerCase()) ||
          description.toLowerCase().includes(inputSearch.toLowerCase())
      );
      setAllNews(filter);
    }
  }
  function updateNews(evn) {
    getAllNews();
    evn.target.classList.toggle('rotate');
  }
  function getAllNews() {
    setIsLoading(true);
    Promise.all([newsApi.getNewsMos(), newsApi.getNewsLenta()])
      .then(([mos, lenta]) => {
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
      <Filter setFilter={setFilter} />
      <Routes>
        <Route
          path={ENDPOINT_ROOT}
          element={<NewsList cards={allNews} filter={filter} />}
        />
        <Route
          path={ENDPOINT_MOS}
          element={<NewsList cards={newsMos} filter={filter} />}
        />
        <Route
          path={ENDPOINT_LENTA}
          element={<NewsList cards={newsLenta} filter={filter} />}
        />
      </Routes>
    </>
  );
}

export default App;
