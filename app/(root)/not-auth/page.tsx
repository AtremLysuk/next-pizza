import { InfoBlock } from "@/components/shared";

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center mt-40">
      <InfoBlock
        title="Доступ запрещен"
        text="Вы не авторизованы"
        imageUrl="/assets/images/lock.png"
      />
    </div>
  );
}
