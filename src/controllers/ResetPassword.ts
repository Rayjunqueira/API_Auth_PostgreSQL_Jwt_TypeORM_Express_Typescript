import { Request, Response } from "express";
import { AppDataSource } from '../database/config';
import { User } from '../entities/User';
import bcrypt from 'bcryptjs';

class ResetPassword {
    async execute (req: Request, res: Response) {
        const { email, token, password } = req.body;

        try {
            const user = await AppDataSource.manager.findOneBy(User, {
                email: email,
            });

            if (!user) {
                return res.status(401).json('Email does not exists in database! ');
            }

            const userId = user?.id;

            if (user.isActivate === false) {
                return res.status(401).json('This user is not active yet');
            }

            if (token != user.tokenResetPass) {
                return res.status(401).json('Invalid token account!');
            }

            const newPass = bcrypt.hashSync(password, 8);

            try {
                await AppDataSource.manager.update(User, userId, {
                    password: newPass,
                    tokenResetPass: '',
                });
                return res.status(200).json('Your password has been updated!');        
         
            } catch (err) {
                return res.status(500).json(err);
            }

        } catch (err) {
            return res.status(500).json(err);
        }
    }
}

export default new ResetPassword();