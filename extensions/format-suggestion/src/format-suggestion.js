import {extension} from '@shopify/ui-extensions/checkout';

export default  extension(
  'purchase.address-autocomplete.format-suggestion',
  async ({target}) => {
    // 1. Use the suggestion the buyer selected

    const {selectedSuggestion} = target;

    // 2. Fetch the address parts to format the address

    const response = await fetchSuggestions();

    const {result} = await response.json();

    const formattedAddress = result.suggestions.find(({global_address_key}) => global_address_key === selectedSuggestion.id)

    // 3. Return a formatted address

    return formattedAddress;
  },
);

async function fetchSuggestions() {
    return fetch(`https://shopify.github.io/address-autocomplete/format-suggestion.json`)
}
