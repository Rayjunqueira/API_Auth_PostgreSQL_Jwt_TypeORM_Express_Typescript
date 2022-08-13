import { Request, Response } from 'express';
import { User } from "../entities/User";
import sendMail from '../utils/mailer';
import { AppDataSource } from "../database/config";
import jwt from 'jsonwebtoken';

class CreateUserController {
    async store(req: Request, res: Response) {
        const { username, email, password } = req.body;
        const user = new User();
        const secret = process.env.JWT_SECRET as string;
    
        try {
            user.username = username;
            user.email = email;
            user.password = password;

            const userExists = await AppDataSource.manager.findOneBy(User, {
                email: user.email
            });

            const token = jwt.sign({ id: user.id }, secret, {
                expiresIn: process.env.EXPIRES_ACTIVE,
            });

            user.tokenActivate = token;
        
            if (userExists) {
                return res.status(409).json('User already exists!')
            } else {
                await AppDataSource.manager.save(user);
            }

            sendMail({
                from: 'noreply@email.com',
                to: 'admin@gmail.com',
                subject: 'Activate new account',
                text: `Token sending email to activate account from ${user.email}`,
                html: `<h2>Token sending email to activate account from ${user.email}</h2>
                        <h4>${token}</h4>
                `,    
            })

            return res.status(200).json('User created. Active now!');

        } catch (err) {
            return res.status(500).json(user);
        }
    }
}

export default new CreateUserController();