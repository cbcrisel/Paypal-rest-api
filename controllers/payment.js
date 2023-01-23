const {response,request} = require('express');
const axios = require('axios');


const createOrder = async(req=request,res=response)=>{
    try {
        const order={
            intent: "CAPTURE",
            purchase_units:[
                {
                    amount: {
                        currency_code:'USD',
                        value:'15'
                    },
                    description:'Membresia a Criselillos'
                }
            ],
            application_context:{
                brand_name:'criselillos.com',
                landing_page:'LOGIN',
                user_action:'PAY_NOW',
                return_url:'http://localhost:3000/api/capture-order',
                cancerl_url:'https://www.google.com/'
            }
        }
        
        const params = new URLSearchParams();
        params.append('grant_type','client_credentials');
        
        const {data:{access_token}}= await axios.post('https://api-m.sandbox.paypal.com/v1/oauth2/token',params,{
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            },
            auth:{
                username:process.env.PP_CLIENT,
                password:process.env.PP_SECRET
            }
        });
    
        const response = await axios.post(process.env.PAYPAL_API+'/v2/checkout/orders',order,{
            headers:{
                Authorization: `Bearer ${access_token}`
            }
        })
        res.json(response.data)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:'Server Error'
        })
    }
    
}

const captureOrder = async(req=request,res=response)=>{

    const {token, PayerID}= req.query;

    const params = new URLSearchParams();
    params.append('grant_type','client_credentials');
        
    const {data:{access_token}}= await axios.post('https://api-m.sandbox.paypal.com/v1/oauth2/token',params,{
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        },
        auth:{
            username:process.env.PP_CLIENT,
            password:process.env.PP_SECRET
        }
    });

    const response= await axios.post(process.env.PAYPAL_API+'/v2/checkout/orders/'+token+'/capture',{},{
        headers:{
            Authorization: `Bearer ${access_token}`
        }
    })
    console.log(reponse.data)
    res.json({
        msg:'ALLLLLLV'
    })
}

const cancelOrder = (req=request,res=response)=>{
    res.send('canceling order')
}

module.exports={
    createOrder, captureOrder, cancelOrder
}