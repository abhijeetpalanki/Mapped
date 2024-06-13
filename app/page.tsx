"use client";

import dynamic from "next/dynamic";

const MapsWrapper = dynamic(() => import("./components/MapsWrapper"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="w-full h-full">
      <MapsWrapper />
    </main>
  );
}
