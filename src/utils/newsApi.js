import { URL_MOS, URL_LENTA } from './constants';
// const corsProxy = 'https://api.allorigins.win/get?url=';
const corsProxy = 'https://thingproxy.freeboard.io/fetch/';
// const corsProxy = 'https://api.codetabs.com/v1/proxy/?quest=';
// const rssReader = 'https://tools.aimylogic.com/api/rss2json?&url=';
const rssReader = 'https://api.rss2json.com/v1/api.json?rss_url=';

export class Api {
  constructor(dataApi) {
    this._baseUrl = dataApi.baseUrl;
    this._headers = dataApi.headers;
  }
  //
  async _request(url, options) {
    const res = await fetch(url, options);
    return this._checkResult(res);
  }

  _checkResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то сломалось. Ошибка: ${res.status}`);
  }
  getNewsMos() {
    return this._request(rssReader + encodeURIComponent(corsProxy + URL_MOS), {
      headers: this._headers,
    });
  }

  getNewsLenta() {
    return this._request(
      rssReader + encodeURIComponent(corsProxy + URL_LENTA),
      { headers: this._headers }
    );
  }
}
const dataApi = {
  baseUrl: corsProxy,
  headers: {
    'Content-Type': 'application/json',
  },
};
const newsApi = new Api(dataApi);
export default newsApi;
