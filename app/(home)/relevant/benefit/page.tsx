import { Caveat_Brush } from 'next/font/google';
import { Metadata } from 'next';
import { CardBenefit } from './card-benefit';

const caveat = Caveat_Brush({ subsets: ['latin'], weight: ['400'] });

export const metadata: Metadata = {
  title: 'Manfaat',
};

const RelevantPage = () => {
  return (
    <section className={`${caveat.className} relative flex flex-col z-20`}>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl  sm:text-9xl text-white">WEPCET</h1>
        <div className="rounded-xl bg-orange-500 p-4 w-full max-w-xs">
          <div className="bg-white rounded-xl px-4 py-1 uppercase">
            <table>
              <tbody>
                <tr>
                  <td>Mata Pelajaran</td>
                  <td>: Bahasa Indonesia</td>
                </tr>
                <tr>
                  <td>Kelas</td>
                  <td>: V (Lima)</td>
                </tr>
                <tr>
                  <td>Fase</td>
                  <td>: C</td>
                </tr>
                <tr>
                  <td>Elemen</td>
                  <td>: Membaca</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <CardBenefit />
    </section>
  );
};

export default RelevantPage;
