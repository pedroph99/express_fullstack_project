 const fs = require('fs')
 const path = require('path');
function auth_middleware(req,res, next){
    console.log("Middleware sendo utilizado")
    const file_json = fs.readFile(path.join(__dirname, `../fake_db/users/${req.session.username}.json`), "utf-8", (err, jsonString) => {
        if (err) {
          console.log("lascou aqui")
          console.log("File read failed:", err);
          res.redirect("/home_page_login")
          return
        }
       
        
      })
    
      next()

    
}
module.exports = auth_middleware
        
        

