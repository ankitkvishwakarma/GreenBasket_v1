const OrderFilters = ({ status, setStatus }) => {
  return (
    <div>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="">All Orders</option>
        <option value="Pending">Pending</option>
        <option value="Confirmed">Confirmed</option>
        <option value="Packed">Packed</option>
        <option value="Assigned">Assigned</option>
        <option value="Picked Up">Picked Up</option>
        <option value="Out for Delivery">Out for Delivery</option>
        <option value="Delivered">Delivered</option>
        <option value="Cancelled">Cancelled</option>
      </select>

    </div>
  );
};

export default OrderFilters;