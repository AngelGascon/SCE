<template>
    <div>
    <div id="paypal-button-container"></div>
    <div v-if="success" class="alert alert-success">
      <strong>Success!</strong> Payment successfuly done
    </div>
    <div v-if="error" class="alert alert-danger">
      <strong>Ooops!</strong>  Something went wrong!
    </div>
    </div>
    </template>
    <script>
    import axios from 'axios'
    export default {
        name:'paypal',
        props:['amount'],
        data (){
            return {
                error:false ,
                success:false
            }
        },
        methods:{
            sendDataPaypal (creds) {
                return new Promise((resolve, reject) => {
                  axios.post('http://localhost:3000/checkout', creds).then(res => {
                      return resolve()
                  }).catch((err) => {
                      return reject(err)
                  })
                })
            }
        },
        mounted(){
               let  client = {
                      sandbox: 'AUcp7NI6Je5_u5RSRMYduQI41v4qyiahyWjSU3y-Eg5vnrlwljiIDHnOFrbT8UEpWE4FS4_E4ktyCOOT',
               }
               let  payment = (data, actions) => {
                    // Make a call to the REST api to create the payment
                    return actions.payment.create({
                        payment: {
                            transactions: [
                                {
                                    amount: { total:this.amount, currency: 'USD' }
                                }
                            ]
                        }
                    });
                }
                let  onAuthorize = (data) => {
                    var data = {
                        paymentID: data.paymentID,
                        payerID: data.payerID,
                        amount:this.amount
                    };
                    this.sendDataPaypal({data:data}).then(() => {
                        this.success=true
                        setTimeout(() => {
                            this.success = false;
                        }, 3000); // Ocultar el mensaje después de 3 segundos (3000 milisegundos)
                    }).catch(err=>{
                        this.error=true
                        setTimeout(() => {
                            this.error = false;
                        }, 3000); // Ocultar el mensaje después de 3 segundos (3000 milisegundos)
                    });
                }
                paypal.Button.render({
                    env: 'sandbox', // sandbox | production
                    commit: true,
                    client,
                    payment,
                    onAuthorize
              }, '#paypal-button-container');
        }
    }
    </script>
    