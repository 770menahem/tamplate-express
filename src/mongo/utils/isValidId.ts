import { Types } from 'mongoose';

export function isValidId(id: string): boolean {
    return Types.ObjectId.isValid(id);
}
