import bcrypt from 'bcrypt';
import { NextFunction } from 'express';
import { User } from '../models/user';
import dbModuleInstance from '../db';
import { sign, verify } from 'jsonwebtoken';
import { throwError } from '../helper/error';

const userRepository = dbModuleInstance.getRepository(User);

// hashpassword function
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

// compare hash password function
export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

export const isLogin = async (req: any, res: any, next: NextFunction) => {
  try {
    const token = req.header('Authorization');
    const secret = process.env.JWTPASSCODE as string;

    // Check if token is provided
    if (!token) {
      return res.status(400).json({ error: 'Authorization token is required' });
    }

    // Decode and verify the token
    const details = verify(token, secret) as { userId: string; userEmail: string }; // Verifies and decodes

    // Check if decoding was successful
    if (!details || !details?.userId || !details?.userEmail) {
      return res.status(400).json({ error: 'Invalid token format' });
    }

    const { userId, userEmail } = details;

    // Find user in DB with email and userId
    const user = await userRepository.createQueryBuilder('user').where('user.id = :userId AND user.email = :userEmail', { userId, userEmail }).getOne();

    if (!user) {
      return res.status(401).json({ error: 'User not found, please log in again' });
    }


    // // Attach user to the request object
    // req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (err: any) {
    console.error('Error in isAdmin middleware:', err);
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired, please log in again' });
    }
    return res.status(500).json({ error: 'Failed to process token' });
  }
};



export async function generateToken(
  email: string | undefined,
  password: string | undefined
): Promise<string | undefined> {
  const secretKey = process.env.JWTPASSCODE as string;

  if (!secretKey) {
    throwError('JWT secret key (JWTPASSCODE) is not defined in the environment variables.', 400);
  }

  if (!password || !email) {
    throwError("User ID and email are required for token generation.");
  }

  try {
    const jwtToken = sign(
      { userpassword: password, userEmail: email },
      secretKey,
      { expiresIn: '24h' } // Optional: Set token expiration time
    );

    return jwtToken;
  } catch (error) {
    console.error("Failed to generate JWT:", error);
  }
}

// Compare hashed password
export const compareHash = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
