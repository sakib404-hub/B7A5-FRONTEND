"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IUser } from "@/types/types";
import { motion } from "framer-motion";

const CustomerDashboard = ({ user }: {user : IUser}) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">
        Welcome, {user.name}
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {["My Rentals", "Browse Gear", "Reviews"].map((item, i) => (
          <motion.div
            key={i}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{item}</CardTitle>
              </CardHeader>
              <CardContent>
                Manage your {item.toLowerCase()}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CustomerDashboard;