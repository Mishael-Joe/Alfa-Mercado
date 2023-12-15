import { type SchemaTypeDefinition } from 'sanity'
import { banner } from "./schemas/banner-schemas";
import { product } from "./schemas/products-schemas";
import { phone_accessories } from "./schemas/phone-accessories-schemas"
import { school_supplies } from './schemas/school-supplies-schemas';
import { body_care_product } from './schemas/body-care-product-shemas';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [ product, banner, phone_accessories, school_supplies, body_care_product ],
}
