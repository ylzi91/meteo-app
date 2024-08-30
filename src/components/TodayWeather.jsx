import { useEffect, useState } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import TopWeather from "./TopWeather";
import ListHour from "./ListHour";

export default function TodayWeather( { search } ) {
  const [todayPos, setTodayPos] = useState(null);
  const [todayPosFiveDay, setTodayPosFiveDay] = useState(null)
  const [view, setView] = useState (false)
  const [view2, setView2] = useState (false)
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const apiKey = "367452c59bda6872606aae942e5fe385";
  const takeLoc = async () => {
    try {
      if (!latitude) {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather/?q=Roma&lang=it&units=metric&appid=${apiKey}`
        );
        console.log(response);
        if (response.ok) {
          setTodayPos(await response.json());
          setView(true)
          console.log(todayPos.main.temp);
        } else {
          throw new Error();
        }
      }
      else {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather/?lat=${latitude}&lon=${longitude}&lang=it&units=metric&appid=${apiKey}`
          );
          console.log(response);
          if (response.ok) {
            setTodayPos(await response.json());
            setView(true)
            console.log(todayPos.main.temp);
          } else {
            throw new Error();
          }

      }
    } catch {
      console.log("Nessuna citta");
    }
  };

  async function takeFiveDay() {
    try {
        if (!latitude) {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast/?q=Roma&lang=it&units=metric&cnt=10&appid=${apiKey}`
          );
          console.log(response);
          if (response.ok) {
            const takeResponse = await response.json()  
            setTodayPosFiveDay(takeResponse.list);
            setView2(true)
          } else {
            throw new Error();
          }
        }
        else {
          const response = await fetch(
              `https://api.openweathermap.org/data/2.5/forecast/?lat=${latitude}&lon=${longitude}&lang=it&units=metric&cnt=10&appid=${apiKey}`
            );
            console.log(response);
            if (response.ok) {
              const takeResponse = await response.json()  
              setTodayPosFiveDay(takeResponse.list);
              setView2(true)
              console.log(todayPos.main.temp);
            } else {
              throw new Error();
            }
  
        }
      } catch {
        console.log("Nessuna citta");
      }


  }

  async function asyncSearch() {

    try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast/?q=${search}&lang=it&units=metric&cnt=10&appid=${apiKey}`
          );
          const response2 = await fetch(
            `https://api.openweathermap.org/data/2.5/weather/?q=${search}&lang=it&units=metric&cnt=10&appid=${apiKey}`
          );
          console.log(response);
          if (response.ok && response2.ok) {
            const takeResponse = await response.json()  
            setTodayPosFiveDay(takeResponse.list);
            setTodayPos(await response2.json())
            setView(true)
            setView2(true)
          } else {
            throw new Error();
          }
      } catch {
        console.log("Nessuna citta");
      }

    
  }
  

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      setLatitude(pos.coords.latitude);
      setLongitude(pos.coords.longitude);
    });
 

    if (search !== ''){
        asyncSearch()
        
    }
    else {
    takeLoc();
    takeFiveDay()
    }



  }, [latitude, search]);

  return (
    <>
      <Container className="mt-5" fluid>
      {view  &&  <TopWeather todayPos={todayPos} />}
           {view2 && <ListHour todayPosFiveDay = {todayPosFiveDay} />} 

        </Container>
      
    </>
  )
  ;
}
