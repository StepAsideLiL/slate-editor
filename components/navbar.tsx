import React from "react";
import { ModeToggle } from "./client-components";

export default function Navbar() {
  return (
    <header className="container flex items-center justify-between py-5">
      <nav></nav>

      <ModeToggle />
    </header>
  );
}
