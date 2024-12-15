import { getExam } from '@/actions/getExam';
import { TableExam } from './table-exam';

const ExamManagementPage = async () => {
  const exam = await getExam();

  return (
    <section>
      <TableExam exam={exam} />
    </section>
  );
};

export default ExamManagementPage;
