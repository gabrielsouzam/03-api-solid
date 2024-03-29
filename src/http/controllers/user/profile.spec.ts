import { afterAll, beforeAll, it, describe, expect } from "vitest";
import { app } from "../../../app";
import request from "supertest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";



describe("Profile (e2e", () => {
	beforeAll(async () => {
		await app.ready();
	});
	
	afterAll(async () => {
		await app.close();
	});

	it("shoud be able to get user profile",async () => {

		const {token} = await createAndAuthenticateUser(app);

		const profileResponse = await request(app.server)
			.get("/me")
			.set("Authorization", `Bearer ${token}`)
			.send();

		expect(profileResponse.statusCode).toEqual(200);
		expect(profileResponse.body.user).toEqual(
			expect.objectContaining({
				email: "fulano@gmail.com"
			})
		);
	});
});

