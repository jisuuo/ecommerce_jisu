export class CreateProductDto {
  name: string;
  desc: string;
  price?: number;
  onSales?: boolean;
}
