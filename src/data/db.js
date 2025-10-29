export const categories = [
  { id: 'juegos-mesa', name: 'Juegos de Mesa' },
  { id: 'accesorios', name: 'Accesorios' },
  { id: 'consolas', name: 'Consolas' },
  { id: 'computadores', name: 'Computadores Gamers' },
  { id: 'sillas', name: 'Sillas Gamers' },
  { id: 'mouse', name: 'Mouse' },
  { id: 'mousepad', name: 'Mousepad' },
];

export const products = [
  {
    id: 1,
    nombre: 'Catan',
    precio: 29990,
    precioTexto: '$29.990 CLP',
    categoria: 'juegos-mesa',
    stock: 15,
    img: '/img/Catan.png',
    descripcion: 'Juego de estrategia para 3-4 jugadores. Perfecto para noches de juego.',
    fabricante: 'Devir',
    procedencia: 'Alemania',
    distribuidor: 'Level-Up Store',
    garantia: '3 meses',
    autenticidad: '100% Original'
  },
  {
    id: 2,
    nombre: 'Carcassonne',
    precio: 24990,
    precioTexto: '$24.990 CLP',
    categoria: 'juegos-mesa',
    stock: 20,
    img: 'https://www.nicepng.com/png/detail/80-801695_carcassonne-board-game.png',
    descripcion: 'Juego de colocación de fichas para 2-5 jugadores. Fácil de aprender.',
    fabricante: 'Hans im Glück',
    procedencia: 'Alemania',
    distribuidor: 'Level-Up Store',
    garantia: '3 meses',
    autenticidad: '100% Original'
  },
  {
    id: 3,
    nombre: 'Controlador Xbox Series X',
    precio: 59990,
    precioTexto: '$59.990 CLP',
    categoria: 'accesorios',
    stock: 30,
    img: 'https://xboxwire.thesourcemediaassets.com/sites/4/Deadpool-Double_Controller-DP_16x9-FINAL-91c067ffa6e5f5a587c4-1536x864-1-656d3fd505fc5c52b10e.jpg',
    descripcion: 'Inalámbrico con botones mapeables y respuesta táctil mejorada.',
    fabricante: 'Microsoft',
    procedencia: 'China',
    distribuidor: 'Level-Up Store',
    garantia: '6 meses',
    autenticidad: '100% Original'
  },
  {
    id: 4,
    nombre: 'Auriculares HyperX Cloud II',
    precio: 79990,
    precioTexto: '$79.990 CLP',
    categoria: 'accesorios',
    stock: 25,
    img: 'https://media.spdigital.cl/thumbnails/products/udp7nf1c_a20fef83_thumbnail_512.jpg',
    descripcion: 'Sonido envolvente 7.1 con micrófono desmontable.',
    fabricante: 'HyperX',
    procedencia: 'Taiwán',
    distribuidor: 'Level-Up Store',
    garantia: '1 año',
    autenticidad: '100% Original'
  },
  {
    id: 5,
    nombre: 'PlayStation 5',
    precio: 549990,
    precioTexto: '$549.990 CLP',
    categoria: 'consolas',
    stock: 10,
    img: 'https://clsonyb2c.vtexassets.com/arquivos/ids/463329-1600-auto?v=638436227763030000&width=1600&height=auto&aspect=true',
    descripcion: 'Consola de última generación con gráficos impresionantes.',
    fabricante: 'Sony',
    procedencia: 'Japón',
    distribuidor: 'Level-Up Store',
    garantia: '1 año',
    autenticidad: '100% Original'
  },
  {
    id: 6,
    nombre: 'PC Gamer ASUS ROG Strix',
    precio: 1299990,
    precioTexto: '$1.299.990 CLP',
    categoria: 'computadores',
    stock: 5,
    img: '/img/Rog Strix.png',
    descripcion: 'Potente equipo para gamers exigentes con los últimos componentes.',
    fabricante: 'ASUS',
    procedencia: 'Taiwán',
    distribuidor: 'Level-Up Store',
    garantia: '1 año',
    autenticidad: '100% Original'
  },
  {
    id: 7,
    nombre: 'Silla Gamer SecretLab Titan',
    precio: 349990,
    precioTexto: '$349.990 CLP',
    categoria: 'sillas',
    stock: 8,
    img: '/img/Silla secretLab titan.webp',
    descripcion: 'Diseñada para máximo confort con soporte ergonómico ajustable.',
    fabricante: 'SecretLab',
    procedencia: 'Singapur',
    distribuidor: 'Level-Up Store',
    garantia: '2 años',
    autenticidad: '100% Original'
  },
  {
    id: 8,
    nombre: 'Mouse Logitech G502 HERO',
    precio: 49990,
    precioTexto: '$49.990 CLP',
    categoria: 'mouse',
    stock: 40,
    img: '/img/G502.png',
    descripcion: 'Sensor de alta precisión con botones personalizables.',
    fabricante: 'Logitech',
    procedencia: 'Suiza',
    distribuidor: 'Level-Up Store',
    garantia: '1 año',
    autenticidad: '100% Original'
  },
  {
    id: 9,
    nombre: 'Mousepad Razer Goliathus',
    precio: 29990,
    precioTexto: '$29.990 CLP',
    categoria: 'mousepad',
    stock: 50,
    img: '/img/Mousepad goliathus extended .png',
    descripcion: 'Amplia superficie con iluminación RGB personalizable.',
    fabricante: 'Razer',
    procedencia: 'EE.UU.',
    distribuidor: 'Level-Up Store',
    garantia: '6 meses',
    autenticidad: '100% Original'
  }
];

export const users = [
  {
    id: 1,
    email: 'admin@levelup.com',
    password: 'admin123',
    role: 'admin',
    nombre: 'Admin',
    apellido: 'LevelUp'
  },
  {
    id: 2,
    email: 'cliente@gmail.com',
    password: 'cliente123',
    role: 'customer',
    nombre: 'Pedro',
    apellido: 'Hacker', // Como en el ejemplo de checkout [cite: 213, 217]
    fechaNacimiento: '1990-05-15',
    telefono: '+56912345678',
    preferencias: ['consolas', 'juegos-mesa']
  }
];


export const orders = [
  {
    id: 20240705, // Como en Figura 7
    userId: 2, // ID del usuario 'Pedro Hacker'
    userName: 'Pedro Hacker',
    userEmail: 'cliente@gmail.com',
    date: '2025-10-27', // Fecha simulada
    total: 28775, // Total como en Figura 7
    address: {
        calle: 'Los crisantemos, Edificio Norte',
        departamento: 'Depto 603',
        region: 'Región Metropolitana de Santiago',
        comuna: 'Cerrillos',
        indicaciones: 'Dejar con el conserje'
    },
    items: [ // Productos comprados
      { productId: 4, name: 'Fortnite', price: 0, qty: 1 }, // ID 4 de nuestros productos
      { productId: 5, name: 'Minecraft', price: 2695, qty: 4 }, // ID 5
      { productId: 6, name: 'Red Dead Redemption 2', price: 5999, qty: 1 }, // ID 6
      // (Añadimos otros basados en la imagen, aunque no estén en 'products')
      { productId: 10, name: 'Among Us', price: 499, qty: 1 },
      { productId: 11, name: 'The Witcher 3', price: 3999, qty: 1 },
      { productId: 12, name: 'Hollow Knight', price: 1499, qty: 1 },
      { productId: 13, name: 'Animal Crossing', price: 5999, qty: 1 }
    ],
    status: 'Entregado'
  },
  {
    id: 20240706,
    userId: 2, // Otra compra de Pedro
    userName: 'Pedro Hacker',
    userEmail: 'cliente@gmail.com',
    date: '2025-10-28',
    total: 549990,
    address: { /* ... (misma dirección) ... */ },
    items: [
      { productId: 5, name: 'PlayStation 5', price: 549990, qty: 1 } // ID 5 de 'products'
    ],
    status: 'En preparación'
  }
];