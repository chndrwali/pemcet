import { getTestReading } from '@/actions/getTestReading';
import { TableTestReading } from './table-test-reading';

const TestReadingAdmin = async () => {
  const testReading = await getTestReading();
  return (
    <section>
      <TableTestReading testReading={testReading} />
    </section>
  );
};

export default TestReadingAdmin;
