import Image from 'next/image';
import { CardTechnique } from './card-technique';

const BasicTechniquePage = () => {
  return (
    <section className="relative flex flex-col items-center justify-center z-20">
      <div className="flex items-center">
        <Image src="/logo/labubu.png" alt="Labubu" width={100} height={100} className=" z-20 ml-[20px] mt-[20px]" />
        <Image src="/logo/buble-2.png" alt="Speech Bubble" width={200} height={100} className="z-10 -mt-[80px]" />
      </div>
      <CardTechnique />
    </section>
  );
};

export default BasicTechniquePage;
