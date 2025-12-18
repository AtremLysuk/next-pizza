import crypto from "crypto";


interface WayForPayItemType {
  name: string;
  price: number;
  quantity: number;
}

interface CreateWayForPayPaymentParams {
  orderId: number;
  amount: number;
  email: string;
  items: WayForPayItemType[];
}


async function createWayForPayPayment({
                                        orderId,
                                        amount,
                                        email,
                                        items,
                                      }: CreateWayForPayPaymentParams) {
  const merchantAccount = process.env.WAYFORPAY_MERCHANT_ACCOUNT!;
  const merchantSecret = process.env.WAYFORPAY_MERCHANT_SECRET!;
  const merchantDomainName = process.env.WAYFORPAY_MERCHANT_DOMAIN!;

  const orderReference = String(orderId);
  const orderDate = Math.floor(Date.now() / 1000);


  const productName = items.map(item => item.name);
  const productCount = items.map(item => item.quantity);
  const productPrice = items.map(item => item.price);

  console.log("ORDER TOTAL:", amount);
  console.log("WAYFORPAY AMOUNT:", amount);
  console.log("PRODUCT PRICE:", productPrice);
  console.log("PRODUCT COUNT:", productCount);

  const signatureString = [
    merchantAccount,
    merchantDomainName,
    orderReference,
    orderDate,
    amount,
    "UAH",
    ...productName,
    ...productCount,
    ...productPrice,
  ].join(";");

  const merchantSignature = crypto
    .createHmac("md5", merchantSecret)
    .update(signatureString)
    .digest("hex");

  const response = await fetch("https://api.wayforpay.com/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      transactionType: "CREATE_INVOICE",
      merchantAccount,
      merchantDomainName,
      merchantSignature,
      apiVersion: 1,

      orderReference,
      orderDate,
      amount: amount,
      currency: "UAH",

      productName,
      productCount,
      productPrice,

      returnUrl: process.env.WAYFORPAY_RETURN_URL,
      serviceUrl: process.env.WAYFORPAY_SERVICE_URL,
      approvedUrl: process.env.WAYFORPAY_APPROVED_URL,
      declinedUrl: process.env.WAYFORPAY_DECLINED_URL,
      clientEmail: email,
    }),
  });

  const data = await response.json();

  console.log("WAYFORPAY RESPONSE:", JSON.stringify(data, null, 2));

  if (!data?.invoiceUrl) {
    throw new Error("WayForPay payment failed");
  }

  return data.invoiceUrl;
}

export default createWayForPayPayment
