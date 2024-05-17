import { z } from "zod";

export const formSchema = z
	.object({
		email: z.string().email(),
		password: z.string().min(8).max(16),
		rePassword: z.string().min(8).max(16),
	})
	.superRefine(({ password, rePassword }, ctx) => {
		if (password !== rePassword) {
			ctx.addIssue({
				code: "custom",
				message: "Password Do not Match",
				path: ["rePassword"],
			});
		}
	});
