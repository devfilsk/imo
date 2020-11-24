export default interface Propertie {
  id: number;
  title: string;
  description: string;
  sale_price: number;
  latitude: number;
  longitude: number;
  images: Array<{
    id: number;
    url: string;
  }>;
}
