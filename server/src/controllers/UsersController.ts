import db from '../database/connections';
import { Request, Response } from 'express';

export default class ClassesController {
  async create(req: Request, res: Response) {

    const { name, email, password } = req.body;
    const trx = await db.transaction();

    try {
      

      await trx('users').insert({
        name,
        email,
        password
      });

      await trx.commit();

      return res.status(201).send();
        
    } catch (error) {
      await trx.rollback();

      return res.status(400).json({
        error: 'Unexpected error while creating new class'
      });
    }
  }
}
