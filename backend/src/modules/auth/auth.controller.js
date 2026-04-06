import * as authService from './auth.model.js'


export const login=async(req, res)=>{
    
    try {
        const {name, password, email}= req.body;

        const {userData, token} = await authService.login({name, password, email});
        
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

