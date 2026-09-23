"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ticketPath, ticketsPath } from "@/paths";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { setCookieByKey } from "@/actions/cookies";
import { toCent } from "@/utils/currency";

const upsertTicketSchema = z.object({
  title: z.string().min(1).max(191),
  content: z.string().min(1).max(1024),
  deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Is required"),
  bounty: z.coerce.number().positive(),
});

const upsertTicket = async (
  ticketId: string | undefined,
  _actionState: ActionState,
  formData: FormData,
) => {
  try {
    const data = upsertTicketSchema.parse({
      title: formData.get("title"),
      content: formData.get("content"),
      bounty: formData.get("bounty"),
      deadline: formData.get("deadline"),
    });

    const dbData = {
      ...data,
      bounty: toCent(data.bounty),
    };

    await prisma.ticket.upsert({
      where: {
        id: ticketId || "",
      },
      create: dbData,
      update: dbData,
    });
  } catch (error) {
    // We pass the formData back because if there is an error, by default,
    // next will reset the form so we lose any values that have
    // already been input
    return fromErrorToActionState(error, formData);
  }

  revalidatePath(ticketsPath());

  // if we are editing, then redirect
  if (ticketId) {
    await setCookieByKey("toast", "Ticket Updated");
    redirect(ticketPath(ticketId));
  }

  return toActionState("SUCCESS", "Ticket created successfully");
};

export { upsertTicket };
