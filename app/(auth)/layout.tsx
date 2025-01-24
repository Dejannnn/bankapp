import Image from "next/image";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex w-full h-full justify-between">
      {children}
      <div className="auth-asset">
        <Image
          src="icons/auth-image.svg"
          alt="auth-image.svg"
          height={500}
          width={500}
        />
      </div>
    </main>
  );
}
