const {createProxyMiddleware:proxy}=require('http-proxy-middleware')
module.exports=function(app){
    app.use('/api',proxy({
        target:"http://localhost:3040",
        changeOrigin:true
    }))
    app.use('/upload',proxy({
        target:"http://localhost:3040",
        changeOrigin:true
    }))
}