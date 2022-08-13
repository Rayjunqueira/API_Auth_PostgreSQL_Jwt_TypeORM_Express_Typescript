import { Request, Response } from 'express';
import { AppDataSource } from '../database/config';
import { User } from '../entities/User';
import bcrypt from 'bcryptjs';

class UpdateUserController {
    async update (req: Request, res: Response) {
        const { username, email, password } = req.body;

        const hashPassword = bcrypt.hashSync(password, 8);

        try {
            await AppDataSource.manager.update(User, req.params, {
                username: username,
                email: email,
                password: hashPassword,
            });

            return res.status(200).json('User updated!');

        } catch (err) {
            return res.status(500).json(err);
        }
    }
}

export default new UpdateUserController();