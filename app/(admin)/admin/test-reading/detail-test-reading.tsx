import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TestReading } from '@prisma/client';

interface DetailProps {
  testReading: TestReading;
}

export const DetailTestReading = ({ testReading }: DetailProps) => {
  return (
    <Card className="border border-gray-200 shadow-lg rounded-lg">
      <CardHeader className="pb-4 border-b border-gray-100">
        <CardTitle className="text-2xl font-bold text-gray-800">{testReading.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Level</span>
            <span className="text-lg font-medium text-gray-800">{testReading.level}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Waktu</span>
            <span className="text-lg font-medium text-gray-800">
              {Math.floor(testReading.time / 60)} Menit {testReading.time % 60} Detik{' '}
            </span>
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Cerita</h2>
            <p className="text-gray-600 leading-relaxed">{testReading.story}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
