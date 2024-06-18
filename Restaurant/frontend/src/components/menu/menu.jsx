import { useNavigate, useParams } from "react-router-dom"
import { setToken } from "../../services/baseService";
import { useEffect, useState } from "react";
import menuService from "../../services/menuService";

export const Menu = () => {

    const [menus, setMenus] = useState([]);
    const navigate = useNavigate();
    const {idReserva}  = useParams();

    const handleMenu = (menu) => {
        navigate(`/pedido/create/${idReserva}`, { state: { menuSeleccionado: menu } })
    }

    const fetchMenus = async () => {
        await menuService.getMenus()
                .then((data) => {
                setMenus(data)
                })
                .catch(error => console.error(error.error));
    }

    useEffect(() => {
        const loggedUser = window.localStorage.getItem("LogedUser")
        if (loggedUser) {
          const { token } = JSON.parse(loggedUser);
          setToken(token);
          fetchMenus();
        }else{
            navigate("/login");  
        }   
      },[navigate]); 

        if (!menus) {
            return <div className="alert alert-secondary" role="alert">Loading...</div>;
        }

    return (
        <div className="card text-center m-4">
            <div className="card-header d-flex justify-content-around">
                <ul className="nav nav-tabs card-header-tabs w-70">
                <li className="nav-item">
                    <a className="nav-link active fw-bold" aria-current="true"  href="#">MENUS</a>
                </li>
                </ul>
            </div>
            <div className="card-body row row-cols-1 row-cols-md-3 g-4 container-fluid">
                {menus.map((menu) => (
                    <div className="col-4" key={menu.idMenu}>
                        <div className="card text-center">
                            <div className="card-header bg-body-secondary">
                                <h5 className="fw-bold fs-5">MENU {menu.idMenu}</h5>
                            </div>
                            <div className="card-body">
                                <p className="card-text">Nombre: {menu.nombre}</p>
                                <p className="card-text">Descripcion: {menu.descripcion}</p>
                                <p className="card-text">Precio: {menu.precio}</p>
                                <p className="card-text">Categoria: {menu.categoria.nombre}</p>
                                <button onClick={() => handleMenu(menu)} className="btn btn-outline-success">Seleccionar menu</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
  }