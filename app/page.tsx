"use client"
import React, { useState } from "react";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import useStoreUserEffect from "@/hooks/useStoreUser";
import { useMutation, useQuery } from "convex/react";
import Image from "next/image";
import { api } from "@/convex/_generated/api";

export default function Home() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const userId = useStoreUserEffect();
  const [text, setText] = useState("");
  const createTodo = useMutation(api.todos.createTodo);
  const todos = useQuery(api.todos.getTodos);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>Healthy Diet</h1>
        {isAuthenticated ? (
          <>
            <p>Welcome back! user ID: {userId}</p>
            <UserButton afterSignOutUrl="/" />
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
              {todos?.map((todo) => (
                <div key={todo._id} className="flex justify-between items-center w-full">
                  <p>{todo.text}</p>
                </div>
              ))}
              <p>Todo forum</p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  createTodo({ text });
                  setText("");
                }}
              >
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  style={{
                    color: "black",
                    padding: "8px",
                    borderRadius: "5px",
                    border: "1px solid black"
                  }}
                />
                <button style={{ backgroundColor: "blue", color: "white", fontWeight: "bold", padding: "12px 20px", borderRadius: "5px", border: "none" }}>Add todos</button>
                <span style={{ marginRight: "10px" }}></span>
                <button style={{ backgroundColor: "blue", color: "white", fontWeight: "bold", padding: "12px 20px", borderRadius: "5px", border: "none" }}>
                  <a href="https://paystack.com/pay/7g-7y61iiw" style={{ textDecoration: "none", color: "white" }}>Subscribe to service</a>
                </button>
              </form>
              <h2>Let our AI bot help you achieve todos!!!</h2>
              <iframe src="https://healthydiet-b63c3.web.app/" title="ulcer-heal" style={{ width: "30%", height: "50vh", border: "none" }} />
            </div>
          </>
        ) : (
          <>
            <SignInButton />
          </>
        )}
      </div>
      <br />
      <br />
      <br />
      {!isAuthenticated && (
        <p>
          Welcome to the world of healthy living! At Healthy Diet, we believe
          <br />
          that a balanced and nutritious diet is the cornerstone of overall
          <br />
          well-being. Our mission is to empower you with the knowledge and
          <br />
          resources you need to make informed choices about your diet and
          <br />
          lifestyle. Whether you're looking to prevent health issues, manage
          <br />
          weight, or simply feel your best, we're here to support you on your
          <br />
          journey to a healthier you. Explore our platform to discover expert
          <br />
          advice, delicious recipes, and personalized tips tailored to your
          <br />
          unique needs. Start your journey to a healthier lifestyle today with
          <br />
          Healthy Diet!. Please Signin to continue, also note that this is a test app
          <br/>
          please don't enter sensitive data such as card details etc
        </p>
      )}
    </main>
  );
}
