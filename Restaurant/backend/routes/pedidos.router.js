import appExpress from "express";
import { getPedidos, getPedidoById, createPedido, updatePedido, deletePedido} from "../services/pedidos.service.js";
import { getMenuById } from "../services/menus.service.js";
import { getReservaById } from "../services/reservas.service.js";

const pedidosRouter = appExpress.Router();

pedidosRouter.get("/", async (req ,res, next) => {
    try {
        // realizo la consulta a la base de datos.
        const pedidos = await getPedidos();

        // envío la respuesta con el resultado de la consulta.
        res.json(pedidos);
    }
    catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ error: "Database error obteniendo pedidos." });
    }
});

pedidosRouter.get("/:id", async (req ,res, next) => {
    try {
        // realizo la consulta a la base de datos.
        const pedido = await getPedidoById(req.params.id);

        // envío la respuesta con el resultado de la consulta.
        res.json(pedido);
    }
    catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ error: "Database error obteniendo la reserva." });
    }
});

pedidosRouter.post("/", async (req, res, next) => {

    const {idReserva, idMenu, cantidad} = req.body;
    const menu = await getMenuById(idMenu);
    const reserva = await getReservaById(idReserva);
    
    if(!reserva) throw new Error("La reserva asociada no existe");
    if (!menu) throw new Error('El menú asociado al pedido no existe');
        
    req.body.precioTotal = menu.precio * cantidad;

    try {
        console.log(req.body)
        const pedido = await createPedido(req.body);
        res.status(201).json(pedido);
    } catch (error) {
        next(error);
    }
});

pedidosRouter.put("/:id", async (req, res, next) => {
    try {
        await updatePedido(req.params.id, req.body);
        res.status(200).json({res : "Pedido actualizado con exito"});
    } catch (error) {
        next(error);
    }
});


pedidosRouter.delete("/:id", async (req, res, next) => {
    try {
        await deletePedido(req.params.id);
        res.status(200).json({res : "Pedido eliminado con exito"});
    }
    catch (err) {
        next(err);
    }
});

export default pedidosRouter;
