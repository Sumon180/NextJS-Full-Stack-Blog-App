"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";

interface updateBlog {
  title: string;
  description: string;
  id: string;
}

const updateBlog = async (data: updateBlog) => {
  const res = await fetch(`http://localhost:3001/api/blog/${data.id}`, {
    method: "PUT",
    body: JSON.stringify({ title: data.title, description: data.description }),
    //@ts-ignore
    "Content-Type": "application/json",
  });
  return res.json;
};

const deleteBlog = async (id: string) => {
  const res = await fetch(`http://localhost:3001/api/blog/${id}`, {
    method: "DELETE",
    //@ts-ignore
    "Content-Type": "application/json",
  });
  return res.json;
};

async function getBlogById(id: string) {
  const res = await fetch(`http://localhost:3001/api/blog/${id}`);
  const data = await res.json();
  return data.post;
}

const EditBlog = ({ params }: { params: { id: string } }) => {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descRef = useRef<HTMLTextAreaElement | null>(null);
  const router = useRouter()

  useEffect(() => {
    toast.loading("Fetching Blog Details 🚀", { id: "1" });
    getBlogById(params.id)
      .then((data) => {
        if (titleRef.current && descRef.current) {
          titleRef.current.value = data.title;
          descRef.current.value = data.description;
          toast.success("Fetching completed", { id: "1" });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error Fetching blog", { id: "1" });
      });
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (titleRef.current && descRef.current) {
      toast.loading("Sending request 🚀", { id: "1" });
      await updateBlog({
        title: titleRef.current?.value,
        description: descRef.current?.value,
        id: params.id,
      });
      toast.success("Blog edited successfully 🚀", { id: "1" });
      router.push("/")
    }
  };

  const handleDelete = async () => {
    toast.loading("Deleting blog", { id: "2" });
    await deleteBlog(params.id);
    toast.success("Deleted succesfully", { id: "2" });
    router.push("/")
  };

  return (
    <>
      <Toaster />
      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-200 font-bold p-3">Edit Blog 🚀</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              ref={titleRef}
              placeholder="Enter Title"
              className="rounded-md w-full px-4 my-2 py-2"
            />
            <textarea
              ref={descRef}
              placeholder="Enter Description"
              className="rounded-md w-full px-4 my-2 py-2"
            />
            <button className=" font-semibold px-4 py-1 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
              Update
            </button>
          </form>
          <button
            onClick={handleDelete}
            className="px-7 py-2 ml-3 text-center text-xl bg-red-500 rounded-md font-semibold text-slate-200"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default EditBlog;
