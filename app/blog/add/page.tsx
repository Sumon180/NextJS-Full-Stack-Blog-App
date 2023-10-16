"use client";

import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import toast, { Toaster } from "react-hot-toast";

async function addBlog({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const res = await fetch("http://localhost:3001/api/blog", {
    method: "POST",
    body: JSON.stringify({ title, description }),
    //@ts-ignore
    "Content-Type": "application/json",
  });
  return res.json;
}

const AddBlog = () => {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descRef = useRef<HTMLTextAreaElement | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (titleRef.current && descRef.current) {
      toast.loading("Sending request 🚀", { id: "1" });
      await addBlog({
        title: titleRef.current?.value,
        description: descRef.current?.value,
      });
      toast.success("Blog posted succefully 🚀", { id: "1" });
      router.push("/");
    }
  };

  return (
    <>
      <Toaster />
      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-200 font-bold p-3">
            Add a wonder Blog 🚀
          </p>
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
              Add
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBlog;
