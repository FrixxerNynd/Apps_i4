import { Request, Response } from 'express';
import { Menu } from '../models/IMenu';
import { MENU, MenuItem} from '../models/menu';

export function getMenuByRole(req: Request, res: Response) {
  // 1) Obtenemos el rol (puede venir en query, body o req.user)
  const role = (req.query.role as string) || (req.body.role as string);
  if (!role) return res.status(400).json({ message: 'Falta el rol' });

  // 2) Filtramos los ítems en memoria
  const items = MENU.filter((item: MenuItem) =>
    item.roles.includes(role)
  );

  // 3) Devolvemos JSON
  return res.json(items);
}

export function createMenuItem(req: Request, res: Response) {
  const { name, url, icon, roles } = req.body;
  if( !name || !url || !icon || !roles ){
    return res.json({ message: 'Faltan datos' });
  }
  const newItem = new Menu({
    title: name,
    path: url,
    icon: icon,
    roles: roles
  });
  newItem.save();
  return res.json({ message: 'Item creado', menu: newItem });
}
