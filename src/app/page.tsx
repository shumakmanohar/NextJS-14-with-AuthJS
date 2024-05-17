import { auth } from "@/auth";
import SignoutBtn from "@/components/SignoutBtn";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
	const session = await auth();
	if (!session?.user)
		return (
			<>
				<h1 className="text-4xl font-bold">You are not Signed In </h1>
				<p>
					This is a Very simple application, to demonstrate the working of
					NextAuth V5 , with Credentials Provider,
				</p>
				<Link href={"/api/auth/signin"}>SignIn </Link>
				<Link href={"/register"}>Register </Link>
			</>
		);
	return (
		<main>
			<h1 className="text-4xl font-bold">Hi , Sup</h1>
			<b>Logged In User Details : {JSON.stringify(session.user)}</b>
			<SignoutBtn />
		</main>
	);
}
