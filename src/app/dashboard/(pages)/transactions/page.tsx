"use client";

import { useGetPayments } from "@/hooks/usePayments";
import { useUserData } from "@/hooks/useUserData";
import { format } from "date-fns";
import { useGetItem } from "@/hooks/useItems";
import Link from "next/link";

export default function Transactions() {
  const { currentUser, isLoading: userLoading } = useUserData();
  const { data: payments, isLoading } = useGetPayments(
    currentUser?.email ? { email: currentUser.email } : undefined,
  );

  if (userLoading || isLoading) {
    return (
      <p className="text-base-content/40 text-sm">Loading transactions...</p>
    );
  }

  if (!payments || payments.length === 0) {
    return <p className="text-base-content/50">No transactions found.</p>;
  }

  return (
    <section className="bg-base-100 rounded-xl shadow-sm border border-base-content/10 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-base-200 text-base-content/70 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Transaction</th>
              <th className="px-4 py-3">Items</th>
              <th className="px-4 py-3 text-right">Amount</th>
              <th className="px-4 py-3">Paid At</th>
              <th className="px-4 py-3 text-right">Receipt</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment) => (
              <tr
                key={payment.tranId}
                className="hover:bg-base-200/50 transition border-t border-base-content/5 first:border-t-0"
              >
                <td className="px-4 py-3 font-mono text-xs text-base-content/60">
                  {payment.tranId}
                </td>

                <td className="px-4 py-3 space-y-1">
                  {payment.items.map((item) => (
                    <PaidItem key={item.id} id={item.id} qty={item.quantity} />
                  ))}
                </td>

                <td className="px-4 py-3 text-right font-semibold text-success">
                  ৳ {payment.amount.toLocaleString()}
                </td>

                <td className="px-4 py-3 text-base-content/60">
                  {payment.paidAt
                    ? format(new Date(payment.paidAt), "dd MMM yyyy, hh:mm a")
                    : "-"}
                </td>

                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/success?tranId=${payment.tranId}`}
                    className="btn btn-xs btn-outline btn-primary rounded-lg font-medium"
                  >
                    View Receipt
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

interface Props {
  id: string;
  qty: number;
}

export function PaidItem({ id, qty }: Props) {
  const { data: item, isLoading } = useGetItem(id);

  if (isLoading) {
    return <div className="text-gray-400">Loading item...</div>;
  }

  if (!item) {
    return <div className="text-red-500">Item not found</div>;
  }

  return (
    <div className="flex justify-between gap-2 text-base-content/80">
      <span className="truncate">{item.name}</span>
      <span className="text-xs text-base-content/40">× {qty}</span>
    </div>
  );
}
