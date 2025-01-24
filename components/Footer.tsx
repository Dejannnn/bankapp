import { logoutAccount } from "@/lib/actions/user.actions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Footer = ({ user, type }: FooterProps) => {
  const router = useRouter();
  const handleLogout = async () => {
    const logout = await logoutAccount();
    console.log(">>>>>", logout);
    if (logout) router.push("/sign-in");
  };
  return (
    <footer className="footer">
      <div className={type === "mobile" ? "footer_name_mobile" : "footer_name"}>
        <p className="text-xl font-bold text-gray-700">
          {user?.name?.[0] || "T"}
        </p>
      </div>
      <div
        className={type === "mobile" ? "footer_email_mobile" : "footer_email"}
      >
        <h1 className="truncate text-gray-700 text-14 font-semibold">
          {user?.name || "Guest Guest"}
        </h1>
        <p className="truncate text-gray-600 text-normal text-14">
          {user?.email || ""}
        </p>
      </div>
      <div className="footer_image" onClick={handleLogout}>
        <Image
          src="/icons/logout.svg"
          alt={"logout.svg"}
          width={24}
          height={24}
        />
      </div>
    </footer>
  );
};

export default Footer;
