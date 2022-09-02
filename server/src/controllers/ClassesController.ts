import db from '../database/connections';
import convertHourToMinutes from '../utils/convertHourToMinutes';
import { Request, Response } from 'express';

// interface para lidar com o objeto schedule
interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default class ClassesController {
  async create(req: Request, res: Response) {
    const { name, avatar, whatsapp, bio, subject, cost, schedule } = req.body;

    const trx = await db.transaction();

    try {
      const insertedUsersIds = await trx('users').insert({
        name,
        avatar,
        whatsapp,
        bio
      });

      // Retorna o id do usuario cadastrado, utilizamos pq o id é fk da tabela classes
      const user_id = insertedUsersIds[0];

      const insertedClassesIds = await trx('classes').insert({
        subject,
        cost,
        user_id
      });

      const class_id = insertedClassesIds[0];

      // Modifica objetivo schedule para transformar o horario que está em string para minutos
      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          to: convertHourToMinutes(scheduleItem.to),
          from: convertHourToMinutes(scheduleItem.from)
        };
      });

      // O insert aceita um array para inseriamos varios registros, entao não é necessario uma estrutura de loop
      await trx('class_schedule').insert(classSchedule);

      await trx.commit();

      return res.status(201).send();
    } catch (error) {
      await trx.rollback();

      return res.status(400).json({
        error: 'Unexpected error while creating new class'
      });
    }
  }

  async index(req: Request, res: Response) {
    const filters = req.query;

    // Caso o usuario nao escolha um filtro para buscar as aulas retorna um erro
    if (!filters.week_day || !filters.subject || !filters.time) {
      return res.status(400).json({
        error: 'Missing filters to search classes'
      });
    }

    const timeInMinutes = convertHourToMinutes(filters.time as string);

    const classes = await db('classes')
      .whereExists(function () {
        this.select('class_schedule.*')
          .from('class_schedule')
          .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
          .whereRaw('`class_schedule`.`week_day` = ??', [
            Number(filters.week_day)
          ])
          .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
          .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes]);
      })
      .where('classes.subject', '=', filters.subject)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select(['classes.*', 'users.*']);

    return res.send(classes);
  }
}
