"use server";
import cloudinary from "cloudinary";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const backendUrl = process.env.BACKEND_URL
  ? process.env.BACKEND_URL
  : "http://localhost:8000";

cloudinary.v2.config({
  secure: true,
});
export async function registerUser({ email, password }) {
  try {
    const res = await fetch(`${backendUrl}/user/register`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res || res.error) return { error: "Error creating user" };
    return { success: "User created successfully" };
  } catch (error) {
    return { error: error.message };
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
  const res = await fetch(`${backendUrl}/car/product/${id}`)
    .then((res) => res.json())
    .catch((err) => err);
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
      const publicId = parts[parts.length - 1].split(".")[0]; // Split by '.' to remove extension

      console.log(publicId); // Output: cr4mxeqx5zb8rlakpfkg
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
    return res.status(400).json({ error: err.message });
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
