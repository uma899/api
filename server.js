const express = require('express')
const multer  = require('multer')
const cors = require('cors')
const mysql = require('mysql')
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('./public'));
const path = require('path')
const { json } = require('stream/consumers')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + path.extname(file.originalname);
      cb(null, file.fieldname + '_' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })
  

app.post('/profile', upload.single('img'), function (req, res, next) {
  //console.log(req.file)
  //console.log(req.body.name)
      const sql = "INSERT INTO `prod`(`id`, `prod_name`, `prod_image`, `vendor`, `price`) VALUES (NULL,'"+req.body.name+"','"+req.file.filename+"','"+req.body.vendor+"','"+req.body.price+"')"
       db.query(sql, (err)=>{
       if(err) return res.json(err)
       return res.redirect("http://localhost:3000/myprod")
       }) 
       //window.location.replace("http://localhost:3000/myprod")
})

app.get('/products', (req,res) => {
    const sql = "SELECT * FROM `prod`";
    db.query(sql, (err, result) =>{
        if(err) return res.json("Erroe")
        return res.json(result) 
    })
})

app.get('/products/:id', (req,res) => {
    const sql = "SELECT * FROM `prod` WHERE vendor ="+req.params.id;
    db.query(sql, (err, result) =>{
        if(err) return res.json("Erroe")
        return res.json(result) 
    })
})


app.get('/products/id/:id', (req,res) => {
    const sql = "SELECT * FROM `prod` WHERE id ="+req.params.id;
    db.query(sql, (err, result) =>{
        if(err) return res.json("Erroe")
        return res.json(result[0]) 
    })
})



app.get('/', (req, res) => {
    res.send('Working')
})


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'office'
})

/*
app.post('/products',upload.single('img'),(req, res)=>{


       console.log(req.file)
       console.log('body',res.json)
})
*/


app.get('/users',(req,res) => {
    const sql = 'SELECT * FROM employee' ;
    db.query(sql, (err, data)=> {
        if(err){ return res.json(err);}
        return res.json(data);
    })
})


app.get('/users/:id',(req,res) => {
    const sql = 'SELECT * FROM employee WHERE id = '+req.params.id ;
    db.query(sql, (err, data)=> {
        if(err){ return res.json(err);}
        return res.json(data);
    })
})

app.listen(8081,()=> {
    console.log('listeninig at ',8081)
})

/* app.get('/add/:name/:ph', function(req, res) {
    const sql = 'INSERT INTO `employee`(`id`, `name`, `phone`) VALUES (NULL,'+ "'"+req.params.name+"'"+', '+req.params.ph+');' ;
        db.query(sql, (err)=>{
        if(err) return res.json(err)
        return res.json('Inserted..')
    }) 
 }); */





 app.post('/users',(req, res)=>{
    const name = req.body.name;
    const ph = req.body.phone;
     const sql = 'INSERT INTO `employee`(`id`, `name`, `phone`) VALUES (NULL,'+ "'"+name+"'"+', '+ph+');' ;
        db.query(sql, (err)=>{
        if(err) return res.json(err)
        return res.json('Inserted..')
        })  
 })

 app.delete('/users',(req, res)=>{
    const id = req.body.id;
/*     const name = req.body.name;
    const ph = req.body.phone; */
     const sql = 'DELETE FROM `employee` WHERE id ='+id  ;
        db.query(sql, (err)=>{
        if(err) return res.json(err)
        return res.json('Deleted..')
        })  
 })

 app.delete('/users/:id',(req, res)=>{
    const id = req.params.id;
/*     const name = req.body.name;
    const ph = req.body.phone; */
     const sql = 'DELETE FROM `employee` WHERE id ='+id  ;
        db.query(sql, (err)=>{
        if(err) return res.json(err)
        return res.json('Deleted..')
        })  
 })

 app.put('/users',(req, res)=>{
    const id = req.body.id;
    const name = req.body.name;
    const ph = req.body.phone;
     const sql = "UPDATE `employee` SET `id`='"+id+"',`name`='"+name+"',`phone`='"+ph+"' WHERE id = "+id ;
     //const sql = 'UPDATE `employee`(`id`, `name`, `phone`) VALUES (NULL,'+ "'"+name+"'"+', '+ph+');' ;
        db.query(sql, (err)=>{
        if(err) return res.json(err)
        return res.json('Updated..')
        })  
 })





 app.post('/vendors',(req, res)=>{
    const store = req.body.store;
    const owner = req.body.owner;
    const ph = req.body.phone;
    const address = req.body.address;
     const sql = "INSERT INTO `vendor_details`(`vendor_id`, `Store`, `Owner`, `Phone`, `Address`) VALUES ('[value-1]','"+store+"','"+owner+"',"+ph+",'"+address+"')"
         db.query(sql, (err)=>{
         if(err) return res.json(err)
         return res.json('Inserted..')
         })
         let data = {
            owner: owner,
            store: store,
            phone: ph,
            address: address}
            console.log(data)
         
 })

 app.get('/vendors',(req,res) => {
    const sql = 'SELECT * FROM vendor_details';
    db.query(sql, (err, data)=> {
        if(err){ return res.json(err);}
        return res.json(data);
    })
    
})

app.get('/vendors/:id',(req,res) => {
    const sql = 'SELECT * FROM `vendor_details` WHERE vendor_id = '+req.params.id;
    db.query(sql, (err, data)=> {
        if(err){ return res.json(err);}
        return res.json(data);
    })
})

app.get('/vendors/ph/:id',(req,res) => {
    const sql = 'SELECT * FROM `vendor_details` WHERE Phone = '+req.params.id;
    db.query(sql, (err, data)=> {
        if(err){ return res.json(err);}
        return res.json(data[0]);
    })
})


app.delete('/vendors/:id',(req,res) => {
    const sql = 'DELETE FROM `vendor_details` WHERE vendor_id ='+req.params.id;
    db.query(sql, (err, data)=> {
        if(err){ return res.json(err);}
        return res.json(data);
    })
})

app.delete('/products/:id', (req,res) => {
    const sql = "DELETE FROM `prod` WHERE vendor ="+req.params.id;
    db.query(sql, (err, result) =>{
        if(err) return res.json("Erroe")
        return res.json(result) 
    })
})






app.get('/customers', (req, res) => {
    const sql = "SELECT * FROM `customers` ";
    db.query(sql, (err, result) =>{
        if(err) return res.json("Customer Error")
        return res.json(result) 
})})

app.get('/customers/:id', (req, res) => {
    const sql = "SELECT * FROM `customers` WHERE cust_id ="+req.params.id;
    db.query(sql, (err, result) =>{
        let t = result[0]; 
        if(err) return res.json("Customer Error")
        return res.json(t)
})})


app.get('/:num', (req, res) => {
    const sql = "SELECT * FROM `customers` WHERE cust_num ="+req.params.num;
    db.query(sql, (err, result) =>{ 
        if(err) return res.json(err)
        return res.json(result);
})})



app.post('/customers',(req, res)=>{
    const sql = "INSERT INTO `customers`(`cust_id`, `cust_name`, `cust_pass`, `cust_num`, `cart`) VALUES (NULL,'"+req.body.name+"','"+req.body.password+"',"+req.body.num+",'"+req.body.cart+"')"
       db.query(sql, (err)=>{
       if(err) return res.json(err)
       return res.json('Inserted..')
       })  
       //res.redirect('http://localhost:3000/addvendor')
})



