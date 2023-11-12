import { type SchemaTypeDefinition } from 'sanity'
import { banner } from "./schemas/banner-schemas";
import { product } from "./schemas/products-schemas";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [ product, banner ],
}
