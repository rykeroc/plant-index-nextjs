import PerenualApiProxy from "../src/app/_data/perenual-api-proxy";

// NOTE: Perenual API Proxy server must be running locally for these to succeed
describe("Perenual API Proxy", () => {
	describe("Get Species List", () => {
		test("Success - No Params", async () => {
			const res = await PerenualApiProxy.getSpeciesList()
			expect(res).toBeTruthy()
			expect(res.data.length).toBeGreaterThan(0)
		})

		test("Success - Invalid sunlight", async () => {
			const res = await PerenualApiProxy.getSpeciesList({
				sunlight: "lots"
			})
			expect(res).toBeTruthy()
			expect(res.data.length).toBe(0)
		})
	})
})