export default class Payment {
  status: PaymentStatus;
  qrCode?: string;
  constructor() {
    this.status = PaymentStatus.AWAITING_PAYMENT;
  }

  changeStatus(status: PaymentStatus) {
    this.status = status;
  }

  setQRCode(qrCode: string) {
    this.qrCode = qrCode;
  }
}

export enum PaymentStatus {
  "AWAITING_PAYMENT" = "awaiting_payment",
  "PAID" = "paid",
  "REFUSED" = "refused",
}
