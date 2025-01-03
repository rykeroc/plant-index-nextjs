import getSpeciesList from "../../src/data/actions/getSpeciesList"
import {SpeciesListItem, SpeciesListResponse} from "@/data/models/SpeciesListResponse";

describe("Get Species List", () => {
	test("Success - No Params", async () => {
		const res = await getSpeciesList()
		expect(res).toBeTruthy()
		expect(res.success?.data).toBeTruthy()
		expect(res.success?.data?.length).toBeGreaterThan(0)
		expect(res.error).toBeFalsy()
	})

	test("Success - Page 2", async () => {
		const res = await getSpeciesList({page: 2})
		expect(res).toBeTruthy()
		expect(res.success?.data).toBeTruthy()
		expect(res.success?.data?.length).toBeGreaterThan(0)
		expect(res.error).toBeFalsy()
	})

	test("Success - Pothos query", async () => {
		const res = await getSpeciesList({
			q: "Pothos"
		})
		expect(res).toBeTruthy()
		expect(res.success?.data).toBeTruthy()
		expect(res.success?.data?.length).toBeGreaterThan(0)
		expect(res.error).toBeFalsy()
	})

	test("Success - All cycle options", async () => {
		let res: {
			data?: SpeciesListResponse,
			error?: string
		}
		for (let option of ["perennial", 'annual', 'biennial', 'biannual']){
			res = await getSpeciesList({
				cycle: option
			})
			expect(res).toBeTruthy()
			expect(res.data).toBeTruthy()
			expect(res.error).toBeFalsy()
		}
	})

	test("Success - All watering options", async () => {
		let res: {
			success?: SpeciesListResponse,
			error?: string
		}
		for (let option of ['Minimum', 'Average', 'Frequent']){
			res = await getSpeciesList({
				watering: option
			})
			expect(res).toBeTruthy()
			expect(res.success).toBeTruthy()
			expect(res.error).toBeFalsy()
		}
	})

	test("Success - All sunlight options", async () => {
		let res: {
			data?: SpeciesListResponse,
			error?: string
		}
		for (let option of ['full_shade', 'part_shade', 'full_sun']){
			res = await getSpeciesList({
				sunlight: option
			})
			expect(res).toBeTruthy()
			expect(res.data).toBeTruthy()
		}
	})

	test("Success - Random query", async () => {
		const res = await getSpeciesList({
			q: "Some plant name"
		})
		expect(res).toBeTruthy()
		expect(res.success?.data).toBeTruthy()
		expect(res.success?.data?.length).toBe(0)
		expect(res.error).toBeFalsy()
	})

	test("Failure - Invalid API key", async () => {
		const res = await getSpeciesList({
			key: 'somerandomkey'
		})
		expect(res).toBeTruthy()
		expect(res.success?.data).toBeFalsy()
		expect(res.error).toBeTruthy()
	})
})
