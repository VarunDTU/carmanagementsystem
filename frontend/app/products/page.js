"use client";
import { TablePublications } from "@/components/table";
import { useEffect, useState } from "react";
import { getAllCars } from "../events/severActions";
export default function Page() {
  const [data, setdata] = useState();

  useEffect(() => {
    const fetchData = async () => {
      await getAllCars().then((res) => setdata(res));
    };
    fetchData();
  }, []);
  return (
    <div className="w-full ">
      <TablePublications className="w-full" TableData={data} />
    </div>
  );
}
