"use client";

import { getCarById, updateCarById } from "@/app/events/severActions";
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
import { PenIcon, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Page() {
  const carId = useParams().id;
  const [car, setCar] = useState(null);
  const [edit, setEdit] = useState(false);
  const [removedImages, setRemovedImages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [newCar, setNewCar] = useState({
    _id: "",
    title: "",
    description: "",
    car_type: "",
    company: "",
    dealer: "",
    year: 0,
    tags: [],
    images: [],
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      await getCarById(carId)
        .then((res) => {
          setCar(res);
          setNewCar(res);
        })

        .catch((err) => toast.error(err.message));
    };
    fetchData();
  }, []);

  const updateCar = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await updateCarById(
        carId,
        newCar,
        uploadedImages,
        removedImages
      );
      console.log(res);
      setNewCar(res);
      setCar(res);
      setEdit(false);
      toast.success("Car updated successfully");
      setLoading(false);
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };
  if (!car) return <div>Loading...</div>;
  return (
    <div className="w-full flex flex-row items-center justify-center">
      <Toaster></Toaster>
      <div className="w-1/2 p-10">
        <Carousel className="">
          {newCar.images.length < 1 ? (
            <CarouselContent>
              <CarouselItem>Nothing here</CarouselItem>
            </CarouselContent>
          ) : (
            <CarouselContent>
              {newCar.images.map((imageUrl, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      {edit ? (
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
                        >
                          <Trash></Trash>
                        </div>
                      ) : null}

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
        <div className="p-2">
          <section className={`${edit ? "border rounded" : ""}`}>
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
              <div className="flex  w-full justify-end">
                <PenIcon
                  className={`cursor-pointer p-1 ${
                    edit ? "text-red-500" : "text-gray-500"
                  }`}
                  onClick={() => {
                    setEdit(!edit);
                    setNewCar(car);
                    const oldImages = newCar.images;
                    setNewCar({
                      ...newCar,
                      images: newCar.images.concat(removedImages),
                    });
                  }}
                ></PenIcon>
              </div>
              <form
                action="#"
                className="space-y-4"
                onSubmit={(e) => updateCar(e)}
              >
                <fieldset disabled={!edit}>
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

                  <div className="mt-4">
                    {edit ? (
                      <div className="flex justify-between">
                        <button
                          type="submit"
                          className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                          disabled={loading}
                        >
                          {loading ? "loading" : "Save"}
                        </button>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                          <Label htmlFor="picture">Picture</Label>
                          <Input
                            id="picture"
                            type="file"
                            maxcount={10}
                            multiple
                            accept="image/png, image/gif, image/jpeg"
                            onChange={(e) => {
                              setUploadedImages(e.target.files);
                              console.log(e.target.files);
                            }}
                          />
                        </div>
                      </div>
                    ) : null}
                  </div>
                </fieldset>{" "}
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
