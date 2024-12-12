import Image from 'next/image';

interface ButtonNextPreviousProps {
  isLeft: boolean;
  onClick: () => void;
}

export const ButtonNextPrevious = ({ onClick, isLeft }: ButtonNextPreviousProps) => {
  return (
    <button
      onClick={onClick}
      className={`absolute -bottom-14 ${
        isLeft ? 'left-4' : 'right-4'
      } border-4 border-yellow-700 outline outline-8 outline-yellow-600  flex items-center justify-center w-12 h-12 rounded-full bg-yellow-400 shadow-lg transition-transform duration-300 hover:scale-110 hover:rotate-12 hover:bg-yellow-500`}
    >
      {isLeft ? <Image src="/logo/arrow-left.png" alt="Arrow left" width={24} height={24} /> : <Image src="/logo/arrow-right.png" alt="Arrow right" width={24} height={24} />}
    </button>
  );
};
