import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Оплата прошла успешно ✅
        </h1>

        <p className="text-gray-700 mb-6">
          Спасибо за ваш заказ! Мы уже получили оплату и начали его обработку.
        </p>

        <Link
          href="/"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
        >
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}
