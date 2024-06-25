import { useNavigate, useParams } from "react-router-dom"
import { setToken } from "../../services/baseService";
import { useEffect, useState } from "react";
import mesaService from "../../services/mesaService";

export const Mesa = () => {

    const [mesas, setMesas] = useState([]);

    const navigate = useNavigate();

    const {mode, idReserva} = useParams();

    const handleMesa = (mesa) => {
        if(mode === "create") {
            navigate("/reserva/create", { state: { mesaSeleccionada: mesa} })
        } else if (mode === "update"){
            navigate(`/reserva/update/${idReserva}`, { state: { mesaSeleccionada: mesa} })
        }
    }

    const fetchMesa = async () => {
        await mesaService.getMesas()
                .then((data) => {
                setMesas(data)
                })
                .catch(error => console.error(error.error));
    }

    useEffect(() => {
        const loggedUser = window.localStorage.getItem("LogedUser")
        if (loggedUser) {
            const { token } = JSON.parse(loggedUser);
            setToken(token);
            fetchMesa();
        }else{
            navigate("/login");  
        }
      }, [navigate]);

    if (!mesas.length) {
        return <div className="alert alert-secondary m-auto" role="alert">No se pudieron obtener las mesas...</div>;
    }

    return (
      <div className="container-fluid">
        <div className="card text-center m-4">
            <div className="card-header d-flex justify-content-around">
                <ul className="nav nav-tabs card-header-tabs w-70">
                <li className="nav-item">
                    <a className="nav-link active fw-bold" aria-current="true" href="#">DISPONIBLES</a>
                </li>
                </ul>
            </div>
            <div className="card-body row row-cols-1 row-cols-md-4 g-4 container-fluid">
                {mesas.map((mesa) => (
                    <div className="" key={mesa.idMesa}>
                        <div className="card text-center">
                            <div className="card-header bg-body-secondary">
                                <h5 className="fw-bold">MESA</h5>
                            </div>
                            <div className="card-body">
                                <p className="card-text fw-bold"> {mesa.numero}</p>
                                <p className="card-text">Capacidad: {mesa.capacidad}</p>
                                <p className="card-text">Ubicacion: {mesa.ubicacion}</p>
                                <button onClick={() => handleMesa(mesa)} className="btn btn-outline-success">Seleccionar mesa</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    )
  }