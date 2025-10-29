import { products, categories, users } from '../data/db.js';

// --- Funciones de PRODUCTOS (CRUD) ---
export const getProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 500);
  });
};

export const getProductById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = products.find(p => p.id === parseInt(id));
      if (product) {
        resolve(product);
      } else {
        reject('Producto no encontrado');
      }
    }, 500);
  });
};

export const deleteProduct = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const productIndex = products.findIndex(p => p.id === parseInt(id));
      if (productIndex !== -1) {
        console.log("Simulando borrado del producto ID:", id);
        // En simulación, solo resolvemos. No modificamos el array importado directamente
        // para evitar efectos secundarios si db.js se recarga.
        resolve({ success: true, message: 'Producto eliminado (simulado)' });
      } else {
        reject('Producto no encontrado para eliminar');
      }
    }, 500);
  });
};

export const createProduct = (productData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newProduct = {
        // Genera un ID más seguro que solo length + 100
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
        ...productData,
        precio: parseFloat(productData.precio) || 0,
        stock: parseInt(productData.stock) || 0,
        precioTexto: `$${(parseFloat(productData.precio) || 0).toLocaleString('es-CL')} CLP`
      };
      console.log("Simulando creación del producto:", newProduct);
      // No modificamos 'products' directamente en la simulación
      resolve(newProduct);
    }, 500);
  });
};

export const updateProduct = (id, productData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const productIndex = products.findIndex(p => p.id === parseInt(id));
      if (productIndex !== -1) {
        const updatedProduct = {
          ...products[productIndex],
          ...productData,
          precio: parseFloat(productData.precio) || 0,
          stock: parseInt(productData.stock) || 0,
          precioTexto: `$${(parseFloat(productData.precio) || 0).toLocaleString('es-CL')} CLP`
        };
        console.log("Simulando actualización del producto ID:", id, updatedProduct);
        // No modificamos 'products' directamente en la simulación
        resolve(updatedProduct);
      } else {
        reject('Producto no encontrado para actualizar');
      }
    }, 500);
  });
};

// --- Funciones de CATEGORÍAS ---
export const getCategories = () => {
   return new Promise((resolve) => {
    setTimeout(() => {
      resolve(categories);
    }, 200);
  });
};

// --- Funciones de USUARIOS (Autenticación y CRUD Admin) ---
export const loginUser = (email, password) => {
  return new Promise((resolve, reject) => {
    // 👇 Logs para depurar 👇
    console.log("Intentando login con:", { email, password });
    console.log("Usuarios en DB para comparar:", users);

    setTimeout(() => {
      // Busca el usuario que coincida EXACTAMENTE con email Y password
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      console.log("Usuario encontrado después de find:", user); // <-- ¿Qué sale aquí?

      if (user) {
        // Si lo encuentra, devuelve el usuario (sin contraseña)
        const { password, ...userWithoutPassword } = user;
        resolve(userWithoutPassword);
      } else {
        // Si no lo encuentra (user es undefined), rechaza
        reject('Credenciales incorrectas. Inténtalo de nuevo.');
      }
    }, 1000); // Simula espera de 1 segundo
  });
};

export const registerUser = (userData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const emailExists = users.some((u) => u.email === userData.email);
      if (emailExists) {
        reject('El correo electrónico ya está registrado.');
      } else {
        const newUser = {
          id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
          ...userData,
          role: 'customer'
        };
        console.log("Usuario nuevo simulado:", newUser);
        // No modificamos 'users' directamente
        const { password, ...userWithoutPassword } = newUser;
        resolve(userWithoutPassword);
      }
    }, 1000);
  });
};

export const getUsers = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const usersWithoutPasswords = users.map(({ password, ...user }) => user);
      resolve(usersWithoutPasswords);
    }, 300);
  });
};

export const getUserById = (id) => {
 return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(u => u.id === parseInt(id));
      if (user) {
        const { password, ...userWithoutPassword } = user;
        resolve(userWithoutPassword);
      } else {
        reject('Usuario no encontrado');
      }
    }, 300);
  });
};

export const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const userIndex = users.findIndex(u => u.id === parseInt(id));
      if (userIndex !== -1) {
        if (users[userIndex].id === 1) { // Evita borrar admin ID 1
             reject('No se puede eliminar al administrador principal.');
             return;
        }
        console.log("Simulando borrado del usuario ID:", id);
        // No modificamos 'users' directamente
        resolve({ success: true, message: 'Usuario eliminado (simulado)' });
      } else {
        reject('Usuario no encontrado para eliminar');
      }
    }, 500);
  });
};

export const createUser = (userData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const emailExists = users.some((u) => u.email === userData.email);
      if (emailExists) {
        reject('El correo electrónico ya está registrado.');
      } else {
        const newUser = {
          id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
          ...userData,
          role: ['admin', 'customer'].includes(userData.role) ? userData.role : 'customer'
        };
        console.log("Simulando creación de usuario (admin):", newUser);
        // No modificamos 'users' directamente
        const { password, ...userWithoutPassword } = newUser;
        resolve(userWithoutPassword);
      }
    }, 500);
  });
};

export const updateUser = (id, userData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const userIndex = users.findIndex(u => u.id === parseInt(id));
      if (userIndex !== -1) {
        const emailExists = users.some((u, index) => u.email === userData.email && index !== userIndex);
        if (emailExists) {
             reject('El correo electrónico ya está en uso por otro usuario.');
             return;
        }
        const updatedUser = {
          ...users[userIndex],
          ...userData,
          role: ['admin', 'customer'].includes(userData.role) ? userData.role : users[userIndex].role
        };
        console.log("Simulando actualización de usuario (admin) ID:", id, updatedUser);
        // No modificamos 'users' directamente
        const { password, ...userWithoutPassword } = updatedUser;
        resolve(userWithoutPassword);
      } else {
        reject('Usuario no encontrado para actualizar');
      }
    }, 500);
  });
};

// --- Funciones de ÓRDENES ---
export const getOrders = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Usamos require aquí para intentar obtener los datos más 'frescos'
      // aunque en una simulación estática no es estrictamente necesario.
      const { orders } = require('../data/db.js');
      resolve(orders || []); // Devuelve array vacío si 'orders' no existe
    }, 400);
  });
};

export const getOrderById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const { orders } = require('../data/db.js');
      // Asegurarse de que orders es un array antes de buscar
      const order = Array.isArray(orders) ? orders.find(o => o.id === parseInt(id)) : undefined;
      if (order) {
        resolve(order);
      } else {
        reject('Orden no encontrada');
      }
    }, 400);
  });
};