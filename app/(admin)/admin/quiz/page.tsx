import { getQuiz } from '@/actions/getQuiz';
import { TableQuiz } from './table-quiz';

const Page = async () => {
  const quiz = await getQuiz();
  return (
    <section>
      <TableQuiz quiz={quiz} />
    </section>
  );
};

export default Page;
