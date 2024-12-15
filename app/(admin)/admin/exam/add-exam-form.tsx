'use client';

import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { examSchema } from '@/schemas';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import axios from 'axios';
import { ExamWithQuestion } from './table-exam';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface ExamProps {
  exam?: ExamWithQuestion;
}

export function MultiQuestionExamForm({ exam }: ExamProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof examSchema>>({
    resolver: zodResolver(examSchema),
    defaultValues: {
      level: exam?.level || undefined,
      questions: exam?.questions?.map((q) => ({
        questionText: q.questionText || '',
        optionA: q.optionA || '',
        optionB: q.optionB || '',
        optionC: q.optionC || '',
        optionD: q.optionD || '',
        correctAnswer: q.correctAnswer || undefined,
      })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'questions',
  });

  async function onSubmit(values: z.infer<typeof examSchema>) {
    setIsSubmitting(true);
    const apiUrl = exam ? `/api/admin/exam/patch` : '/api/admin/exam';
    const apiMethod = exam ? axios.patch : axios.post;

    apiMethod(apiUrl, values)
      .then(() => {
        toast.success(exam ? 'Soal berhasil di update' : 'Soal berhasil di tambahkan');
        setIsSubmitting(false);
        router.push('/admin/exam');
      })
      .catch((err) => {
        console.error('Error', err);
        toast.error(exam ? 'Gagal mengupdate soal' : 'Gagal menambahkan soal');
        setIsSubmitting(false);
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <div>
              <FormItem>
                <FormLabel>Level</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                  defaultValue={field.value}
                  disabled={isSubmitting}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Kategori</SelectLabel>

                      <SelectItem value="Pemula">Pemula</SelectItem>
                      <SelectItem value="Menengah">Menengah</SelectItem>
                      <SelectItem value="Lanjutan">Lanjutan</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
              <FormMessage />
            </div>
          )}
        />

        {fields.map((field, index) => (
          <Card key={field.id}>
            <CardHeader>
              <CardTitle>Question {index + 1}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name={`questions.${index}.questionText`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Question Text</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter the question text here" {...field} />
                      </FormControl>
                      <FormDescription>This is the main question that will be presented to the student.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {['A', 'B', 'C', 'D'].map((option) => (
                  <FormField
                    key={option}
                    control={form.control}
                    name={`questions.${index}.option${option}` as `questions.${number}.optionA` | `questions.${number}.optionB` | `questions.${number}.optionC` | `questions.${number}.optionD`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Option {option}</FormLabel>
                        <FormControl>
                          <Input placeholder={`Enter option ${option} here`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}

                <FormField
                  control={form.control}
                  name={`questions.${index}.correctAnswer`}
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Correct Answer</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                          {['A', 'B', 'C', 'D'].map((value) => (
                            <FormItem className="flex items-center space-x-3 space-y-0" key={value}>
                              <FormControl>
                                <RadioGroupItem value={value} />
                              </FormControl>
                              <FormLabel className="font-normal">Option {value.toUpperCase()}</FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {index > 0 && (
                  <Button type="button" variant="destructive" onClick={() => remove(index)}>
                    Remove Question
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {fields.length < 5 && (
          <Button type="button" variant="outline" onClick={() => append({ questionText: '', optionA: '', optionB: '', optionC: '', optionD: '', correctAnswer: undefined })}>
            Add Question
          </Button>
        )}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Exam'}
        </Button>
      </form>
    </Form>
  );
}
