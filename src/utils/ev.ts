import "dotenv/config";

export const serverPort = process.env.SERVER_PORT as string;
export const nodeEnv = process.env.NODE_ENV as string;
export const accessSecret = process.env.ACCESS_TOKEN_SECRET as string;
export const accessExpiresIn = process.env.ACCESS_TOKEN_EXPIRES_IN as any;
export const refreshSecret = process.env.REFRESH_TOKEN_SECRET as string;
export const refreshExpiresIn = process.env.REFRESH_TOKEN_EXPIRES_IN as any;
