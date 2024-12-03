// acceder a la base usando aa-sqlite
const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
  // Abrir base, si no existe el archivo/base lo crea
  await db.open("./.data/vehiculos.db");

  // Setear variables de control
  let existe = false;
  let res = null;

  // Verificar si existe la tabla usuarios
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'usuarios'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE TABLE usuarios( 
        IdUsuario INTEGER PRIMARY KEY AUTOINCREMENT, 
        Nombre TEXT NOT NULL UNIQUE, 
        Clave TEXT NOT NULL
      );`
    );
    console.log("Tabla usuarios creada!");
// Insertar datos en la tabla usuarios
    await db.run(
      `INSERT INTO usuarios VALUES	
        (1, 'Administrador', 'TuAuto2024'),
        (2, 'Visitante', 'BuscoAuto2024'),
        (3, 'admin', '123');`
    );
  }


  
  // Verificar si existe la tabla paises
  existe = false;
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'paises'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE TABLE paises( 
        IdPais INTEGER PRIMARY KEY AUTOINCREMENT,
        Nombre TEXT NOT NULL
      );`
    );
    console.log("Tabla Paises creada!");
    // Insertar datos en la tabla paises
    await db.run(
      `INSERT OR IGNORE INTO paises VALUES
        (1, 'Japon'),
        (2, 'Francia'),
        (3, 'Alemania'),
        (4, 'Estados Unidos'),
        (5, 'Italia'),
        (6, 'Corea del Sur'),
        (7, 'Suecia'),
        (8, 'Reino Unido'),
        (9, 'Croacia'),
        (10, 'China');`
    )}


   // Verificar si existe la tabla TipoVehiculo
   existe = false;
   res = await db.get(
     "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'TipoVehiculo'",
     []
   );
   if (res.contar > 0) existe = true;
   if (!existe) {
     await db.run(
       `CREATE TABLE TipoVehiculo( 
         IdTipoVehiculo INTEGER PRIMARY KEY AUTOINCREMENT,
         Nombre TEXT NOT NULL
       );`
     );
     console.log("Tabla TipoVehiculo creada!");
     // Insertar datos en la tabla TipoVehiculo
     await db.run(
       `INSERT OR IGNORE INTO tipoVehiculo (IdTipoVehiculo, Nombre)
         VALUES
           (1, 'Subcompacto'),
           (2, 'Compacto'),
           (3, 'Sedan'),
           (4, 'Hatchback'),
           (5, 'SUV'),
           (6, 'Crossover'),
           (7, 'Coupe'),
           (8, 'Convertible'),
           (9, 'Pickup'),
           (10, 'Minivans'),
           (11, 'Station Wagons'),
           (12, 'Furgoneta'),
           (13, 'Electric'),
           (14, 'Hybrid');`
     );
   }


  // Verificar si existe la tabla marcas
  existe = false;
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'marcas'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE TABLE marcas( 
        IdMarca INTEGER PRIMARY KEY AUTOINCREMENT, 
        Nombre TEXT NOT NULL UNIQUE,
        Slogan TEXT NOT NULL,
        Sede INTEGER NOT NULL,
        FOREIGN KEY (Sede) REFERENCES paises(IdPais)
      );`
    );
    console.log("Tabla marcas creada!");
    // Insertar datos en la tabla marcas
    await db.run(
      `INSERT OR IGNORE INTO marcas (IdMarca, Nombre, Slogan, Sede) VALUES	
      (1, 'Toyota', 'Todo lo que te mueve', 1),
      (2, 'Renault', 'Pasion por la vida', 2),
      (3, 'Peugeot', 'The lions of our time', 2),
      (4, 'Subaru', 'Confidence in Motion', 1),
      (5, 'Honda', 'Blue Skies for Our Children', 1),
      (6, 'Mercedes Benz', 'Lo mejor o nada', 3),
      (7, 'Audi', 'Liderazgo por tecnología', 3),
      (8, 'BMW', 'El placer de conducir', 3),
      (9, 'Ford', 'Mas americana', 4),
      (10, 'GMC', 'We Are Professional Grade', 4),
      (11, 'Chevrolet', 'Find New Roads', 4),
      (12, 'Volkswagen', 'Das Auto', 3),
      (13, 'Nissan', 'Innovation that excites', 1),
      (14, 'Citroen', 'Be Different, Feel Good', 2),
      (15, 'Jeep', 'Go Anywhere, Do Anything', 4),
      (16, 'Fiat', 'Driven by passion', 5),
      (17, 'Hyundai', 'New Thinking, New Possibilities', 6),
      (18, 'Kia', 'The Power to Surprise', 6),
      (19, 'Mitsubishi', 'Drive your ambition', 1),
      (20, 'Suzuki', 'Way of Life', 1),
      (21, 'Mazda', 'Zoom-Zoom', 1),
      (22, 'Volvo', 'For Life', 7),
      (23, 'Land Rover', 'Above and Beyond', 8),
      (24, 'Jaguar', 'The Art of Performance', 8),
      (25, 'Mini', 'Lets Motor', 8),
      (26, 'Porsche', 'There is no substitute', 3),
      (27, 'Ram', 'Built to Serve', 4),
      (28, 'Chrysler', 'Imported from Detroit', 4),
      (29, 'Dodge', 'Domestic. Not Domesticated', 4),
      (30, 'Buick', 'The new class of world class', 4),
      (31, 'Cadillac', 'Dare Greatly', 4),
      (32, 'Lincoln', 'We are what our name stands for', 4),
      (33, 'Acura', 'Precision Crafted Performance', 4),
      (34, 'Infiniti', 'Empower the Drive', 1),
      (35, 'Lexus', 'Experience Amazing', 1),
      (36, 'Alfa Romeo', 'La meccanica delle emozioni', 5),
      (37, 'Ferrari', 'We are Ferrari', 5),
      (38, 'Maserati', 'Luxury, sports and style cast in exclusive cars', 5),
      (39, 'Lamborghini', 'The Spirit of the Bull', 5),
      (40, 'Bugatti', 'Art, Forme, Technique', 2),
      (41, 'McLaren', 'The edge is calling', 8),
      (42, 'Lotus', 'For the drivers', 8),
      (43, 'Rolls Royce', 'The best car in the world', 8),
      (44, 'Bentley', 'The most luxurious car in the world', 8),
      (45, 'Aston Martin', 'Power, Beauty, Soul', 8),
      (46, 'Koenigsegg', 'The fastest car in the world', 7),
      (47, 'Pagani', 'The art of hypercars', 5),
      (48, 'Tesla', 'The future of cars', 4),
      (49, 'Rivian', 'Electric Adventure Vehicles', 4),
      (50, 'Lucid', 'Dreams of Tomorrow', 4),
      (51, 'Rezvani', 'Extreme Utility Vehicles', 4),
      (52, 'Genesis', 'The new luxury', 6),
      (53, 'Polestar', 'Electric Performance Cars', 7),
      (54, 'Rimac', 'The future of performance', 9),
      (55, 'Pininfarina', 'The future of luxury', 5),
      (56, 'Byton', 'The future of mobility', 10),
      (57, 'Nio', 'Blue Sky Coming', 10),
      (58, 'Xpeng', 'Drive your future', 10),
      (59, 'Faraday Future', 'The future of mobility', 4),
      (60, 'Canoo', 'The future of transportation', 4),
      (61, 'Lordstown', 'The future of work', 4);`
    );
  }

  
  // Verificar si existe la tabla autos
  existe = false;
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'autos'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE TABLE autos( 
        IdAuto INTEGER PRIMARY KEY AUTOINCREMENT,
        Nombre TEXT NOT NULL UNIQUE,
        IdTipoVehiculo INTEGER NOT NULL,
        Precio REAL NOT NULL,
        IdMarca INTEGER NOT NULL,
        Stock INTEGER,
        FechaAlta TEXT,
        Activo BOOLEAN,
        FOREIGN KEY (IdMarca) REFERENCES marcas(IdMarca),
        FOREIGN KEY (IdTipoVehiculo) REFERENCES TipoVehiculo(IdTipoVehiculo),
        CHECK (Activo IN (0, 1)),
        CHECK (Stock >= 0),
        CHECK (Precio >= 0)
      );`
    );
    console.log("Tabla autos creada!");

    // Insertar datos en la tabla autos
    await db.run(
      `
      INSERT OR IGNORE INTO autos (IdAuto, Nombre, Precio, IdTipoVehiculo, IdMarca, Stock, FechaAlta, Activo) VALUES
        (1, 'F-100', 7000.00, 9, 5, 45, '2023-01-10', 1),
        (2, 'Corolla', 25000.00, 1, 20, 20, '2023-02-15', 1),
        (3, 'Clio', 18000.00, 2, 15, 15, '2023-03-20', 1),
        (4, '208', 22000.00, 3, 10, 10, '2023-04-25', 1),
        (5, 'Impreza', 28000.00, 4, 25, 25, '2023-05-30', 1),
        (6, 'Civic', 8000.00, 5, 18, 18, '2023-06-05', 1),
        (7, 'Clase A', 35000.00, 6, 30, 30, '2023-07-10', 1),
        (8, 'A3', 32000.00, 7, 22, 22, '2023-08-15', 1),
        (9, 'Serie 3', 38000.00, 8, 28, 28, '2023-09-20', 1),
        (10, 'Sierra', 8000.00, 9, 45, 45, '2023-10-25', 1),
        (11, 'Kuga', 30000.00, 9, 35, 35, '2023-11-30', 1),
        (12, 'Yukon', 14000.00, 10, 14, 14, '2023-12-05', 1),
        (13, 'Hilux', 27000.00, 1, 23, 23, '2024-01-10', 1),
        (14, 'Megane', 19000.00, 2, 17, 17, '2024-02-15', 1),
        (15, '308', 23000.00, 3, 12, 12, '2024-03-20', 1),
        (16, 'F-150', 7500.00, 9, 55, 55, '2024-04-25', 1),
        (17, 'F-250', 8500.00, 9, 60, 60, '2024-05-30', 1),
        (18, 'F-350', 9500.00, 9, 60, 60, '2024-06-05', 1),
        (19, 'Duster', 20000.00, 2, 14, 14, '2024-07-10', 1),
        (20, 'C4', 21400.00, 3, 11, 11, '2024-08-15', 1),
        (21, 'Forester', 29000.00, 4, 19, 19, '2024-09-20', 1),
        (22, 'CR-V', 27000.00, 5, 16, 16, '2024-10-25', 1),
        (23, 'LaFerrari', 3000000.00, 6, 1, 1, '2024-11-30', 1),
        (24, 'Chiron', 2500000.00, 14, 1, 1, '2024-12-05', 1),
        (25, 'Veyron', 2000000.00, 14, 1, 1, '2025-01-10', 1),
        (26, 'Model S', 50000.00, 13, 30, 30, '2025-02-15', 1),
        (27, 'Model 3', 14000.00, 13, 25, 25, '2025-03-20', 1),
        (28, 'Model X', 60000.00, 13, 20, 20, '2025-04-25', 1),
        (29, 'Model Y', 45000.00, 13, 15, 15, '2025-05-30', 1),
        (30, 'Cybertruck', 70000.00, 13, 10, 10, '2025-06-05', 1),
        (31, 'Roadster', 100000.00, 13, 5, 5, '2025-07-10', 1),
        (32, 'Taycan', 80000.00, 8, 30, 30, '2025-08-15', 1),
        (33, 'Panamera', 90000.00, 8, 25, 25, '2025-09-20', 1),
        (34, 'Cayenne', 100000.00, 8, 20, 20, '2025-10-25', 1),
        (35, 'Macan', 60000.00, 8, 15, 15, '2025-11-30', 1),
        (36, '911', 120000.00, 8, 10, 10, '2025-12-05', 1),
        (37, '718', 80000.00, 8, 5, 5, '208-01-10', 1),
        (38, 'i3', 14000.00, 1, 30, 30, '208-02-15', 1),
        (39, 'i8', 150000.00, 1, 25, 25, '208-03-20', 1),
        (40, 'X1', 50000.00, 1, 20, 20, '208-04-25', 1),
        (41, 'X3', 60000.00, 1, 15, 15, '208-05-30', 1),
        (42, 'X5', 70000.00, 1, 10, 10, '208-06-05', 1),
        (43, 'X7', 80000.00, 1, 5, 5, '208-07-10', 1),
        (44, 'S60', 45000.00, 22, 30, 30, '208-08-15', 1),
        (45, 'S90', 55000.00, 12, 25, 25, '208-09-20', 1),
        (46, 'XC14', 14000.00, 12, 20, 20, '208-10-25', 1),
        (47, 'XC60', 50000.00, 12, 15, 15, '208-11-30', 1),
        (48, 'XC90', 70000.00, 12, 10, 10, '208-12-05', 1),
        (49, 'S14', 35000.00, 12, 5, 5, '2027-01-10', 1),
        (50, 'S90 Recharge', 60000.00, 12, 30, 30, '2027-02-15', 1),
        (51, 'Golf', 28000.00, 12, 20, 20, '2023-01-10', 1),
        (52, 'Tiguan', 32000.00, 12, 15, 15, '2023-02-15', 1),
        (53, 'Passat', 35000.00, 12, 10, 10, '2023-03-20', 1),
        (54, 'Arteon', 14000.00, 12, 5, 5, '2023-04-25', 1),
        (55, 'ID.4', 45000.00, 12, 30, 30, '2023-05-30', 1),
        (56, 'Mustang', 55000.00, 5, 25, 25, '2023-06-05', 1),
        (57, 'Escape', 30000.00, 5, 20, 20, '2023-07-10', 1),
        (58, 'Explorer', 14000.00, 5, 15, 15, '2023-08-15', 1),
        (59, 'Edge', 35000.00, 5, 10, 10, '2023-09-20', 1),
        (60, 'Bronco', 45000.00, 5, 5, 5, '2023-10-25', 1),
        (61, 'Avalon', 36000.00, 3, 20, 10, '2024-01-15', 1),
        (62, 'Camry', 27000.00, 3, 20, 15, '2024-02-15', 1),
        (63, 'Land Cruiser', 85000.00, 5, 20, 8, '2024-03-15', 1),
        (64, 'Tacoma', 35000.00, 9, 20, 20, '2024-04-15', 1),
        (65, 'Highlander', 14000.00, 5, 20, 12, '2024-05-15', 1),
        (66, 'Supra', 50000.00, 7, 20, 5, '2024-06-15', 1),
        (67, 'Accord', 32000.00, 3, 18, 18, '2024-07-15', 1),
        (68, 'Odyssey', 30000.00, 10, 18, 10, '2024-08-15', 1),
        (69, 'Pilot', 35000.00, 5, 18, 12, '2024-09-15', 1),
        (70, 'Ridgeline', 38000.00, 9, 18, 8, '2024-10-15', 1),
        (71, 'Fit', 16000.00, 1, 18, 20, '2024-11-15', 1),
        (72, 'HR-V', 22000.00, 5, 18, 15, '2024-12-15', 1),
        (73, 'CX-3', 21000.00, 5, 31, 18, '2025-01-15', 1),
        (74, 'CX-5', 28000.00, 5, 31, 10, '2025-02-15', 1),
        (75, 'MX-5', 8000.00, 7, 31, 8, '2025-03-15', 1),
        (76, 'CX-9', 35000.00, 5, 31, 12, '2025-04-15', 1),
        (77, 'Mustang Mach-E', 50000.00, 13, 5, 5, '2025-05-15', 1),
        (78, 'F-150 Lightning', 70000.00, 13, 5, 10, '2025-06-15', 1),
        (79, 'e-tron', 75000.00, 13, 22, 8, '2025-07-15', 1),
        (80, 'Q4 e-tron', 60000.00, 13, 22, 10, '2025-08-15', 1),
        (81, 'Kona Electric', 14000.00, 13, 29, 15, '2025-09-15', 1),
        (82, 'Ioniq 5', 45000.00, 13, 29, 12, '2025-10-15', 1),
        (83, 'EV6', 42000.00, 13, 21, 10, '2025-11-15', 1),
        (84, 'Niro EV', 14000.00, 13, 21, 15, '2025-12-15', 1),
        (85, 'Bolt EV', 35000.00, 13, 8, 20, '208-01-15', 1),
        (86, 'Hummer EV', 110000.00, 13, 8, 5, '208-02-15', 1),
        (87, 'Leaf', 31000.00, 13, 35, 18, '208-03-15', 1),
        (88, 'Ariya', 50000.00, 13, 35, 10, '208-04-15', 1),
        (89, 'Enyaq iV', 45000.00, 13, 41, 12, '208-05-15', 1),
        (90, 'ID.3', 14000.00, 13, 53, 15, '208-06-15', 1),
        (91, 'Model S', 80000.00, 13, 44, 10, '208-07-15', 1),
        (92, 'Model 3', 45000.00, 13, 44, 15, '208-08-15', 1),
        (93, 'Model X', 90000.00, 13, 44, 8, '208-09-15', 1),
        (94, 'Model Y', 50000.00, 13, 44, 12, '208-10-15', 1),
        (95, 'Cybertruck', 70000.00, 13, 44, 20, '208-11-15', 1),
        (96, 'Roadster', 200000.00, 13, 44, 5, '208-12-15', 1),
        (97, 'Polestar 2', 60000.00, 13, 45, 18, '2027-01-15', 1),
        (98, 'Polestar 3', 80000.00, 13, 45, 10, '2027-02-15', 1),
        (99, 'XC14 Recharge', 55000.00, 13, 45, 12, '2027-03-15', 1),
        (100, 'C14 Recharge', 60000.00, 13, 45, 15, '2027-04-15', 1),
        (101, 'EQC', 75000.00, 13, 33, 10, '2027-05-15', 1),
        (102, 'EQA', 55000.00, 13, 33, 15, '2027-06-15', 1),
        (103, 'EQB', 60000.00, 13, 33, 12, '2027-07-15', 1),
        (104, 'EQE', 85000.00, 13, 33, 8, '2027-08-15', 1),
        (105, 'EQV', 90000.00, 13, 33, 5, '2027-09-15', 1),
        (106, 'i4', 70000.00, 13, 2, 20, '2027-10-15', 1),
        (107, 'iX', 85000.00, 13, 2, 15, '2027-11-15', 1),
        (108, 'i3', 45000.00, 13, 2, 10, '2027-12-15', 1),
        (109, 'i8', 150000.00, 13, 2, 5, '2028-01-15', 1),
        (110, 'Cooper SE', 35000.00, 13, 34, 18, '2028-02-15', 1),
        (111, 'Leaf', 30000.00, 13, 5, 20, '2028-03-15', 1),
        (112, 'Ariya', 45000.00, 13, 5, 15, '2028-04-15', 1),
        (113, 'Bolt EV', 37000.00, 13, 1, 10, '2028-05-15', 1),
        (114, 'Bolt EUV', 14000.00, 13, 1, 12, '2028-06-15', 1),
        (115, 'Mustang Mach-E', 55000.00, 13, 6, 18, '2028-07-15', 1),
        (116, 'F-150 Lightning', 70000.00, 13, 6, 15, '2028-08-15', 1),
        (117, 'ID.4', 45000.00, 13, 15, 20, '2028-09-15', 1),
        (118, 'ID. Buzz', 60000.00, 13, 15, 10, '2028-10-15', 1),
        (119, 'e-tron', 80000.00, 13, 7, 12, '2028-11-15', 1),
        (120, 'Q4 e-tron', 55000.00, 13, 7, 15, '2028-12-15', 1),
        (121, 'Taycan', 150000.00, 13, 4, 8, '2029-01-15', 1),
        (122, 'e-208', 35000.00, 13, 11, 20, '2029-02-15', 1),
        (123, 'e-2008', 37000.00, 13, 11, 10, '2029-03-15', 1),
        (124, 'Kona Electric', 14000.00, 13, 9, 15, '2029-04-15', 1),
        (125, 'Ioniq 5', 50000.00, 13, 9, 12, '2029-05-15', 1),
        (126, 'Soul EV', 35000.00, 13, 10, 18, '2029-06-15', 1),
        (127, 'Niro EV', 14000.00, 13, 10, 15, '2029-07-15', 1),
        (128, 'EV6', 45000.00, 13, 10, 20, '2029-08-15', 1),
        (129, 'Leaf Plus', 35000.00, 13, 5, 12, '2029-09-15', 1),
        (130, 'Ariya AWD', 50000.00, 13, 5, 10, '2029-10-15', 1),
        (131, 'e-tron GT', 100000.00, 13, 7, 8, '2029-11-15', 1),
        (132, 'Q4 Sportback e-tron', 60000.00, 13, 7, 15, '2029-12-15', 1),
        (133, 'i3s', 50000.00, 13, 2, 10, '2030-01-15', 1),
        (134, 'i8 Roadster', 160000.00, 13, 2, 5, '2030-02-15', 1),
        (135, 'Taycan Cross Turismo', 160000.00, 13, 4, 8, '2030-03-15', 1),
        (136, 'e-308', 14000.00, 13, 11, 12, '2030-04-15', 1),
        (137, 'e-3008', 45000.00, 13, 11, 15, '2030-05-15', 1),
        (138, 'Ioniq 6', 60000.00, 13, 9, 20, '2030-06-15', 1),
        (139, 'EV9', 70000.00, 13, 10, 18, '2030-07-15', 1),
        (140, 'Kona Electric AWD', 45000.00, 13, 9, 12, '2030-08-15', 1),
        (141, 'Ioniq 5 AWD', 55000.00, 13, 9, 15, '2030-09-15', 1),
        (142, 'Soul EV Plus', 38000.00, 13, 10, 10, '2030-10-15', 1),
        (143, 'Niro EV Plus', 42000.00, 13, 10, 12, '2030-11-15', 1),
        (144, 'EV6 GT', 50000.00, 13, 10, 15, '2030-12-15', 1),
        (145, 'e-Golf', 35000.00, 13, 15, 20, '2031-01-15', 1),
        (146, 'ID.3', 14000.00, 13, 15, 18, '2031-02-15', 1),
        (147, 'ID.4 GTX', 50000.00, 13, 15, 12, '2031-03-15', 1),
        (148, 'ID. Buzz Cargo', 65000.00, 13, 15, 15, '2031-04-15', 1),
        (149, 'e-tron S', 90000.00, 13, 7, 8, '2031-05-15', 1),
        (150, 'Q4 e-tron S', 70000.00, 13, 7, 10, '2031-06-15', 1),
        (151, 'Taycan RWD', 120000.00, 13, 4, 5, '2031-07-15', 1),
        (152, 'e-5008', 50000.00, 13, 11, 20, '2031-08-15', 1),
        (153, 'Ioniq 7', 70000.00, 13, 9, 10, '2031-09-15', 1),
        (154, 'EV10', 80000.00, 13, 10, 12, '2031-10-15', 1),
        (155, 'Kona Electric Plus', 47000.00, 13, 9, 15, '2031-11-15', 1),
        (156, 'Ioniq 6 AWD', 65000.00, 13, 9, 20, '2031-12-15', 1),
        (157, 'Soul EV GT', 14000.00, 13, 10, 18, '2032-01-15', 1),
        (158, 'Niro EV GT', 45000.00, 13, 10, 15, '2032-02-15', 1),
        (159, 'EV6 AWD', 55000.00, 13, 10, 20, '2032-03-15', 1),
        (160, 'Leaf SE', 37000.00, 13, 5, 20, '2032-04-15', 1),
        (161, 'Ariya SE', 47000.00, 13, 5, 10, '2032-05-15', 1),
        (162, 'Bolt EV Plus', 39000.00, 13, 1, 15, '2032-06-15', 1),
        (163, 'Bolt EUV Plus', 42000.00, 13, 1, 12, '2032-07-15', 1),
        (164, 'Mustang Mach-E GT', 60000.00, 13, 6, 18, '2032-08-15', 1),
        (165, 'F-150 Lightning Plus', 75000.00, 13, 6, 15, '2032-09-15', 1),
        (166, 'ID.4 AWD', 47000.00, 13, 15, 20, '2032-10-15', 1),
        (167, 'ID. Buzz AWD', 67000.00, 13, 15, 10, '2032-11-15', 1),
        (168, 'e-tron GT Plus', 105000.00, 13, 7, 8, '2032-12-15', 1),
        (169, 'Q4 Sportback e-tron Plus', 62000.00, 13, 7, 15, '2033-01-15', 1),
        (170, 'i4 M50', 80000.00, 13, 2, 10, '2033-02-15', 1);
      `
    );
  }
  // cerrar la base
  db.close();
}

CrearBaseSiNoExiste();

module.exports = CrearBaseSiNoExiste;