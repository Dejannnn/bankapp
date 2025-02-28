export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import Image from "next/image";
//Components
import MobileNavbar from "../../components/MobileNavbar";
import Sidebar from "../../components/Sidebar";
//Actions
import { getLoggedInUser } from "@/lib/actions/user.actions";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = await getLoggedInUser();
  if (!loggedIn) {
    redirect("/sign-in");
  }
  return (
    <main className="flex h-screen  w-full font-inter">
      <Sidebar user={loggedIn} />
      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image src="icons/logo.svg" width={30} height={30} alt="logo" />
          <div>
            <MobileNavbar user={loggedIn} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
