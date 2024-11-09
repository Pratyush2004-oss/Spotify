import { Card, CardContent } from "@/components/ui/card";

type StatCardProp = {
  icon: React.ElementType;
  label: string;
  value: string | null;
  bgColor: string;
  iconColor: string;
};

const StatsCard = ({
  icon: Icon,
  label,
  value,
  bgColor,
  iconColor,
}: StatCardProp) => {
  return (
    <Card
      className={`${bgColor} ${bgColor} hover:${bgColor}/50 transition-colors`}
    >
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div>
            <Icon className={`size-6 ${iconColor}`} />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-400">{label}</p>
            <p className="text-xl font-semibold">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
