import { Card, CardContent } from '@/components/ui/card';

export function ExamResult({ score, totalQuestions }: { score: number; totalQuestions: number }) {
  return (
    <Card className={`mt-4 ${score >= 75 ? 'bg-green-100' : 'bg-red-100'} text-center`}>
      <CardContent>
        <h2 className="text-2xl font-bold mb-4">Hasil Ujian Anda</h2>
        <p className="text-lg">
          Skor kamu: {score} dari {totalQuestions} soal
        </p>
        <p className="text-md">{score >= 75 ? 'Selamat! Anda lulus ujian dengan nilai tinggi.' : 'Coba lagi! Tingkatkan pemahaman Anda untuk hasil yang lebih baik.'}</p>
      </CardContent>
    </Card>
  );
}
