import axios from 'axios';
import { performanceFetchApi } from './performanceFetchApi';

let performanceStart;
let performanceEnd;

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  performanceStart = performance.now();
  return config;
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  performanceEnd = performance.now();
  console.log('Request time:', performanceEnd - performanceStart, 'ms');
  // Do something with response data
  return response;
});

// const {
//   data: { articles },
// } = await axios.get('/api/data/articles?timeout=3000');

const { articles } = await performanceFetchApi(
  '/api/data/articles?timeout=3000'
).then(async (res) => {
  const resJson = await res.json();
  return resJson;
});

document.querySelector('#data').innerHTML = articles[0].content;
