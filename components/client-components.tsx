"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  function handleClick() {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }

  return (
    <Button variant={"outline"} size={"icon"} onClick={() => handleClick()}>
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
}
