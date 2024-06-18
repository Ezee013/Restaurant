import Cliente from "../models/clientes.js";
import Mesa from "../models/mesas.js";
import Reserva from "../models/reservas.js";

export async function getReservas(idCliente){
    const reservas = await Reserva.findAll({
        include: [
            {
                model: Mesa,
                as: "mesa",
                required: true
            }
        ],
        //where: activas ? { activa: 1 } : {},
        where: {idCliente: idCliente}
        //limit: 5
    }
);
    return reservas;
};

export async function getReservaById(id){
    const reserva = await Reserva.findByPk(id,{
        include: [
            {
                model: Cliente,
                as: "cliente",
                required: true
            },
            {
                model: Mesa,
                as: "mesa",
                required: true
            }
        ]
    });

    if (!reserva) {
        throw new Error("cannotGet");
        };
        
    return reserva;
};

export async function createReserva(data){
    const reserva = await Reserva.create(data);
    return getReservaById(reserva.idReserva);
};

export async function updateReserva(id,data){
    await getReservaById(id);
    return Reserva.update(data, { where: {idReserva: id}})
};

export async function deleteReserva(id){
    await getReservaById(id);
    return Reserva.destroy( { where: { idReserva: id }});
};