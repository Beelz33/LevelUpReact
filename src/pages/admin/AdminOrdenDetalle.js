import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrderById } from '../../services/api'; // Importa la nueva función

function AdminOrdenDetalle() {
  const { id } = useParams(); // Obtiene el ID de la orden desde la URL
  const [orden, setOrden] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getOrderById(id);
        setOrden(data);
      } catch (err) {
        setError('No se pudo cargar la orden.');
        setOrden(null);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) return <p>Cargando detalle de la orden...</p>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!orden) return <div className="alert alert-warning">Orden no encontrada.</div>;

  // Renderizado del detalle (similar a Figura 7 [cite: 198])
  return (
    <div>
      <Link to="/admin/ordenes" className="btn btn-secondary mb-3">
        &lt; Volver a Órdenes
      </Link>
      <h2>Detalle de Orden #{orden.id}</h2>
      <div className="card perfil-card p-4 mb-4">
        <h4>Información del Cliente</h4>
        <p><strong>Nombre:</strong> {orden.userName}</p>
        <p><strong>Email:</strong> {orden.userEmail}</p>
        <p><strong>Fecha:</strong> {orden.date}</p>
        <p><strong>Estado:</strong> {orden.status}</p>
      </div>

      <div className="card perfil-card p-4 mb-4">
         <h4>Dirección de Entrega</h4>
         <p>{orden.address.calle}{orden.address.departamento ? `, ${orden.address.departamento}` : ''}</p>
         <p>{orden.address.comuna}, {orden.address.region}</p>
         {orden.address.indicaciones && <p><small>Indicaciones: {orden.address.indicaciones}</small></p>}
      </div>

      <div className="card perfil-card p-4">
        <h4>Productos Comprados</h4>
        <table className="table table-dark table-sm">
          <thead>
            <tr>
              <th>Producto</th>
              <th className="text-end">Precio Unit.</th>
              <th className="text-center">Cantidad</th>
              <th className="text-end">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {orden.items.map((item, index) => (
              <tr key={item.productId || index}>
                <td>{item.name}</td>
                <td className="text-end">${item.price.toLocaleString('es-CL')}</td>
                <td className="text-center">{item.qty}</td>
                <td className="text-end">${(item.price * item.qty).toLocaleString('es-CL')}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th colSpan="3" className="text-end">Total Pagado:</th>
              <th className="text-end fs-5">${orden.total.toLocaleString('es-CL')}</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default AdminOrdenDetalle;