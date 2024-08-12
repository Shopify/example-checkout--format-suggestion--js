// [START format-suggestion.update]
import { extension } from "@shopify/ui-extensions/checkout";

export default extension(
  "purchase.address-autocomplete.suggest",
  async ({ signal, target }) => {
    const { field, value, selectedCountryCode } = target;

    const response = await fetchSuggestions(
      field,
      value,
      selectedCountryCode,
      signal
    );
    const { result } = await response.json();

    const suggestions = result.suggestions.map((suggestion) => {
      return {
        id: suggestion.global_address_key,
        label: suggestion.text,
        matchedSubstrings: suggestion.matched,
      };
    });

  return {suggestions}
  }
);

/**
 * In this example, suggestions are fetched from a static file. In your implementation,
 * use the address field and its current query value to fetch meaningful address suggestions.
 */
async function fetchSuggestions(_field, _value, _selectedCountryCode, signal) {
  return fetch(
    `https://shopify.github.io/address-autocomplete/unformatted-address-autocomplete.json`,
    {
      // Pass `signal` to each fetch request
      signal,
    }
  );
}
// [END format-suggestion.update]
