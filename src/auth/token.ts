import { sign } from 'jsonwebtoken';
import config from '../config/index';
import { encrypt } from '../utils/encrypt';

// generate token jwt
export const generateToken = (userId: string) => {
    const payload = {
        userIdEnc: encrypt(userId),
    };

    return sign(payload, config.keys.tokenKey, { expiresIn: '24h' });
};
