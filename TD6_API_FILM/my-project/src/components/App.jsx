import React, { useState, useEffect } from "react";
import Card from './components/Card';
import Soon from './components/Soon';

export default function App() {

  

  return (
    <>
      <Card note={5} />
      <section className="w-full">
        <div className="flex overflow-x-scroll overflow-y-hidden pl-10 gap-8">
        <Soon/>
        </div>
      </section>
    </>
  );
}