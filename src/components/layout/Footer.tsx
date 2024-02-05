import React from "react";

export default function Footer() {
  return (
    <footer className="bg-background">
      <div className="container flex items-center justify-center py-6">
        <p className=" flex items-center">
          Built by François-Xavier. {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
