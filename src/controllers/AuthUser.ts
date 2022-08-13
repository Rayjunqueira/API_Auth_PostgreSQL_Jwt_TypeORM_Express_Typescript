import { Request, Response } from 'express';
import { AppDataSource } from '../database/config';
import { User } from '../entities/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class AuthUserController {
    async store (req: Request, res: Response) {
        const { email, password } = req.body;
        const secret = process.env.JWT_SECRET as string;

        try {
            const user = await AppDataSource.manager.findOneBy(User, {
                email: email,
            });

            if (!user) {
                return res.status(401).json('User does not exist');
            }

            if (user.isActivate === false) {
                return res.status(401).json('This account is not activated yet, check your email!'); 
            }

            const isValidPassword = await bcrypt.compare(password, user.password);

            if (!isValidPassword) {
                return res.status(401).json('Invalid password');
            }

            const token = jwt.sign({ id: user.id }, secret, {
                expiresIn: process.env.EXPIRES_LOGIN,
            })

            return res.status(200).json({
                user,
                token,
            });

        } catch (err) {
            return res.status(500).json(err);
        }
    }
}

export default new AuthUserController();