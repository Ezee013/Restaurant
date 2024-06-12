import appExpress from "express";
import { getReservas, getReservaById, createReserva, updateReserva, deleteReserva } from "../services/reservas.service.js";
import Mesa from "../models/mesas.js";
const reservasRouter = appExpress.Router();

reservasRouter.get("/", async (req ,res, next) => {
    try {
        // realizo la consulta a la base de datos.
        const reservas = await getReservas();

        // envío la respuesta con el resultado de la consulta.
        res.json(reservas);
    }
    catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ error: "Database error obteniendo reservas." });
    }
});

reservasRouter.get("/:id", async (req ,res, next) => {
    try {
        // realizo la consulta a la base de datos.
        const reserva = await getReservaById(req.params.id);

        // envío la respuesta con el resultado de la consulta.
        res.json(reserva);
    }
    catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ error: "Database error obteniendo la reserva." });
    }
});

reservasRouter.post("/", async (req, res, next) => {
    const { idMesa, nroPersonas } = req.body;
    const mesa = await Mesa.findByPk(idMesa);
    if (!mesa) {
        return res.status(404).json({ error: 'Mesa no encontrada' });
    }

    if(mesa.disponible){
        if(nroPersonas <= mesa.capacidad){
            try {
                const reserva = await createReserva(req.body);
                res.status(201).json(reserva);
            } catch (error) {
                next(error);
            }
        }else{
            res.json({res: "La cantidad de personas supera la capacidad de la mesa"});
        }
    }else{
        res.json({res: "La mesa no esta disponible"});
    }
});


reservasRouter.put("/:id", async (req, res, next) => {
    try {
        await updateReserva(req.params.id, req.body);
        res.status(200).json({res : "Reserva actualizada con exito"});
    } catch (error) {
        next(error);
    }
});


reservasRouter.delete("/:id", async (req, res, next) => {
    try {
        await deleteReserva(req.params.id);
        res.status(200).json({res : "Reserva eliminada con exito"});
    }
    catch (err) {
        next(err);
    }
});

export default reservasRouter;
