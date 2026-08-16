import {
  BriefcaseBusiness,
  Building2,
  Calculator,
  FileSignature,
  ReceiptText,
  Scale,
  UsersRound,
} from "lucide-react";

const icons = {
  briefcase: BriefcaseBusiness,
  building: Building2,
  calculator: Calculator,
  file: FileSignature,
  receipt: ReceiptText,
  scale: Scale,
  users: UsersRound,
};

export default function ServiceIcon({ name, ...props }) {
  const Icon = icons[name] || BriefcaseBusiness;

  return <Icon aria-hidden="true" {...props} />;
}
