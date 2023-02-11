<script lang="ts">
  export let label: string;
  export let name: string = '';
  let className: string = '';

  export { className as class };
</script>

<label class="inline-block text-l font-medium mb-3 {className}" for={name}>{label}</label>
