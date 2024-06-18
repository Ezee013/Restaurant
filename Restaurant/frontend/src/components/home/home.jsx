import { useNavigate } from "react-router-dom"
import { setToken } from "../../services/baseService";
import reservaService from "../../services/reservaService";
import { useEffect, useState } from "react";

export const Home = () => {

    const [reservas, setReservas] = useState([]);

    const navigate = useNavigate();

    const fetchReservas = async () => {
        reservaService.getReservas().then((data) => setReservas(data))
            .catch(error => console.error(error));
    }

    useEffect(() => {
        const loggedUser = window.localStorage.getItem("LogedUser")
        if (loggedUser) {
          const { token } = JSON.parse(loggedUser);
          setToken(token);
          fetchReservas();
        }else{
            navigate("/login");  
        }      
      },[navigate]);

    return (
        <div className="card text-center m-4">
            <div className="card-header d-flex justify-content-around pt-3">
                <ul className="nav nav-tabs card-header-tabs">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="true" href="#">Activas</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" aria-disabled="true">Historial</a>
                    </li>
                </ul>
                <button onClick={() => navigate("/reserva/create")} className="btn btn-outline-success">Crear reserva</button>
                
            </div>
            <div className="card-body row row-cols-1 row-cols-md-3 g-4 " >
                {reservas.map((reserva) => (
                    <div className="col-4 " key={reserva.idReserva}>
                        <div className="card text-center">
                            <div className="card-header bg-body-secondary">
                                <h5>RESERVA</h5>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">MESA</h5>
                                <p className="card-text">Numero: {reserva.mesa.numero}</p>
                                <p className="card-text">Personas: {reserva.nroPersonas}</p>
                                <p className="card-text">Ubicacion: {reserva.mesa.ubicacion}</p>
                                <button onClick={() => navigate(`/reserva/${reserva.idReserva}`)} className="btn btn-outline-primary">Ver reserva</button>
                            </div>
                            <div className="card-footer text-body-secondary bg-body-secondary">
                                Fecha: {reserva.fechaHora}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
  }
  