import { JwtPayload, sign, verify } from "jsonwebtoken";


export class JwtConfig {
    static SignJWT<T extends object>(payload: T): string {
        const token = sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TIME });
        return token;
    }

    static decodeJWT = <T extends JwtPayload>(token: string): T => {
        try {
            const result = verify(token, process.env.JWT_SECRET);
            return result as T
        } catch (error) {
            return error
        }
    }
}