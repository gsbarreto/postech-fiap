import IPaymentRepository from "../../core/repository/paymentRepository";
import Order from "../../core/entity/order";
import { GenerateQRCodeOutput } from "../../core/repository/paymentRepository"; // Import the missing type

export default class MercadoPago implements IPaymentRepository {
  constructor() {}

  generateQRCode(order: Order): Promise<GenerateQRCodeOutput> {
    return Promise.resolve({
      qr_data:
        "00020101021243650016COM.MERCADOLIBRE02013063638f1192a-5fd1-4180-a180-8bcae3556bc35204000053039865802BR5925IZABEL AAAA DE MELO6007BARUERI62070503***63040B6D",
      in_store_order_id: order.id || "",
    });
  }
}
