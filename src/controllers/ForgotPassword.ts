import { Request, Response } from 'express';
import { AppDataSource } from '../database/config';
import { User } from '../entities/User';
import jwt from 'jsonwebtoken';
import sendEmail from '../utils/mailer';

class ForgotPassword {
    async execute (req: Request, res: Response) {
        const { email } = req.body;
        const secret = process.env.JWT_SECRET as string;

        try {
            const user = await AppDataSource.manager.findOneBy(User, {
                email: email,
            });

            if (!user) {
                return res.status(401).json('User does not exists! ');
            }

            const userId = user?.id;

            if (user.isActivate === false) {
                return res.status(401).json('This user is not active yet');
            }

            const token = jwt.sign({ id: user.id }, secret, {
                expiresIn: process.env.EXPIRES_FORGOTPASS,
            });

            try {
                await AppDataSource.manager.update(User, userId, {
                    tokenResetPass: token,
                });         
            } catch (err) {
                return res.status(500).json(err);
            }

            sendEmail({
                from: 'noreply@email.com',
                to: 'admin@gmail.com',
                subject: 'Reset your password',
                text: `Token sending email to reset password account from ${user.email}`,
                html: `<h2>Token sending email to reset password account from ${user.email}</h2>
                        <h4>${token}</h4>
                `,    
            });

            res.status(200).json('Request completed! Check your email to set your password!');

        } catch (err) {
            return res.status(500).json(err);
        }
    }
}

export default new ForgotPassword();