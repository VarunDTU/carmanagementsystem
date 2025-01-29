"use client";

import { addCar } from "@/app/events/severActions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(",")[1]); // Extract base64 part
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

export default function Pafe() {
  const [newImages, setNewImages] = useState([]);
  const [newCar, setNewCar] = useState({
    title: "",
    description: "",
    car_type: "",
    company: "",
    dealer: "",
    year: undefined,
    tags: [],
  });
  const router = useRouter();
  const updateCar = async (e) => {
    e.preventDefault();

    try {
      const res = await addCar(newCar, newImages);
      //   router.push(`/product/${res._id}`);
      if (res.error) {
        throw new Error(res.error);
      }
      toast.success("Car updated successfully");
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div>
      <Toaster></Toaster>
      <div className=" flex items-center justify-center p-10">
        <form
          action="#"
          className="space-y-4 w-full"
          onSubmit={(e) => updateCar(e)}
        >
          <fieldset>
            <div>
              <label className="sr-only" htmlFor="name">
                Name
              </label>
              <input
                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                value={newCar.title}
                onChange={(e) => {
                  setNewCar({ ...newCar, title: e.target.value });
                }}
                type="text"
                id="name"
                placeholder="Name"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="sr-only" htmlFor="email">
                  Dealer
                </label>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Dealer"
                  value={newCar.dealer}
                  onChange={(e) => {
                    setNewCar({ ...newCar, dealer: e.target.value });
                  }}
                />
              </div>

              <div>
                <label className="sr-only" htmlFor="phone">
                  Company
                </label>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  value={newCar.company}
                  onChange={(e) => {
                    setNewCar({ ...newCar, company: e.target.value });
                  }}
                  placeholder="Company"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="sr-only" htmlFor="email">
                  Year
                </label>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="year"
                  type="number"
                  value={newCar.year}
                  onChange={(e) => {
                    setNewCar({ ...newCar, year: e.target.value });
                  }}
                />
              </div>

              <div>
                <label className="sr-only" htmlFor="phone">
                  Tags
                </label>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  value={newCar.tags.toString()}
                  onChange={(e) => {
                    const newTags = e.target.value.split(",");
                    setNewCar({ ...newCar, tags: newTags });
                  }}
                  placeholder="Tags"
                />
              </div>
            </div>

            <div>
              <label className="sr-only" htmlFor="message">
                Description
              </label>

              <textarea
                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                placeholder="Description"
                rows="8"
                id="description"
                onChange={(e) => {
                  setNewCar({ ...newCar, description: e.target.value });
                }}
                value={newCar.description}
              ></textarea>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">Picture</Label>
              <Input
                id="picture"
                type="file"
                maxcount={10}
                multiple
                accept="image/png, image/gif, image/jpeg"
                onChange={(e) => {
                  setNewImages(e.target.files);
                  console.log(e.target.files);
                }}
              />
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
              >
                Update
              </button>
            </div>
          </fieldset>{" "}
        </form>
      </div>
    </div>
  );
}
