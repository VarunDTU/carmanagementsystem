"use client";

import { addCar } from "@/app/events/severActions";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Pafe() {
  const [newImages, setNewImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newCar, setNewCar] = useState({
    title: "",
    description: "",
    car_type: "",
    company: "",
    dealer: "",
    year: 2010,
    tags: [],
  });
  const router = useRouter();
  const updateCar = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await addCar(newCar, newImages);
      if (res.error) {
        throw new Error(res.error);
      }
      toast.success("Car updated successfully");
      setLoading(false);
      router.push(`/product/${res._id}`);
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };
  return (
    <div>
      <Toaster></Toaster>
      <div className="flex flex-row items-center justify-around p-10 h-full">
        <div className="w-1/2 p-20">
          <Carousel className="w-full ">
            {imagePreview.length < 1 ? (
              <CarouselContent>
                <CarouselItem>Nothing here</CarouselItem>
              </CarouselContent>
            ) : (
              <CarouselContent>
                {imagePreview.map((imageUrl, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card>
                        <div
                          className={`w-full flex justify-end p-1 text-red-300 hover:text-red-500`}
                          onClick={() => {
                            setRemovedImages([...removedImages, imageUrl]);
                            var newImages = newCar.images;
                            newImages.splice(index, 1);
                            setNewCar({
                              ...newCar,
                              images: newImages,
                            });
                            console.log(car);
                          }}
                        ></div>

                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <img src={imageUrl} className="w-full h-full"></img>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            )}
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div className="w-1/2">
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
                    let preview = [];
                    for (let i = 0; i < e.target.files.length; i++) {
                      preview.push(URL.createObjectURL(e.target.files[i]));
                    }
                    setImagePreview(preview);
                  }}
                />
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                >
                   {loading ? "Loading..." : "Update"}
                </button>
              </div>
            </fieldset>{" "}
          </form>
        </div>
      </div>
    </div>
  );
}
