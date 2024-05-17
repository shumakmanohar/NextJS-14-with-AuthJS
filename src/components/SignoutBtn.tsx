import { signOut } from "@/auth";

const SignoutBtn = () => {
	return (
		<form
			action={async () => {
				"use server";
				await signOut();
			}}
		>
			<button type="submit">Sign Out</button>
		</form>
	);
};

export default SignoutBtn;
