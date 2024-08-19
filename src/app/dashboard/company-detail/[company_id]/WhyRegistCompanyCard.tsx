import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

const WhyRegisterCard = () => {
  return (
    <Card className="max-w-4xl p-6 mx-auto mb-4 text-yellow-800 bg-yellow-100 rounded-md shadow-md">
      <div className="flex items-start gap-4">
        <AlertCircle className="w-6 h-6 mt-1 text-yellow-800" />
        <div>
          <h3 className="text-xl font-semibold">
            아직 채용과정이 등록되지 않았습니다.
          </h3>
          <ul className="mt-2 space-y-2 text-sm">
            <li>
              <strong>체계적인 관리</strong>: 채용 과정을 등록하면 각 단계의
              진행 상황을 체계적으로 관리할 수 있습니다.
            </li>
            <li>
              <strong>진행 상황 추적</strong>: 각 단계의 진행 상황을 추적하여
              빠르게 대처할 수 있습니다.
            </li>
            <li>
              <strong>데이터 기반 의사결정</strong>: 채용 데이터 분석을 통해
              효율적인 채용 전략을 수립할 수 있습니다.
            </li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default WhyRegisterCard;
