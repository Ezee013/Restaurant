import appExpress from "express";
import { getMenus, getMenuById, createMenu, updateMenu, deleteMenu} from "../services/menus.service.js";
const menusRouter = appExpress.Router();

menusRouter.get("/", async (req ,res, next) => {
    try {
        // realizo la consulta a la base de datos.
        const menus = await getMenus();

        // envío la respuesta con el resultado de la consulta.
        res.json(menus);
    }
    catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ error: "Database error obteniendo menus." });
    }
});

menusRouter.get("/:id", async (req ,res, next) => {
    try {
        // realizo la consulta a la base de datos.
        const menu = await getMenuById(req.params.id);

        // envío la respuesta con el resultado de la consulta.
        res.json(menu);
    }
    catch (error) {
        next(error);
    }
});

menusRouter.post("/", async (req, res, next) => {
    try {
        const menu = await createMenu(req.body);
        res.status(201).json(menu);
    } catch (error) {
        next(error);
    }
});

menusRouter.put("/:id", async (req, res, next) => {
    try {
        await updateMenu(req.params.id, req.body);
        res.status(200).json({res : "Menu actualizado con exito"});
    } catch (error) {
        next(error);
    }
});


menusRouter.delete("/:id", async (req, res, next) => {
    try {
        await deleteMenu(req.params.id);
        res.status(200).json({res : "Menu eliminado con exito"});
    }
    catch (err) {
        next(err);
    }
});

export default menusRouter;
