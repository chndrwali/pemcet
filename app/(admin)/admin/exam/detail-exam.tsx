import { ExamWithQuestion } from './table-exam';

interface DetailExamProps {
  exam: ExamWithQuestion;
}

export const DetailExam = ({ exam }: DetailExamProps) => {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg border border-gray-200">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Level: {exam.level}</h2>
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {exam.questions.map((question, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-100">
            {/* Question Header */}
            <h3 className="text-sm font-medium text-gray-800 mb-2">
              {index + 1}. {question.questionText}
            </h3>

            {/* Options */}
            <ul className="space-y-1">
              <li className={`px-2 py-1 rounded-md ${question.correctAnswer === 'A' ? 'bg-green-100 text-green-800 font-semibold' : 'text-gray-700'}`}>A. {question.optionA}</li>
              <li className={`px-2 py-1 rounded-md ${question.correctAnswer === 'B' ? 'bg-green-100 text-green-800 font-semibold' : 'text-gray-700'}`}>B. {question.optionB}</li>
              <li className={`px-2 py-1 rounded-md ${question.correctAnswer === 'C' ? 'bg-green-100 text-green-800 font-semibold' : 'text-gray-700'}`}>C. {question.optionC}</li>
              <li className={`px-2 py-1 rounded-md ${question.correctAnswer === 'D' ? 'bg-green-100 text-green-800 font-semibold' : 'text-gray-700'}`}>D. {question.optionD}</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
