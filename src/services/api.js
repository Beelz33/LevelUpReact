import { products, categories, users } from '../data/db.js';

// --- Funciones de PRODUCTOS (CRUD) ---
export const getProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products); // <<<--- CÓDIGO REAL
    }, 500);
  });
};

export const getProductById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = products.find(p => p.id === parseInt(id));
      if (product) {
        resolve(product); // <<<--- CÓDIGO REAL
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
        resolve({ success: true, message: 'Producto eliminado (simulado)' }); // <<<--- CÓDIGO REAL
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
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 100,
        ...productData,
        precio: parseFloat(productData.precio) || 0,
        stock: parseInt(productData.stock) || 0,
        precioTexto: `$${(parseFloat(productData.precio) || 0).toLocaleString('es-CL')} CLP`
      };
      console.log("Simulando creación del producto:", newProduct);
      resolve(newProduct); // <<<--- CÓDIGO REAL
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
        resolve(updatedProduct); // <<<--- CÓDIGO REAL
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
      resolve(categories); // <<<--- CÓDIGO REAL
    }, 200);
  });
};

// --- Funciones de USUARIOS (Autenticación y CRUD Admin) ---
export const loginUser = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(
        (u) => u.email === email && u.password === password
      );
      if (user) {
        const { password, ...userWithoutPassword } = user;
        resolve(userWithoutPassword); // <<<--- CÓDIGO REAL
      } else {
        reject('Credenciales incorrectas. Inténtalo de nuevo.');
      }
    }, 1000);
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
        const { password, ...userWithoutPassword } = newUser;
        resolve(userWithoutPassword); // <<<--- CÓDIGO REAL
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
        if (users[userIndex].id === 1) {
             reject('No se puede eliminar al administrador principal.');
             return;
        }
        console.log("Simulando borrado del usuario ID:", id);
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
      // Importa 'orders' aquí para asegurar que toma la versión actualizada
      // si 'db.js' cambiara (aunque en nuestro caso es estático)
      const { orders } = require('../data/db.js');
      resolve(orders);
    }, 400); // Simula 0.4 segundos
  });
};

/**
 * Devuelve una orden por su ID (simulado)
 */
export const getOrderById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const { orders } = require('../data/db.js');
      const order = orders.find(o => o.id === parseInt(id));
      if (order) {
        resolve(order);
      } else {
        reject('Orden no encontrada');
      }
    }, 400);
  });
};