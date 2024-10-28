import getSpeciesDetails from "@/data/actions/getSpeciesDetails";

describe("Get Species List", () => {
	test("Success - Valid Species ID", async () => {
		const details = await getSpeciesDetails({
			speciesId: 1
		})
		expect(details).toBeTruthy()
		expect(details.success).toBeTruthy()
		expect(details.error).toBeFalsy()
		expect(details.success?.common_name).toBeTruthy()
		expect(details.success?.scientific_name.length).toBeGreaterThan(0)
		expect(details.success?.other_name.length).toBeGreaterThan(0)
		expect(details.success?.origin.length).toBeGreaterThan(0)
		expect(details.success?.pruning_month.length).toBeGreaterThan(0)
		expect(details.success?.propagation.length).toBeGreaterThan(0)
		expect(details.success?.description).toBeTruthy()
		expect(details.success?.watering).toBeTruthy()
		expect(details.success?.cycle).toBeTruthy()
		expect(details.success?.sunlight.length).toBeGreaterThan(0)
		expect(details.success?.default_image).toBeTruthy()
		expect(details.success?.default_image?.original_url).toBeTruthy()
	})

	test("Failure - Invalid Species ID", async () => {
		const details = await getSpeciesDetails({
			speciesId: -1
		})
		expect(details).toBeTruthy()
		expect(details.success).toBeFalsy()
		expect(details.error).toBeTruthy()
		expect(details.error?.message).toBeTruthy()
	})

	test("Failure - Invalid API key", async () => {
		const details = await getSpeciesDetails({
			speciesId: 1,
			key: 'somerandomkey'
		})
		expect(details).toBeTruthy()
		expect(details.success).toBeFalsy()
		expect(details.error).toBeTruthy()
		expect(details.error?.message).toBeTruthy()
	})
})
