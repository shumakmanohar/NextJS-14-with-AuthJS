"use server";

import { z } from "zod";
import { formSchema } from "@/types/Schema";
import { PrismaClient } from "@prisma/client";
import prisma from "@/lib/prisma";
var bcrypt = require("bcryptjs");

export const RegisterUser = async (values: z.infer<typeof formSchema>) => {
	try {
		const formValidation = formSchema.safeParse(values);

		if (!formValidation.success) {
			throw Error("Invalid Values");
		}

		const hashedPassword = await bcrypt.hash(values.password, 10);
		const prisma = new PrismaClient();

		await prisma.user.create({
			data: {
				email: values.email,
				password: hashedPassword,
			},
		});

		return {
			status: true,
			message: "User Registered",
		};
	} catch (error: any) {
		console.log(error);
		console.log(error.message);
		return {
			status: false,
			message: `Something Went Wrong ${error.message}`,
		};
	}
};

export const FindUser = async (pwd: string) => {
	//const hashedPassword = await hash(pwd, 10);
	//let user = await prisma.user.findMany();
	//console.log(user);
};
