import { motion } from "framer-motion";

interface ProviderHeaderProps {
  name: string;
}

const ProviderHeader = ({ name }: ProviderHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <h1 className="text-2xl font-bold tracking-tight text-slate-800 md:text-3xl">
        Welcome back, {name} 👋
      </h1>

      <p className="mt-2 text-sm text-slate-500 md:text-base">
        Manage your gears, track rental orders, and monitor your earnings.
      </p>
    </motion.div>
  );
};

export default ProviderHeader;