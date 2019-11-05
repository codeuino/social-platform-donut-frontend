const Bucket=require('./bucket')
const middleware=function limitRequests(maxBurst,seconds,refillQuantity) {
    const bucket=new Bucket(maxBurst,seconds,refillQuantity)

    // Return an Express middleware function
    return function limitRequestsMiddleware(req, res, next) {
        console.log(bucket.tokens)
        if (bucket.take()) {
            next();
        } else {
            res.status(429).send('Rate limit exceeded');
        }
    }
}
module.exports={
    token_bucket: middleware
}
// How to use 
// import the middleware
// const token_bucket=require('relative path').token_bucket
// Then normally make any express route and apply the middleware in the same way
// app.get('/',
//     tocken_bucket(5,100,1), // Apply rate limiting middleware
//     (req, res) => {
//         res.send('Hello from the rate limited API');
//     }
// );