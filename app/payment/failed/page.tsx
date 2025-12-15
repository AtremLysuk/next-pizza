import Link from "next/link";

export default function PaymentFailedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Оплата не прошла ❌
        </h1>

        <p className="text-gray-700 mb-6">
          К сожалению, платёж был отклонён или отменён. Вы можете попробовать
          оплатить ещё раз.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            href="/checkout"
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
          >
            Повторить оплату
          </Link>

          <Link
            href="/"
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
          >
            На главную
          </Link>
        </div>
      </div>
    </div>
  );
}
