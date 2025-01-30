
import Image from "next/image"
export default function DontMiss(){
    return(
      <section className="my-20">
      <h1 className="font-semibold text-xl mb-3 ml-2">Don&apos;t Miss</h1>
      <Image src={"/blue.png"} alt={"flight"} width={1344} height={700}/>
      
  </section>
    )
}