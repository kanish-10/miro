"use client";

import { useOrganizationList } from "@clerk/nextjs";
import { Item } from "./Item";

export const List = () => {
  const { userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  if (!userMemberships.data?.length) return null;

  return (
    <ul className="space-y-4">
      {userMemberships.data?.map((mem) => (
        <Item
          key={mem.organization.name}
          name={mem.organization.name}
          id={mem.organization.id}
          imageUrl={mem.organization.imageUrl}
        />
      ))}
    </ul>
  );
};
