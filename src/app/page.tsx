import BestAir from "./components/BestAir";
import DontMiss from "./components/Dontmiss";
import Essentials from "./components/Essentials";
import Featured from "./components/Featured";

import Hero from "./components/Hero";
import Last from "./components/Last";

export default function Home() {
  return (
    <div>
      <Hero />
      <BestAir />
      <Featured />

      <DontMiss />
      <Essentials />
      <Last />
    </div>
  );
}
