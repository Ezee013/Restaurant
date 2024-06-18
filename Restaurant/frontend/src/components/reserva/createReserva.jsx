import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import reservaService from '../../services/reservaService';
import { useEffect, useState } from 'react';
import { setToken } from '../../services/baseService';



export const CreateReserva = () => {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const mesaSeleccionada = location.state?.mesaSeleccionada;

    useEffect(() => {
        const loggedUser = window.localStorage.getItem("LogedUser")
        if (loggedUser) {
          const { token } = JSON.parse(loggedUser);
          setToken(token);
        }else{
            navigate("/login");  
        }
        if (mesaSeleccionada) {
            setValue('mesa', mesaSeleccionada.idMesa);
          }
        }, [mesaSeleccionada, setValue, navigate]);

    const onSubmit = async (data) => {
        try {
          const req = {
            fechaHora: data.date,
            nroPersonas: data.personas,
            idMesa: data.mesa
          };
          await reservaService.createReserva(req);
          window.alert("Reserva creada con exito");
          navigate("/home"); 
        } catch (error) {
            if (error.response) {
              if (error.response.status === 404) {
                setErrorMessage(error.response.data.res);
              } else if (error.response.status === 409) {
                setErrorMessage(error.response.data.res);
              } else {
                setErrorMessage("Error al crear la reserva");
              }
            } else {
              setErrorMessage("Error de red al intentar crear la reserva");
            }
            console.error("Error al crear reserva:", error);
          }
        };

    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
        <div className="card text-center border border-3" style={{width: '70%'}}>
          <div className="card-header bg-secondary" >
            <div className='mx-5'>
              <img src="../src/assets/react.svg" alt="Logo" width="50" className="img-fluid"/>
            </div>
            <div className='px-5'>
                <h3>RESTAURANT</h3>
            </div>
          </div>  
            {errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            )}
            <div className="card-body">
            <h1>CREAR RESERVA</h1>
                <form id="login" onSubmit={handleSubmit(onSubmit)}>
                    <div className="m-5 mb-4">
                        <label htmlFor="personas" className="form-label">Mesa</label>
                        <input
                            type="text"
                            className={`form-control m-2 ${errors.mesa ? 'is-invalid' : ''} ${mesaSeleccionada ? "border border-primary" : ""}`}
                            value={mesaSeleccionada ? mesaSeleccionada.idMesa : ''}
                            readOnly
                            {...register('mesa', { required: true })}
                        />
                        {errors.mesa && <div className="invalid-feedback">Por favor, seleccione una mesa</div>}
                        <button onClick={() => navigate("/mesas/create/none")} className="btn btn-primary">Seleccionar mesa</button>
                    </div>
                    <div className="m-5">
                    <label htmlFor="date" className="form-label">Fecha</label>
                    <input type="date"  id="date" name="date" className={`form-control m-2 ${errors.date ? 'is-invalid' : ''}`} autoComplete="date" {...register('date', { required: true })}/>
                    {errors.date && <div className="invalid-feedback">Por favor, ingrese una fecha</div>}
                    </div>
                    <div className="m-5 mb-4">
                    <label htmlFor="personas" className="form-label">Cantidad de Personas</label>
                    <input type="number" id="personas" name="personas" className={`form-control m-2 ${errors.personas ? 'is-invalid' : ''}`} placeholder="Ingrese la cantidad de personas" autoComplete="personas" {...register("personas", { required: true })}/>
                    {errors.personas && <div className="invalid-feedback">Por favor, ingrese la cantidad de personas</div>}
                    </div>
                    <button type="submit" className="btn btn-success">Crear</button>
                </form>
            </div>
            <div className="card-footer text-body-secondary bg-body-secondary py-3"> 
                <Link to="/home">No quiero hacer una reserva</Link>
            </div>
        </div>
      </div>
  )
}
