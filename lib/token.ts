import {v4 as uuidv4} from 'uuid';

export const generateVerificationToken = (email: string) => {
    const token = uuidv4();
    return token;
}