'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
}

export const CardWrapper = ({ children, backButtonHref, backButtonLabel, headerLabel }: CardWrapperProps) => {
  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <CardTitle className="text-center">{headerLabel}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <Button asChild variant="link" className="font-normal w-full" size="sm">
          <Link href={backButtonHref}>{backButtonLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
