import Menu from "../models/menus.js";

export async function getMenus(){
    const menus = await Menu.findAll();
    return menus;
};

export async function getMenuById(id){
    const menu = await Menu.findByPk(id);
    return menu;
};

export async function createMenu(data){
    const menu = await Menu.create(data);
    return getMenuById(menu.idMenu);
};

export async function updateMenu(id, data){
    return Menu.update(data, { where: { idMenu: id } });
};

export async function deleteMenu(id){
    return Menu.destroy({ where: {idMenu: id}});
};