<template>
	<div>
		<b-card>
			<b-card-title>Profile You May Like</b-card-title>
			<b-card-text>
				<b-list-group>
				<b-list-group-item>test</b-list-group-item>
				<b-list-group-item>test</b-list-group-item>
				<b-list-group-item>test</b-list-group-item>
				<b-list-group-item>test</b-list-group-item>
				<b-list-group-item>test</b-list-group-item>
				<b-list-group-item>test</b-list-group-item>
				<b-list-group-item>test</b-list-group-item>
				<b-list-group-item>test</b-list-group-item>
				<b-list-group-item>test</b-list-group-item>
				<b-list-group-item>test</b-list-group-item>
				<b-list-group-item>test</b-list-group-item>
				</b-list-group>
			</b-card-text>
		</b-card>
	</div>
</template>
<script>
	export default {
		name:"ProfileSuggestions",
		data() {
			return {
				projects:[]
			}
		},
		mounted() {
			//fetch from backend :)
			this.projects=[{
				test:'test'
			}]
		},
	}

</script>
