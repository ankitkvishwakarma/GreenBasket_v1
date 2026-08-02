import { ShoppingBag } from "lucide-react";

const OrderHeader = () => {
  return (
    <div className="flex items-center justify-between">

      <div>

        <h1 className="text-3xl font-bold">
          Orders
        </h1>

        <p className="text-gray-500 mt-1">
          Manage customer orders
        </p>

      </div>

      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">

        <ShoppingBag className="h-6 w-6 text-primary" />

      </div>

    </div>
  );
};

export default OrderHeader;