<template>
	<v-app>
		<v-app-bar app color="primary" dark>
			<v-tooltip bottom>
				<template v-slot:activator="{ on, attrs }">
					<div 
						class="d-flex align-center"  
						@click="gotToMainMenu"
						v-bind="attrs" 
						v-on="on"
					>
						<h3 class="shrink">Ship Tracker</h3>
					</div>
				</template>
			</v-tooltip>
			<v-tooltip bottom>
				<template v-slot:activator="{ on, attrs }">
					<div 
						class="d-flex align-center"  
						@click="gotToAllInstructionsMenu"
						v-bind="attrs" 
						v-on="on"
					>
						<h3 class="shrink pl-5 pr-5">|</h3>
						<h3 class="shrink">All Instructions</h3>
					</div>
				</template>
			</v-tooltip>
			<v-spacer></v-spacer>
			<v-btn
				class="pr-0"
				@click="goToAbout" 
				text
			>
				<span>About</span>
			</v-btn>

			<v-btn
				class="text-small-devices"
				href="https://github.com/diasor/coding-challenge/tree/master" 
				target="_blank" 
				text
			>
				<span class="shrink hidden-sm-and-down mr-2">Latest Release</span>
				<v-icon class="release-icon">mdi-open-in-new</v-icon>
			</v-btn>
		</v-app-bar>
		
		<v-main class="d-flex flex-wrap main-container">
			<router-view></router-view>
		</v-main>
	</v-app>
</template>

<script>
export default {
	name: 'App',
	
	methods: {
		gotToMainMenu() {
			this.$router.push({ path: '/' })
		},
		
		gotToAllInstructionsMenu(){
			this.$router.push({ path: '/all-instructions' })
		},
		
		goToAbout() {
			this.$router.push({ path: '/about' });
		}
	}
};
</script>

<style lang="scss">
	.main-container {
		width: 100% ;
		margin: 0;
		padding: 0;
	}
	
	.text-small-devices {
		display: none !important;
		width: 0 !important;

		@media screen and (min-width: 450px) {
			display: flex !important;
			width: auto !important;
		}
	}

	.release-icon {
		padding-left: 5px;
	}

	.v-item-group {
		padding-left: 0 !important;
		justify-content: flex-start !important;
	}

	.container {
		width: 100% !important;
	}
</style>