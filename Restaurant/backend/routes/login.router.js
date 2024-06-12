import appExpress from "express";
import { getClienteByMail, checkClientePassword, createCliente } from "../services/clientes.service.js";
import jwt from "jsonwebtoken";

const loginRouter = appExpress.Router();

function generarJwt(usr) {
    const payload = {
        id: usr.idCliente,
        userName: usr.mail,
        nombre: `${usr.nombre} ${usr.apellido}`,
        admin: (usr.idCliente === 1)
    };

    return jwt.sign(payload, process.env.SECRET);
};

loginRouter.post("/login", async (req, res) => {
    // console.log(req.body);
    const { userName, password } = req.body;

    const cliente = checkClientePassword(userName, password);

    if (!cliente) {
        res.status(401).send({
            error: "Usuario o contraseña inválidos"
        });
        return res;
    };

    res.json({
        userName: cliente.mail,
        nombre: `${cliente.nombre} ${cliente.apellido}`,
        token: generarJwt(cliente)
    });

    return res;
});

loginRouter.post("/register", async (req, res, next) => {
    try {
        const { mail } = req.body;
        const usrExistente = await getClienteByMail(mail);
        console.log(usrExistente);
        if (usrExistente !== null) {
            console.log("entro");
            res.status(401).send({
                error: "Cliente ya registrado"
            });
            return false;
        }
        console.log(req.body);
        const cliente = await createCliente(req.body);

        res.status(201).json(cliente);
    }
    catch (err) {
        next(err);
    }
    return true;
});

export default loginRouter;