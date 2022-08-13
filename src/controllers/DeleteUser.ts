import { Request, Response } from 'express';
import { AppDataSource } from '../database/config';
import { User } from '../entities/User';
 
class DeleteUserController {
    async delete (req: Request, res: Response) {
        try {
            await AppDataSource.manager.delete(User, req.params);
            return res.status(200).json('User deleted!');
        } catch (err) {
            return res.status(500).json(err);
        }
    }
}

export default new DeleteUserController();