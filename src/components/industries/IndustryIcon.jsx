import {
  Factory,
  Globe2,
  HeartHandshake,
  Rocket,
  Ship,
} from "lucide-react";

const icons = {
  factory: Factory,
  globe: Globe2,
  heart: HeartHandshake,
  rocket: Rocket,
  ship: Ship,
};

export default function IndustryIcon({ name, ...props }) {
  const Icon = icons[name] ?? Rocket;

  return <Icon aria-hidden="true" {...props} />;
}
