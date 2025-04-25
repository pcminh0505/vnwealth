import { CafeFInterestRate } from "@/types/cafef";
import axios from "axios";
import { NextResponse } from "next/server";
import { format } from "date-fns";

export async function GET() {
  const time = format(new Date(), "dd/MM/yyyy");
  console.log(time);
  try {
    const res = await axios.get<{
      Data: CafeFInterestRate[];
      Message: string | null;
      Success: boolean;
    }>(
      `https://cafef.vn/du-lieu/ajax/exchangerate/ajaxratecurrency.ashx?time=${time}`
    );
    const data = res.data.Data;

    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("CafeF Exchange Rate fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch exchange rates" },
      { status: 500 }
    );
  }
}
