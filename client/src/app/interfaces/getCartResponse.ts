import { CartItem } from '../cart/cart.service';

export interface IGetCartResponse {
  _id: string;
  products: CartItem[];
}
