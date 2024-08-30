import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import TodayWeather from './components/TodayWeather';
import SearchNav from './components/SearchNav';
import { useState } from 'react';

function App() {
  const [search, setSearch] = useState('')

  function writeSearch (mySearch){
    setSearch(mySearch)
  }

  return (
    <>
    <header>
      <SearchNav search = {search} writeSearch = {writeSearch} />
    </header>
    <main className=' bg-info'>
      <TodayWeather search = {search} />
      </main>
    </>
  );
}

export default App;
