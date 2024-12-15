import { Metadata } from 'next';
import { ExamComponent } from './exam-component';
import { getExamById } from '@/actions/getExamById';

export const metadata: Metadata = {
  title: 'Uji Pemahaman',
};

interface LevelPageProps {
  params: Promise<{ levelId: string }>;
}

const LevelUnderstandingPage = async ({ params }: LevelPageProps) => {
  const { levelId } = await params;
  const exam = await getExamById(levelId);

  if (!exam) return null;
  return <ExamComponent exam={exam} />;
};

export default LevelUnderstandingPage;
