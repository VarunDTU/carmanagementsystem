"use server";
import cloudinary from "cloudinary";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "../api/auth/[...nextauth]/route";
const backendUrl = process.env.BACKEND_URL
  ? process.env.BACKEND_URL
  : "http://localhost:8000";

cloudinary.v2.config({
  secure: true,
});
export async function registerUser({ email, password }) {
  const mySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });
  try {
    mySchema.parse({ email, password });
    const res = await fetch(`${backendUrl}/user/register`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res || res.error)
      throw new Error({ message: [{ message: res.error }] });
    return { success: "User created successfully" };
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getAllCars() {
  const session = await getServerSession(authOptions);
  console.log("session", session.user.id);
  const res = await fetch(`${backendUrl}/car/products/${session.user.id}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => err);
  console.log("res", res);
  return res;
}

export async function getCarById(id) {
  const session = await getServerSession(authOptions);
  if (!session.user.id) throw new Error("Session Error");
  const options = {
    method: "GET",
    headers: {
      Authorization: session.user.id,
    },
  };
  const res = await fetch(`${backendUrl}/car/product/${id}`, options)
    .then((res) => {
      if (res.ok) return res.json();
      else throw new Error("Car not found");
    })
    .catch((err) => {
      throw new Error(err.message);
    });
  return res;
}
export async function updateCarById(id, data, uploadedImages, removedImages) {
  for (var i = 0; i < uploadedImages.length; i++) {
    const bytes = await uploadedImages[i].arrayBuffer();
    const buffer = Buffer.from(bytes);
    await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        {
          folder: "car",
        },
        (error, result) => {
          if (error) {
            console.log("error", error);
            reject(error);
          }
          data.images.push(result.secure_url);
          console.log("result", result);
          resolve(result.secure_url);
        }
      );
      uploadStream.end(buffer);
    });
  }
  console.log(data.images);
  for (var i = 0; i < removedImages; i++) {
    try {
      const urlString = removedImages[i];
      const url = new URL(urlString);
      const pathname = url.pathname;
      const parts = pathname.split("/");
      const publicId = parts[parts.length - 1].split(".")[0];

      console.log(publicId);
      const result = await cloudinary.v2.uploader.destroy(publicId);
      data.images = data.images.filter((image) => image !== removedImages[i]);
    } catch (err) {
      return { error: err.message };
    }
  }
  const res = await fetch(`${backendUrl}/car/product/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => err);
  return res;
}

export async function addCar(data, images) {
  const session = await getServerSession(authOptions);
  const imagePaths = [];

  try {
    for (var i = 0; i < images.length; i++) {
      const bytes = await images[i].arrayBuffer();
      const buffer = Buffer.from(bytes);
      await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream(
          {
            folder: "car",
          },
          (error, result) => {
            if (error) {
              reject(error);
            }
            imagePaths.push(result.secure_url);
            resolve(result.secure_url);
          }
        );
        uploadStream.end(buffer);
      });

      console.log("imagePaths", imagePaths);
    }
  } catch (err) {
    throw new Error(err.message);
  }
  try {
    const res = await fetch(`${backendUrl}/car/product`, {
      method: "POST",
      body: JSON.stringify({
        ...data,
        images: imagePaths,
        owner: session.user.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.json();
  } catch (error) {
    return { error: error.message };
  }
}

export async function searchCars(keyword) {
  const res = await fetch(`${backendUrl}/car/search?keyword=${field}`);
}

export async function deleteCar(id) {
  console.log("id", id);
  const res = await fetch(`${backendUrl}/car/product/${id}`, {
    method: "DELETE",
  })
    .then(async (res) => {
      res = await res.json();
      console.log("res", res);
      for (var i = 0; i < res.images.length; i++) {
        const urlString = res[i];
        const url = new URL(urlString);
        const pathname = url.pathname;
        const parts = pathname.split("/");
        const publicId = parts[parts.length - 1].split(".")[0];
        console.log(publicId);
        const result = await cloudinary.v2.uploader.destroy(publicId);
      }
    })
    .catch((err) => err);
  return res;
}
