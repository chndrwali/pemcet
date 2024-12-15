'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ExamWithQuestion } from '@/app/(admin)/admin/exam/table-exam';
import { Question } from '@prisma/client';
import { useConfirm } from '@/hooks/use-confirm';
import axios from 'axios';
import { toast } from 'sonner';
import { ButtonNextPrevious } from '@/components/button-next-previous';
import { useRouter } from 'next/navigation';
import { ExamResult } from './exam-result';

interface ExamProps {
  exam: ExamWithQuestion;
}

export function ExamComponent({ exam }: ExamProps) {
  const router = useRouter();
  const [ConfirmDialog, confirm] = useConfirm('Apakah kamu yakin telah menyelesaikan soal?', 'Soal akan di-submit');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [error, setError] = useState('');
  const [finalScore, setFinalScore] = useState<number | null>(null);

  const currentQuestion = exam.questions[currentQuestionIndex];
  const totalQuestions = exam.questions.length;

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
    setError(''); // Clear error message
  };

  const goToNextQuestion = () => {
    if (!answers[currentQuestion.id]) {
      setError('Please select an answer before proceeding.');
      return;
    }
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const goToPreviousQuestion = () => {
    setError(''); // Clear error message
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!answers[currentQuestion.id]) {
      setError('Please select an answer for the last question.');
      return;
    }
    const ok = await confirm();
    if (ok) {
      try {
        const response = await axios.post('/api/admin/exam/answer', {
          answers,
          examId: exam.level,
        });

        setFinalScore(response.data.score);
        toast.success(`Berhasil submit! Nilai Anda: ${response.data.score}`);
      } catch (error) {
        console.error('Submit error:', error);
        toast.error('Gagal submit, coba lagi.');
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ConfirmDialog />
      <h1 className="text-2xl font-bold mb-4">{exam.level}</h1>
      {finalScore !== null ? (
        <div className="relative">
          <ExamResult score={finalScore} totalQuestions={totalQuestions} />
          <ButtonNextPrevious
            isLeft={false}
            onClick={() => {
              let nextPath = '';
              switch (exam.level) {
                case 'Pemula':
                  nextPath = '/test-understanding/Menengah';
                  break;
                case 'Menengah':
                  nextPath = '/test-understanding/Lanjutan';
                  break;
                case 'Lanjutan':
                  nextPath = '/test-understanding/Pemula';
                  break;
                default:
                  nextPath = '/'; // fallback ke halaman utama jika level tidak diketahui
              }
              router.push(nextPath);
            }}
          />
        </div>
      ) : (
        <>
          <Progress value={((currentQuestionIndex + 1) / totalQuestions) * 100} className="mb-4" />
          <Card>
            <CardHeader>
              <CardTitle>
                Pertanyaan {currentQuestionIndex + 1} dari {totalQuestions}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg mb-4">{currentQuestion.questionText}</p>
              {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
              <RadioGroup onValueChange={(value) => handleAnswer(currentQuestion.id, value)} value={answers[currentQuestion.id] || ''}>
                {['A', 'B', 'C', 'D'].map((option) => (
                  <div key={option} className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value={option} id={`option${option}`} />
                    <Label htmlFor={`option${option}`}> {currentQuestion[`option${option}` as keyof Question]?.toString() || ''}</Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button onClick={goToPreviousQuestion} disabled={currentQuestionIndex === 0} variant="outline">
                <ChevronLeft className="mr-2 h-4 w-4" /> Sebelumnya
              </Button>
              {currentQuestionIndex === totalQuestions - 1 ? (
                <Button onClick={handleSubmit}>Submit</Button>
              ) : (
                <Button onClick={goToNextQuestion}>
                  Selanjutnya <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </CardFooter>
          </Card>
        </>
      )}
    </div>
  );
}
