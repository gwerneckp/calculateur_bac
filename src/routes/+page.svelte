<script lang="ts">
	let moyenne = 0;
	let notes_saisies = 3;
	let mention = 'Aucune';
</script>

<div class="text-center p-3">
	<h1 class="text-2xl font-bold">Calculatrice de Bac</h1>
	<p class="text-lg font-medium">
		Calculez votre moyenne et mention au bac en fonction de vos notes et coefficients.
	</p>
</div>

<div class="p-3">
	<div class="flex gap-3">
		<div class="bg-base-200 w-full h-20 text-center flex-col flex justify-center">
			<h1 class="text-2xl font-bold">{notes_saisies}</h1>
			<p>Notes saisies</p>
		</div>
        <div class="bg-base-200 w-full h-20 text-center flex-col flex justify-center">
			<h1 class="text-2xl font-bold">{moyenne}/20</h1>
			<p>Moyenne</p>
		</div>	</div>
	<div class="p-1.5" />
	<div class="bg-base-200 w-full h-20 text-center flex-col flex justify-center">
		<h1 class="text-2xl font-bold">{mention}</h1>
		<p>Mention</p>
	</div>
</div>
