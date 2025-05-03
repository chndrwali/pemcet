export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="relative flex flex-col min-h-screen">{children}</main>;
}
