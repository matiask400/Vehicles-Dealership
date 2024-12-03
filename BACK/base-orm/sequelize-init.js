const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("sqlite:" + "./.data/vehiculos.db");


// Definicion del modelo de datos
// Definimos la tabla Marcas
const Marcas = sequelize.define(
  "Marcas",
  {
    IdMarca: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre es requerido",
        },
        len: {
          args: [5, 30],
          msg: "Nombre debe ser entre 5 y 30 caracteres",
        },
      },
    },
    Eslogan: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Eslogan es requerido",
        },
        len: {
          args: [5, 30],
          msg: "Eslogan debe ser entre 5 y 30 caracteres",
        },
      },
    },
    Sede: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Sede es requerido",
        },
        len: {
          args: [5, 30],
          msg: "Sede debe ser entre 5 y 30 caracteres",
        },
      },
    },
  },
  {
    hooks: {
      beforeValidate: (marca) => {
        if (typeof marca.Nombre === "string") {
          marca.Nombre = marca.Nombre.toUpperCase().trim();
        }
        if (typeof marca.Eslogan === "string") {
          marca.Eslogan = marca.Eslogan.toUpperCase().trim();
        }
        if (typeof marca.Sede === "string") {
          marca.Sede = marca.Sede.toUpperCase().trim();
        }
      },
    },
    timestamps: false,
  }
);

//Definimos la tabla Usuarios
const Usuarios = sequelize.define("Usuarios", {
  IdUsuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "Nombre es requerido",
      },
    },
  },
  Clave: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "Clave es requerida",
      },
    },
  },
});

// Definimos la tabla TipoVehiculo
const TipoVehiculo = sequelize.define('TipoVehiculo', {
  IdTipoVehiculo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  freezeTableName: true // evitar pluralizacion
});

// Definimos la tabla Autos
const Autos = sequelize.define(
  "Autos",
  {
    IdAuto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre es requerido",
        },
        len: {
          args: [1, 60],
          msg: "Nombre debe ser entre 1 y 60 caracteres",
        },
      },
      unique: {
        args: true,
        msg: "Este Nombre ya existe en la tabla!",
      },
    },
    IdTipoVehiculo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "IdTipoVehiculo es requerido",
        },
      },
    },
    Precio: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Precio es requerido",
        },
      },
    },
    IdMarca: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "IdMarca es requerido",
        },
      },
    },
    Stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Stock es requerido",
        },
      },
    },
    FechaAlta: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "FechaAlta es requerida",
        },
      },
    },
    Activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Activo es requerido",
        },
      },
    },
  },
  {
    hooks: {
      beforeValidate: (auto) => {
        if (typeof auto.Nombre === "string") {
          auto.Nombre = auto.Nombre.toUpperCase().trim();
        }
      },
    },
    timestamps: false,
  }
);

// Definimos la tabla Paises
const Paises = sequelize.define(
  "Paises",
  {
    IdPais: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre es requerido",
        },
        len: {
          args: [1, 60],
          msg: "Nombre debe ser entre 1 y 60 caracteres",
        },
      },
      unique: {
        args: true,
        msg: "Este Nombre ya existe en la tabla!",
      },
    },
  },
  {
    hooks: {
      beforeValidate: (pais) => {
        if (typeof pais.Nombre === "string") {
          pais.Nombre = pais.Nombre.toUpperCase().trim();
        }
      },
    },
    timestamps: false,
  }
);

//Exoprtamos los modelos
module.exports = {
  sequelize,
  Marcas,
  Usuarios,
  Autos,
  Paises,
  TipoVehiculo,
};
