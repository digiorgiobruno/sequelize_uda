const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000

app.use(express.static(path.resolve(__dirname, '../public')));

app.use(express.json())
//URL encode  - Para que nos pueda llegar la información desde el formulario al req.body
app.use(express.urlencoded({ extended: false }));

app.use('/', (req, res) => res.json({ clave: "con el server" }));

app.listen(PORT, () => {
    console.log('Servidor corriendo en el puerto' + PORT)
});

//Creando modelos
/*
//primero los que no tienen llave primaria
sequelize model:generate --name Brand --attributes name:string
sequelize model:generate --name Category --attributes name:string
sequelize model:generate --name Payment --attributes type:string
sequelize model:generate --name Gender --attributes type:string
sequelize model:generate --name Rol --attributes description:string
sequelize model:generate --name State --attributes description:string
sequelize model:generate --name Address --attributes Street:string, number:integer
sequelize model:generate --name Size --attributes number:integer
//---------ahora los que tienen llave primaria
sequelize model:generate --name Product --attributes name:string,price:decimal,stock:integer,stock_min:integer,stock_max:integer,brands_id:integer,categories_id:integer,sizes_id:integer,genders_id:integer
sequelize model:generate --name Image --attributes name:string,products_id:integer
sequelize model:generate --name OrderDetail --attributes quantity:decimal,subtotal:decimal,products_id:integer,orders_id:integer
sequelize model:generate --name Shipping --attributes Street:string, number:integer,orders_id:integer
sequelize model:generate --name Order --attributes number:integer,date:date,total:decimal,payments_id:integer,users_id:integer,states_id:integer
sequelize model:generate --name User --attributes first_name:string,last_name:string,username:string,email:string,password:string,addresses_id:integer
sequelize model:generate --name User_has_rols --attributes users_id:integer,rols_id:integer

*/ 
