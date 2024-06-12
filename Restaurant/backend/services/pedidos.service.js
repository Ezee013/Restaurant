import Pedido from "../models/pedidos.js";

export async function getPedidos(){
    const pedidos = await Pedido.findAll();
    return pedidos;
};

export async function getPedidoById(id){
    const pedido = await Pedido.findByPk(id);
    return pedido;
};

export async function createPedido(data){
    const pedido = await Pedido.create(data);
    return getPedidoById(pedido.idPedido);
};

export async function updatePedido(id, data){
    return Pedido.update(data, { where: { idPedido: id } });
};

export async function deletePedido(id){
    return Pedido.destroy({ where: {idPedido: id}});
};