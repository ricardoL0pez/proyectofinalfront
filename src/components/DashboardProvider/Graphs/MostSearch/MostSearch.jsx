import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import style from "./MostSearch.module.sass"; 

function MostSearch(props) {
  const {setLoading} = props;
  console.log("setLoading", setLoading)
  const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;
  const userLog = useSelector((state) => state.infoUserLog);
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await fetch(`${REACT_APP_API_URL}/stats/provider?idPeople=${userLog.idPeople}`);
        const data = await response.json();
        const serviciosMasBuscados = data.data.serviciosMasBuscados.map((option) => ({
          servicio: option.servicio || "Limpieza",
          cantidad: parseInt(option.cantidad, 10) || 0, 
        }));
       serviciosMasBuscados.sort((a, b) => b.cantidad - a.cantidad);
       const limitedStatistics = serviciosMasBuscados.slice(0, 4);
       setStatistics(limitedStatistics);
     if ( response.status === 200) {
        setLoading(true)}
      } catch (error) {
        console.error("Error al obtener los servicios mas buscados:", error);
      }
    };
    fetchEducation();
  }, []);


  const renderStatistics = () => {
    return statistics.map((item, index) => (
      <div key={index} className={style.statisticsItem}>
        <p className={style.statisticsValue}>{item.cantidad}</p>
        <p className={style.statisticsKey}>{item.servicio}</p>
      </div>
    ));
  };

  
  return (
    <div className={style.statisticsContainer}>
      <div className={style.statisticsBox}>{renderStatistics()}</div>
    </div>
  );
}

export default MostSearch;
