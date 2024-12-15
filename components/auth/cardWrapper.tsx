'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  headerDescription: string;
  backButtonLabel: string;
  backButtonHref: string;
}

export const CardWrapper = ({ children, backButtonHref, backButtonLabel, headerLabel, headerDescription }: CardWrapperProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">{headerLabel}</CardTitle>
          <CardDescription className="text-center">{headerDescription}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter>
          <Button asChild variant="link" className="font-normal w-full" size="sm">
            <Link href={backButtonHref}>{backButtonLabel}</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
