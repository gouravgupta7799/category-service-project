import dbModuleInstance from '../db';
import { User } from '../models/user';
import { Repository } from 'typeorm';
import { throwError } from '../helper/error';


// User service class
export class UserService {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = dbModuleInstance.getRepository(User);
    }


    public async loginUser(
        req: { userEmail: string; password: string },
        res: any
    ): Promise<string | undefined> {
        try {
            const { userEmail, password } = req;

            // Validate inputs
            if (!userEmail || !password) {
                throwError('Email and password are required', 400);
            }
            let user, pass = false;

            if (userEmail != 'admin@codesfortomorrow.com') {
                throwError(`User with this email does not exist: ${userEmail}`, 404);
            } else if (password != 'Admin123!@#') {
                throwError('Password is incorrect', 403);
            }

            if (user && pass) {
                return 'succefully login'
            }

        } catch (error) {
            console.error('Error during user login:', error);
            throwError(`${error}`, 500);
        }
    }
}