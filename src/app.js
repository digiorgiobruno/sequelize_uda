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
sequelize model:generate --name Product --attributes name:string,price:decimal,stock:integer,stock_min:integer,stock_max:integer,brands_id:integer,categories_id:integers,sizes_id:integer,genders_id:integer
sequelize model:generate --name Image --attributes name:string,products_id:integer
sequelize model:generate --name OrderDetail --attributes quantity:decimal,subtotal:decimal,products_id:integer,orders_id:integer
sequelize model:generate --name Shipping --attributes Street:string, number:integer,orders_id:integer
sequelize model:generate --name Order --attributes number:integer,date:date,total:decimal,payments_id:integer,users_id:integer,states_id:integer
sequelize model:generate --name User --attributes first_name:string,last_name:string,username:string,email:string,password:string,addresses_id:integer
sequelize model:generate --name User_has_rols --attributes users_id:integer,rols_id:integer
//---------------Relaciones
The HasOne association
The BelongsTo association
The HasMany association
The BelongsToMany association


//Modelo PRODUCT

 static associate(models) {
      // belongsTo
      Product.belongsTo(models.Brand);
      // belongsTo
      Product.belongsTo(models.Category);
      // belongsTo
      Product.belongsTo(models.Size);
      // belongsTo
      Product.belongsTo(models.Gender);
     // hasMany
      Product.hasMany(models.Image, {
        foreignKey: 'products_id',
        as: "images"
      })
     // belongsToMany
        Product.belongsToMany(models.Order, {
            as: 'orders',
            through: 'orderdetail',
    
          });



    }

    //Modelo BRAND
    static associate(models) {
        // hasMany
        Brand.hasMany(models.Product, {
          foreignKey: 'brands_id',
          as: "products"
        })
      }

   //Modelo CATEGORY
    static associate(models) {
        // hasMany
        Category.hasMany(models.Product, {
          foreignKey: 'categories_id',
          as: "products"
        })
      }

   //Modelo SIZE
   static associate(models) {
    // hasMany
    Size.hasMany(models.Product, {
      foreignKey: 'sizes_id',
      as: "products"
    })
  }

    //Modelo Gender
    static associate(models) {
        // hasMany
        Gender.hasMany(models.Product, {
          foreignKey: 'genders_id',
          as: "products"
        })
      }

      //Modelo IMAGE
      static associate(models) {
        // belongsTo
        Image.belongsTo(models.Product)
      }

      //Modelo ORDERS
      static associate(models) {
         // belongsToMany 
         Order.belongsToMany(models.Product, {
            as: 'products',
            through: 'orderdetail',
            
          });
          // belongsTo
         Order.belongsTo(models.State);
         // belongsTo
         Order.belongsTo(models.User);
          // belongsTo
         Order.belongsTo(models.Payment);

        // hasOne
        Order.hasOne(models.Shipping, {
            foreignKey: 'orders_id',
            as: "shippings"
          })


        // belongsToMany
        Order.belongsToMany(models.Product, {
            as: 'orders',
            through: 'orderdetail',
    
          });
        }

        //MODELO STATE
    static associate(models) {
        // hasMany
        State.hasOne(models.Order, {
          foreignKey: 'states_id',
          as: "orders"
        })
      }

   //MODELO USER
    static associate(models) {
        // hasMany
        User.hasMany(models.Order, {
          foreignKey: 'user_id',
          as: "orders"
        })
        //belongsTo
        User.belongsTo(models.Address);

        // belongsToMany
        User.belongsToMany(models.Rol, {
            as: 'rols',
            through: 'user_has_rols',
    
          });
        
      }

    //MODELO PAYMENT
    static associate(models) {
        // hasOne
        Payment.hasOne(models.Order, {
          foreignKey: 'payments_id',
          as: "orders"
        })
      }

//MODELO SHIPPING
    static associate(models) {
        // belongsTo
        Shipping.belongsTo(models.Order);
      }
//MODELO ADDRESS
static associate(models) {
    // hasOne
    Address.hasOne(models.User, {
        foreignKey: 'addresses_id',
        as: "users"
    })
    }


    //MODELO ROL
    static associate(models) {
        // belongsToMany
      Rol.belongsToMany(models.User, {
        as: 'users',
        through: 'user_has_rols',

      });
    }

 //AHORA HAY QUE AGREGAR LAS CLAVES FORANEAS A LAS  MIGRACIONES

MIGRACION PRODUCT
    brands_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'brands',
          key: 'id'
        }
      },
      categories_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'categories',
          key: 'id'
        }
      },
      sizes_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'sizes',
          key: 'id'
        }
      },
      genders_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'genders',
          key: 'id'
        }
      }

      MIGRACION IMAGES

      products_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'products',
          key: 'id'
        }
      }

      MIGRACION ORDER
      payments_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'payments',
            key: 'id'
          }
        },
        users_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'users',
            key: 'id'
          }
        },
        states_id: {
          type: Sequelize.INTEGER
          references: {
            model: 'states',
            key: 'id'
          }
        },
      
        MIGRACION SHIPPING
        orders_id: {
            type: Sequelize.INTEGER,
            references: {
              model: 'orders',
              key: 'id'
            }
          },

        MIGRACION USER
        addresses_id: {
            type: Sequelize.INTEGER,
            references: {
              model: 'addresses',
              key: 'id'
            }
          },

    MIGRACION USER_HAS_ROLS
          users_id: {
            type: Sequelize.INTEGER,
            references: {
              model: 'users',
              key: 'id'
            }
          },

          rols_id: {
            type: Sequelize.INTEGER,
            references: {
              model: 'rols',
              key: 'id'
            }
          },

    MIGRACION ORDERDETAIL
          orders_id: {
            type: Sequelize.INTEGER,
            references: {
              model: 'orders',
              key: 'id'
            }
          },

          products_id: {
            type: Sequelize.INTEGER,
            references: {
              model: 'products',
              key: 'id'
            }
          },

       


*/ 

