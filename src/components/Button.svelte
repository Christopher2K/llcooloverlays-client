<script lang="ts">
  export let label: string;
  export let type: 'button' | 'submit';
</script>

<button
  class="bg-blue-400 text-white font-bold px-5 py-3 rounded-lg text-lg hover:bg-blue-500"
  {type}
  on:click>{label}</button
>
