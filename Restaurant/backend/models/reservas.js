import { DataTypes } from "sequelize";
import sequelize from "../data/db.js";

const Reserva = sequelize.define("Reserva", {
    idReserva: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "ID_RESERVA"
    },
    idCliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "ID_CLIENTE"
    },    
    idMesa: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "ID_MESA"
    },
    fechaHora: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "FECHA_HORA"
    },
    nroPersonas: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "NRO_PERSONAS"
    }
},{
    timestamps: false,
    tableName: "RESERVAS"

});

export default Reserva;