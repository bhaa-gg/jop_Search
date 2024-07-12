
import bcrypt from 'bcrypt';


export const hashPass = async (req, res, next) => {
    let { password } = req.body;
    req.password = bcrypt.hashSync(password, +process.env.SALT_ROUNDS)
    return next();
}

export const comparePass = async (req, res, next) => {
    let { password } = req.body;
    req.password = bcrypt.hashSync(password, +process.env.SALT_ROUNDS)
    return next();
} 