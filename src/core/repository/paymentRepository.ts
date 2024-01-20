import Order from "../entity/order";

export default interface IPaymentRepository {
  generateQRCode(order: Order): Promise<GenerateQRCodeOutput>;
}

export type GenerateQRCodeOutput = {
  qr_data: string;
  in_store_order_id: string;
};
