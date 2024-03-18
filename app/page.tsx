"use client";
import React from "react";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import useStoreUserEffect from "@/hooks/useStoreUser";

import { useMutation, useQuery } from "convex/react";
import Image from "next/image";
import { useState } from "react";
import { api } from "@/convex/_generated/api";

export default function Home() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const userId = useStoreUserEffect();
  const [text, setText] = useState("")
  const createTodo = useMutation(api.todos.createTodo);
  const todos = useQuery(api.todos.getTodos);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  // if (userId === null) {
  //   return <div>Storing user...</div>;
  // }

  return (


    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>Healthy Diet</h1>
        {isAuthenticated ? (
          <>
            <p>Welcome back! Stored user ID: {userId}</p>
            <UserButton afterSignOutUrl="/" />

            
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
              {todos?.map((todo) => {
                return (
                  <div key={todo._id} className="flex justify-between items-center w-full">
                    <p>{todo.text}</p>
                  </div>
                );
              }
              )}
              <p>Todo forum</p>

              <form onSubmit={e => {
                e.preventDefault();
                console.log(e);
                createTodo({ text });
                setText("");

              }}>
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  style={{
                    color: 'black',
                    padding: '8px',
                    borderRadius: '5px',
                    border: '1px solid black'
                  }}
                />

                <button style={{ backgroundColor: 'blue', color: 'white', fontWeight: 'bold', padding: '12px 20px', borderRadius: '5px', border: 'none' }}>Add todos</button>

              </form>
              <h2>Let our AI bot help you achieve todos!!!</h2>
              <iframe src="https://healthydiet-b63c3.web.app/" title="ulcer-heal" style={{ width: "30%", height: "50vh", border: "none" }} />

            </div>

          </>


        ) : (
          <SignInButton />
        )}
      </div>




    </main>
  );
}

