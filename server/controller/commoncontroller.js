// some common functions
const bcrypt=require('bcrypt')
module.exports={
    hashpassword: async (pass) => {
        let hash=await bcrypt.genSalt(10);
        console.log(hash, pass)
        let password=await bcrypt.hash(pass,hash)
        console.log(password)
        return password;
    },
    compare: async (password,hash) => {
        return await bcrypt.compare(password,hash)
    }
}