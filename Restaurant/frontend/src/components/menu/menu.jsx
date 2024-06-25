import { useNavigate, useParams } from "react-router-dom"
import { setToken } from "../../services/baseService";
import { useEffect, useState } from "react";
import menuService from "../../services/menuService";
import categoriaService from "../../services/categoriaService";

export const Menu = () => {

    const [menus, setMenus] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [filtro, setFiltro] = useState("");
    const navigate = useNavigate();
    const {mode, idReserva, idPedido}  = useParams();

    const handleMenu = (menu) => {
        if(mode === "create") {
            navigate(`/pedido/create/${idReserva}`, { state: { menuSeleccionado: menu } })
        } else if (mode === "update"){
            navigate(`/pedido/update/${idReserva}/${idPedido}`, { state: { menuSeleccionado: menu} })
        }
    }

    const fetchMenus = async (filter) => {
        await menuService.getMenusFiltered(filter)
                .then((data) => {
                setMenus(data)
                })
                .catch(error => console.error(error.error));
    }

    const fetchCategorias = async () => {
        await categoriaService.getCategorias()
            .then((data) => {
                setCategorias(data);
            })
            .catch(error => console.error(error.error));
    }

    useEffect(() => {
        const loggedUser = window.localStorage.getItem("LogedUser")
        if (loggedUser) {
          const { token } = JSON.parse(loggedUser);
          setToken(token);
          fetchMenus(filtro);
          fetchCategorias();
        }else{
            navigate("/login");  
        }   
      },[navigate, filtro]); 

        if (!menus.length) {
            return <div className="alert alert-secondary m-auto" role="alert">No se pudieron obtener los menus...</div>;
        }

    return (
        <div className="card text-center m-4">
            <div className="card-header d-flex justify-content-around">
                <ul className="nav nav-tabs card-header-tabs w-70">
                    {categorias.map((categoria) => (
                        <li className="nav-item" key={categoria.idCategoria}>
                            <a onClick={() => {setFiltro(categoria.idCategoria);}} className="nav-link active fw-bolder text-dark" >{categoria.nombre}</a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="card-body row row-cols-1 row-cols-md-3 g-4 container-fluid">
                {menus.map((menu) => (
                    <div className="" key={menu.idMenu}>
                        <div className="card text-center">
                            <div className="card-header bg-body-secondary">
                                <h5 className="fw-bold fs-5">MENU</h5>
                            </div>
                            <div className="card-body">
                                <p className="card-text fw-semibold">{menu.nombre}</p>
                                <p className="card-text">Descripcion: {menu.descripcion}</p>
                                <p className="card-text">Precio: {menu.precio}</p>
                                <button onClick={() => handleMenu(menu)} className="btn btn-outline-success">Seleccionar</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
  }