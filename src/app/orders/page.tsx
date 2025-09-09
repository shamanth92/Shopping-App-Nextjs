import OrderHistory from "@/components/orderHistory";
import { AppHeader } from "@/ui-components/AppHeader/AppHeader";

export default function OrdersScreen() {
  return (
    <div>
      <AppHeader />
      <OrderHistory />
    </div>
  );
}
