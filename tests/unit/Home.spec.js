import { shallowMount, createLocalVue } from "@vue/test-utils"
import Vue from "vue"
import Vuex from "vuex"
import Vuetify from "vuetify"
import Home from "@views/Home"
import Settings from "@components/Settings"
import Ship from "@components/Ship"
import MapGrid from "@components/MapGrid"
import shipStore from "@store/index"

// import router from "@/router"
Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Vuetify)

let wrapper
let state
let store
let vuetify
let defaultShip

afterEach(() => {
	wrapper.destroy()
})

describe("testing Home Template", () => {
	beforeEach(() => initialization())

	it("should render the page and match the snapshot", () => {
		// tests that the wrapper was loadded properly
		expect(wrapper.exists()).toBe(true)
		expect(wrapper).toMatchSnapshot()
	})

	it("should render one main div component with the proper class", () => {
		expect(wrapper.find("div[name=\"mainHomeComponent\"]").exists()).toBe(true)
		expect(wrapper.find("div[name=\"mainHomeComponent\"]").classes()).toContain("main-home-component")
	})

	it("should render 2 container div components with the proper classes", () => {
		expect(wrapper.find("div[name=\"worldSettingsComponentContainer\"]").exists()).toBe(true)
		expect(wrapper.find("div[name=\"worldSettingsComponentContainer\"]").classes()).toContain("components")
		expect(wrapper.find("div[name=\"mapGridComponentContainer\"]").exists()).toBe(true)
		expect(wrapper.find("div[name=\"mapGridComponentContainer\"]").classes()).toContain("components")
	})

	it("should render one Settings component", () => 
		expect(wrapper.findComponent(Settings).exists()).toBe(true))

	it("should render one Ship component", () => 
		expect(wrapper.findComponent(Ship).exists()).toBe(true))

	it("should render one MapGrid component with the right props", () => {
		expect(wrapper.findAllComponents(MapGrid).length).toBe(1)
		const mapGridComponent = wrapper.findAllComponents(MapGrid).at(0)
		expect(mapGridComponent.props().rows).toBe(0)
		expect(mapGridComponent.props().columns).toBe(0)
	})
})

describe("testing Home Computed properties", () => {
	beforeEach(() => initialization())

	describe("testing currentShip computed", () => {
		it("should return the default empty ship, when initialized", () =>
			expect(wrapper.vm.currentShip).toEqual(defaultShip))

		it("should return a real ship, when there is one on the state", () => {
			// setting the store to test
			const movedShip = {
				x: 10,
				y: 20,
				orientation: "W",
				status: "OK"
			}
			shipStore.mutations.SET_MOVED_SHIP(state, movedShip)

			// asserting that the getter returns the proper ship
			expect(wrapper.vm.currentShip).toEqual(movedShip)
		})
	})
})

describe("testing Home Methods", () => {
	beforeEach(() => initialization())

	describe("testing loadGrid method", () => {
		it("should NOT change the limits or the showMapGrid property, if the limits are undefined", async() => {
			// setting default values to test that after the method, they are still the same
			wrapper.vm.limitX = 10
			wrapper.vm.limitY = 12
			wrapper.vm.showMapGrid = false

			// trigger the method and wait
			wrapper.vm.loadGrid()
			await wrapper.vm.$nextTick()

			// assert
			expect(wrapper.vm.limitX).toBe(10)
			expect(wrapper.vm.limitY).toBe(12)
			expect(wrapper.vm.showMapGrid).toBe(false)
		})

		it("should NOT change the limits or the showMapGrid property, if the X limit is not correct", async() => {
			// setting default values to test that after the method, they are still the same
			wrapper.vm.limitX = 10
			wrapper.vm.limitY = 12
			wrapper.vm.showMapGrid = false

			// trigger the method and wait
			wrapper.vm.loadGrid({ limitX: -1, limitY: 10 })
			await wrapper.vm.$nextTick()

			// assert
			expect(wrapper.vm.limitX).toBe(10)
			expect(wrapper.vm.limitY).toBe(12)
			expect(wrapper.vm.showMapGrid).toBe(false)
		})

		it("should NOT change the limits or the showMapGrid property, if the Y limit is not correct", async() => {
			// setting default values to test that after the method, they are still the same
			wrapper.vm.limitX = 10
			wrapper.vm.limitY = 12
			wrapper.vm.showMapGrid = false

			// trigger the method and wait
			wrapper.vm.loadGrid({ limitX: 10, limitY: 0 })
			await wrapper.vm.$nextTick()

			// assert
			expect(wrapper.vm.limitX).toBe(10)
			expect(wrapper.vm.limitY).toBe(12)
			expect(wrapper.vm.showMapGrid).toBe(false)
		})

		it("should set the new limits, set the showMapGrid property to true and update the mapGridKey, if the limits are correct", async() => {
			// setting default values to test that after the method, they are still the same
			wrapper.vm.limitX = 10
			wrapper.vm.limitY = 12
			wrapper.vm.showMapGrid = false
			wrapper.vm.gridComponentKey = 1

			// trigger the method and wait
			wrapper.vm.loadGrid({ limitX: 40, limitY: 16 })
			await wrapper.vm.$nextTick()

			// assert
			expect(wrapper.vm.limitX).toBe(40)
			expect(wrapper.vm.limitY).toBe(16)
			expect(wrapper.vm.showMapGrid).toBe(true)
			expect(wrapper.vm.gridComponentKey).toBe(2)
		})
	})

	describe("testing resetWorld method", () => {
		it("should set the new limits to zero, set the showMapGrid property to false and update the mapGridKey", async() => {
			// setting default values to test that after the method, they are still the same
			wrapper.vm.limitX = 10
			wrapper.vm.limitY = 12
			wrapper.vm.showMapGrid = false

			// trigger the method and wait
			wrapper.vm.resetWorld()
			await wrapper.vm.$nextTick()

			// assert the reset
			expect(wrapper.vm.limitX).toBe(0)
			expect(wrapper.vm.limitY).toBe(0)
			expect(wrapper.vm.showMapGrid).toBe(false)
		})
	})

	describe("testing updateGrid method", () => {
		it("should set the new limits to zero, set the showMapGrid property to false and update the mapGridKey", async() => {
			wrapper.vm.gridComponentKey = 19

			// trigger the method and wait
			wrapper.vm.updateGrid()
			await wrapper.vm.$nextTick()

			expect(wrapper.vm.gridComponentKey).toBe(20)
		})
	})
})

/**
 * [initialization is a function that defines all the boiler plate code to create the Home
 * component with mocked data to be tested.
 * This function also creates the state used on the instance. ]
 */
async function initialization(newWorld, limitX=0, limitY=0) {
	vuetify = new Vuetify()

	defaultShip = {
		x: -1,
		y: -1,
		orientation: "",
		status: "",
	}

	state = { 
		limitX,
		limitY,
		world: (newWorld)? newWorld : [],
		currentShip: { ...defaultShip },
		warnings: []
	}

	store = new Vuex.Store({
		state,
		getters   : shipStore.getters,
		actions   : shipStore.actions,
		mutations : shipStore.mutations
	})

	// mount the wrapper
	wrapper = shallowMount(Home, {
		localVue,
		store,
		vuetify,
	})
	await wrapper.vm.$nextTick()
}