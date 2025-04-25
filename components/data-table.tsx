"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const tokenData = [
  { name: "ETH", price: "$1,759.19", amount: "1,030" },
  { name: "OP", price: "$0.77", amount: "1,000,000" },
  { name: "WELL", price: "$0.03", amount: "20,918,512" },
  { name: "MORPHO", price: "$1.10", amount: "400,863" },
];

export function TokenTable() {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Your Portfolio</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tokenData.map((token) => (
              <TableRow key={token.name}>
                <TableCell className="font-medium">{token.name}</TableCell>
                <TableCell>{token.price}</TableCell>
                <TableCell>{token.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
