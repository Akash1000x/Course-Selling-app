import jwt from 'jsonwebtoken';

const SECRET = process.env.SECRET;

const authenticateJwt = (req,res,next) => {
    const autoHeader = req.headers.authorization;
    if(autoHeader){
        const token = autoHeader.split(' ')[1];
        jwt.verify(token,SECRET,(err,user) => {
            if(err){
                return res.sendStatus(403);
            }
            else{
                req.user = user;
                next();
            }
        });

    }else{
        res.sendStatus(401);
    }
};

export default authenticateJwt;