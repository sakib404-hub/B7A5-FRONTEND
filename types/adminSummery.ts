export interface AdminSummary {
  users: {
    total: number;
    providers: number;
    customers: number;
  };

  categories: {
    total: number;
  };

  gears: {
    total: number;
    available: number;
    unavailable: number;
  };

  rentals: {
    total: number;
    pending: number;
    confirmed: number;
    ongoing: number;
    completed: number;
    cancelled: number;
  };

  payments: {
    total: number;
    paidOrders: number;
    unpaidOrders: number;
    totalRevenue: number;
  };
}