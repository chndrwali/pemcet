import Image from 'next/image';
import { CardTechniqueContinues } from './card-continues';

const ContinuesPage = () => {
  return (
    <section className="relative flex flex-col items-center justify-center z-20">
      <div className="flex items-center space-x-4 -mb-[20px]">
        <Image src="/logo/guru.png" alt="Labubu" width={100} height={100} className=" z-30" />
        <Image src="/logo/murid-3.png" alt="Speech Bubble" width={200} height={100} className="z-30 " />
      </div>
      <CardTechniqueContinues />
    </section>
  );
};

export default ContinuesPage;
