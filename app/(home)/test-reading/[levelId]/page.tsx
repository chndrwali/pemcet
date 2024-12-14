import { getTestReadingById } from '@/actions/getTestReadingById';
import { LevelReading } from '@prisma/client';

interface LevelPageProps {
  params: { levelId: LevelReading };
}

const LevelPage = async ({ params }: LevelPageProps) => {
  const reading = await getTestReadingById(params.levelId);
  return <></>;
};

export default LevelPage;
