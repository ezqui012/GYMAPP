import * as authService from './auth.service.js'


export const login=async(req, res)=>{
    
    try {
        const {email, password}= req.body;

        const {userData, token} = await authService.logUser({email,password});
        
        res.cookie('access_token', token,{
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60
        }).send({userData, token})

    } catch (error) {
        res.status(401).send(error.message);
    }
}

