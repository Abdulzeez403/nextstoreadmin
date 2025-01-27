import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Store {
  id: number;
  name: string;
  email: string;
  avatar: string;
  fallback: string;
  revenue: string;
}

const recentStores: Store[] = [
  {
    id: 1,
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    avatar: "/avatars/01.png",
    fallback: "OM",
    revenue: "+$1,999.00",
  },
  {
    id: 2,
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    avatar: "/avatars/02.png",
    fallback: "JL",
    revenue: "+$39.00",
  },
  {
    id: 3,
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    avatar: "/avatars/03.png",
    fallback: "IN",
    revenue: "+$299.00",
  },
  {
    id: 4,
    name: "William Kim",
    email: "will@email.com",
    avatar: "/avatars/04.png",
    fallback: "WK",
    revenue: "+$99.00",
  },
  {
    id: 5,
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    avatar: "/avatars/05.png",
    fallback: "SD",
    revenue: "+$39.00",
  },
];

export function RecentStores() {
  return (
    <div className="space-y-8">
      {recentStores.map((store) => (
        <div key={store.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={store.avatar} alt={`${store.name} Avatar`} />
            <AvatarFallback>{store.fallback}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{store.name}</p>
            <p className="text-sm text-muted-foreground">{store.email}</p>
          </div>
          <div className="ml-auto font-medium">{store.revenue}</div>
        </div>
      ))}
    </div>
  );
}
