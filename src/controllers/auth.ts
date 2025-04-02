import { generateToken } from "../middelwares/authMidel";
import { UserService } from '../services/user.service';

const userServiceInstance = new UserService();


export const login = async (req, res): Promise<any> => {
    let { userEmail, password } = req.body;

    try {
        // Assuming signupUser expects some data from req.body
        const user = await userServiceInstance.loginUser(req.body, res);
        const loginUser = {
            email: userEmail,
            token: await generateToken(userEmail, password),
        };
        console.log('User logged in successfully:', loginUser);
        res.status(200).json({ message: 'User login up successfully', user: loginUser });
    } catch (error: any) {
        // Log the error with stack trace for debugging
        console.error('Error during user login:', error);

        // Send a generic error message, without exposing internal details
        res.status(error.statusCode || 500).json({
            error: error.message,
            message: 'An error occurred during user login.',
        });
    }
}

