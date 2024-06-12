import Reserva from "../models/reservas.js";

export async function getReservas(){
    const reservas = await Reserva.findAll();
    return reservas;
};

export async function getReservaById(id){
    const reserva = await Reserva.findByPk(id);
    return reserva;
};

export async function createReserva(data){
    try {
        const reserva = await Reserva.create(data);
        return getReservaById(reserva.idReserva);
    } catch (error) {
        return error;
    }
};

export async function updateReserva(id,data){
    return Reserva.update(data, { where: {idReserva: id}})
};

export async function deleteReserva(id){
    return Reserva.destroy( { where: { idReserva: id }});
};