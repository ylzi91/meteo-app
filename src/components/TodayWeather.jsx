import { useEffect, useState } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import TopWeather from "./TopWeather";
import ListHour from "./ListHour";
import DetailH from "./DetailH";
import { click } from "@testing-library/user-event/dist/click";

export default function TodayWeather({ search }) {
  const [todayPos, setTodayPos] = useState(null);
  const [todayPosFiveDay, setTodayPosFiveDay] = useState(null);
  const [view, setView] = useState(false);
  const [view2, setView2] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [showDetail, setShowDetail] = useState(false)
  const [selectBorder, setSelectBorder] = useState('')
  const [selectH, setSelectH] = useState(null)
  const apiKey = "367452c59bda6872606aae942e5fe385";
  const takeLoc = async () => {
    const fetchesDef = [
      `https://api.openweathermap.org/data/2.5/weather/?q=Roma&lang=it&units=metric&appid=${apiKey}`,
      `https://api.openweathermap.org/data/2.5/forecast/?q=Roma&lang=it&units=metric&cnt=10&appid=${apiKey}`,
    ];
    const fetchesPos = [
      `https://api.openweathermap.org/data/2.5/weather/?lat=${latitude}&lon=${longitude}&lang=it&units=metric&appid=${apiKey}`,
      `https://api.openweathermap.org/data/2.5/forecast/?lat=${latitude}&lon=${longitude}&lang=it&units=metric&cnt=10&appid=${apiKey}`,
    ];
    try {
      if (!latitude) {
        const [weather, forecast] = await Promise.all(
          fetchesDef.map((url) => fetch(url))
        );

        if (weather.ok && forecast.ok) {
          setTodayPos(await weather.json());
          const takeResponse = await forecast.json();
          setTodayPosFiveDay(takeResponse.list);
          setView(true);
          setView2(true);
        } else {
          throw new Error();
        }
      } else {
        const [weather, forecast] = await Promise.all(
          fetchesPos.map((url) => fetch(url))
        );

        if (weather.ok && forecast.ok) {
          setTodayPos(await weather.json());
          const takeResponse = await forecast.json();
          setTodayPosFiveDay(takeResponse.list);
          setView(true);
          setView2(true);
        } else {
          throw new Error();
        }
      }
    } catch {
      console.log("Nessuna citta");
    }
  };

  async function asyncSearch() {
    const fetches = [
      `https://api.openweathermap.org/data/2.5/forecast/?q=${search}&lang=it&units=metric&cnt=10&appid=${apiKey}`,
      `https://api.openweathermap.org/data/2.5/weather/?q=${search}&lang=it&units=metric&cnt=10&appid=${apiKey}`,
    ];

    try {
      console.log("Rispostaaaaa");
      const [forecast, weather] = await Promise.all(
        fetches.map((url) => fetch(url))
      );

      if (forecast.ok && weather.ok) {
        const takeResponse = await forecast.json();
        setTodayPosFiveDay(takeResponse.list);
        setTodayPos(await weather.json());
      } else {
        throw new Error();
      }
    } catch {
      console.log("Nessuna citta");
    }
  }

  function showHiddenDetail(click, select){
    setSelectBorder(click ? 'border-danger' : '')
    setShowDetail(click)
    setSelectH(select)
  }
 
  
  useEffect(()=> {
      if(selectH !== null)
      setShowDetail(true)
      setSelectBorder('border-danger')
    
  }, [selectH])

  
 

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      setLatitude(pos.coords.latitude);
      setLongitude(pos.coords.longitude);
    });

    if (search !== "") {
      asyncSearch();
    } else {
      takeLoc();
    }
  }, [latitude, search]);


  return (
    <>
      <Container className="mt-5" fluid>
        {view && <TopWeather todayPos={todayPos} />}
        {view2 && <ListHour selectBorder = {selectBorder} selectH ={selectH} showDetail = {showDetail} showHiddenDetail = {showHiddenDetail} todayPosFiveDay={todayPosFiveDay} />}
        {showDetail && <DetailH /> }
      </Container>
    </>
  );
}
