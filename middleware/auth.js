const jwt = require('jsonwebtoken')


// logins - token 

// resources that are protected 

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({success: false, message: "Unauthorized to perform action" });
    }

    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        if(!payload){
            return res
              .status(401)
              .json({
                success: false,
                message: "Authentication failed",
              });
        }

        req.user = {
            userId: payload.userId,
            email: payload.email,
        };

    } catch (error) {
        return res.status(401).json({
          success: false,
          message: "Authentication failed",
        });
    }


}

module.exports = auth