"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, PlusCircle, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
export function TablePublications({ TableData }) {
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    setFilterData(TableData);
  }, [TableData]);
  function searchCars(searchTerm) {
    const results = TableData.filter((car) => {
      return Object.values(car).some((value) => {
        if (typeof value === "string") {
          return value.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (Array.isArray(value)) {
          return value.some(
            (item) =>
              typeof item === "string" &&
              item.toLowerCase().includes(searchTerm.toLowerCase())
          );
        } else if (typeof value === "number" && searchTerm) {
          const searchNum = Number(searchTerm);
          return !isNaN(searchNum) && value === searchNum;
        }
        return false;
      });
    });
    return results;
  }

  const [search, setsearch] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    setFilterData(searchCars(search));
  };
  if (!TableData) return <div>loading</div>;
  return (
    <div>
      <div className="flex items-center justify-between px-2">
        <form onSubmit={handleSearch}>
          <div className="flex flex-row items-center">
            <label
              htmlFor="Search"
              className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
            >
              <input
                type="text"
                id="Search"
                value={search}
                onChange={(e) => setsearch(e.target.value)}
                className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                placeholder="Username"
              />

              <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                Search
              </span>
            </label>
            <button className="border-l-0 border rounded">
              <Search className="m-2 hover:text-slate-400 cursor-pointer "></Search>
            </button>
          </div>
        </form>

        <Link href={"/product/new"} className="">
          <div className=" border m-1 hover:bg-slate-200  flex flex-row justify-end items-center rounded p-2 cursor-pointer">
            Add new <PlusCircle className="mx-2"></PlusCircle>
          </div>
        </Link>
      </div>
      {filterData == null ? (
        <div>Loading</div>
      ) : (
        <Table>
          <TableCaption>A list of your Cars</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Preview</TableHead>
              <TableHead className="">Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Dealer</TableHead>
              <TableHead>Year</TableHead>

              <TableHead className="">Tags</TableHead>
              <TableHead className=""></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterData.map((invoice) => (
              <TableRow key={invoice._id}>
                <TableCell className="font-medium">
                  <Image
                    src={invoice.images[0]}
                    width={100}
                    height={100}
                    alt="image"
                    placeholder="blur"
                    blurDataURL="/bluredcar.jpg"
                    className="w-20 rounded"
                  ></Image>
                </TableCell>
                <TableCell className="font-medium">{invoice.title}</TableCell>
                <TableCell className="truncate max-w-32 pr-3">
                  {invoice.description}
                </TableCell>
                <TableCell>{invoice.dealer}</TableCell>
                <TableCell className="">{invoice.year}</TableCell>
                <TableCell className="  ">
                  {invoice.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 text-gray-700 rounded-full text-sm px-1 mx-2 hover:bg-gray-300 cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </TableCell>
                <TableCell className="hover:text-blue-400 cursor-pointer">
                  <Link href={`/product/${invoice._id}`}>
                    <Eye className="" />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
