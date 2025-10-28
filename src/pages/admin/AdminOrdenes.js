import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOrders } from '../../services/api'; // Importa la nueva función

function AdminOrdenes() {
  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getOrders();
        if (Array.isArray(data)) {
          setOrdenes(data);
        } else {
          setOrdenes([]);
          setError('Error al cargar órdenes: formato inválido.');
        }
      } catch (err) {
        setError('No se pudieron cargar las órdenes.');
        setOrdenes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <p>Cargando órdenes...</p>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <h2>Gestión de Órdenes ({ordenes.length})</h2>
      <div className="table-responsive">
        <table className="table table-dark table-striped table-hover align-middle">
          <thead>
            <tr>
              <th>ID Orden</th>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ordenes.map(order => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.date}</td>
                <td>{order.userName || order.userEmail}</td>
                <td>${order.total.toLocaleString('es-CL')}</td>
                <td>
                  <span className={`badge ${order.status === 'Entregado' ? 'bg-success' : 'bg-warning'}`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <Link to={`/admin/ordenes/${order.id}`} className="btn btn-sm btn-info">
                    Ver Detalles
                  </Link>
                  {/* (Podríamos añadir botones para cambiar estado aquí después) */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminOrdenes;