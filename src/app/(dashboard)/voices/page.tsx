import type { Metadata } from "next";

import type { SearchParams } from "nuqs/server";

import { voicesSearchParamsCache } from "@/features/voices/lib/params";
import { VoicesView } from "@/features/voices/views/voices-views";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";

export default async function VoicesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  // extracting the query from the search params
  const { query } = await voicesSearchParamsCache.parse(searchParams);

  //
  prefetch(trpc.voices.getAll.queryOptions({ query }));
  return (
    <HydrateClient>
      <VoicesView />
    </HydrateClient>
  );
}
