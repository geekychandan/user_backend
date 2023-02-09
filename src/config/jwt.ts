import jwt from 'jsonwebtoken';

 const generateJWT = (payload: object) => {
return jwt.sign(payload, 'process.env.JWT_SECRET');
};

export const verifyToken = (token: string) => {
    try {
      return jwt.verify(token, 'process.env.JWT_SECRET');
    } catch (error) {
      return null;
    }
  };

export default generateJWT;