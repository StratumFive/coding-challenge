<template>
	<v-form
		ref="form"
		v-model="valid"
		lazy-validation
		class="settings-container"
	>
		<h2 class="mt-2"> World Settings </h2>
		<v-alert
			:value="showAlert"
			border="top"
			class="mt-3"
			colored-border
			:type="alertType"
			elevation="2"
			transition="scale-transition"
			dismissible
			@click="closeAlert"
			>	{{ alertMessage }}
		</v-alert>
		<v-row>
			<v-col
				cols="12"
				md="6"
			>
				<v-text-field
					v-model="limitX"
					:counter="2"
					:rules="limitRules"
					label="Limit X"
					required
				></v-text-field>
			</v-col>
			<v-col
				cols="12"
				md="6"
			>
				<v-text-field
					v-model="limitY"
					:counter="2"
					:rules="limitRules"
					label="Limit Y"
					required
				></v-text-field>
			</v-col>
		</v-row>
		
		<v-btn
			color="error"
			class="mr-2"
			@click="reset"
        >
			<v-icon small>fa-refresh </v-icon>
		</v-btn>

		<v-btn
			color="warning"
			@click="setWorldLimits"
		>
			New World
				<v-icon right>
					fas fa-globe sm
				</v-icon>
		</v-btn>
  </v-form>
</template>

<script>
import { mapActions } from "vuex"

export default {
	name: "Settings",
	
    data: () => ({
		valid: true,
		limitX: 5,
		limitY: 3,
		limitRules: [
			v => !!v || "Limit X is required",
			v => (v && v.length <= 2) || "The limits should have at most 2 characters",
		],
		alertType: "success",
		showAlert: false,
		alertMessage: "",
    }),

    methods: {
		...mapActions({
			createWorld: "createWorld",
		}),

		reset () {
			this.$refs.form.reset()
			this.$emit("resetWorld")
			this.closeAlert()
		},

		async setWorldLimits() {
			try {
				await this.createWorld({ 
					limitX: Number(this.limitX), 
					limitY: Number(this.limitY)
				})
				this.alertMessage = "The world has been created!|"
				this.showAlert = true
				this.alertType = "success"
				this.$emit("createdWorld")
			} catch(error) {
				this.alertMessage = error
				this.showAlert = true
				this.alertType = "error"
			}
		},

		closeAlert() {
			this.alertMessage = ""
			this.showAlert = false
			this.alertType = "success"
		}
    },
  }
</script>

<style lang="scss" scoped>
	.settings-container {
		max-width: 250px;
		margin-left: 1rem;
	}
</style>