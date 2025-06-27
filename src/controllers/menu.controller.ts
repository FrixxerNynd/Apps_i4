import { Request, Response } from 'express';
import { MENU, MenuItem }      from '../models/menu';

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
