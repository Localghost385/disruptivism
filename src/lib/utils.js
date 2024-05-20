import { randomBytes } from 'node:crypto';

export const serializeNonPOJOs = (obj) => {
	return structuredClone(obj);
};

export const generateUsername = () => {
	return randomBytes(4).toString('hex');
};
