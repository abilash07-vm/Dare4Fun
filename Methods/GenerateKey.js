const { randomBytes } =require('crypto')

module.exports =()=>{
    return randomBytes(5).toString('hex');
}