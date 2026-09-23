import { CardCompact } from "@/components/card-compact";
import { Heading } from "@/components/heading";
import { Placeholder } from "@/components/placeholder";
import { Spinner } from "@/components/spinner";
import { TicketList } from "@/features/ticket/components/ticket-list";
import { TicketUpsertForm } from "@/features/ticket/components/ticket-upsert-form";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

// Force this page to be dynamic when it is built
// export const dynamic = "force-dynamic";

// Force this page to revalidate (returns fresh content on next request) in x time
// export const revalidate = 30; // 30 seconds

export default function TicketsPage() {
  return (
    <>
      <div className="flex-1 flex flex-col gap-y-8">
        <Heading
          title="Tickets Page"
          description="All your tickets in one place"
        />

        <CardCompact
          title="Create Ticket"
          description="A new ticket will be created"
          content={<TicketUpsertForm />}
          className="w-full max-w-105 self-center"
        />

        <ErrorBoundary fallback={<Placeholder label="Something went wrong" />}>
          <Suspense fallback={<Spinner />}>
            <TicketList />
          </Suspense>
        </ErrorBoundary>
      </div>
    </>
  );
}
