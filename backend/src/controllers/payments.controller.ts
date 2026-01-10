import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const createPayment = async (req: Request, res: Response) => {
  try {
    const { memberId, amount, method, reference, plan } = req.body;

    if (!memberId || !amount || !method || !plan) {
      return res.status(400).json({
        error: "memberId, amount, method, and plan are required"
      });
    }

    const member = await prisma.member.findUnique({
      where: { id: memberId },
      include: { memberships: true }
    });

    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }

    // record payment
    const payment = await prisma.payment.create({
      data: {
        memberId,
        amount,
        method,
        reference
      }
    });

    const now = new Date();

    const activeMembership = member.memberships.find(m => m.isActive);

    if (activeMembership) {
      // extend existing membership
      const newEndDate = new Date(activeMembership.endDate);
      newEndDate.setMonth(newEndDate.getMonth() + 1);

      await prisma.membership.update({
        where: { id: activeMembership.id },
        data: { endDate: newEndDate }
      });
    } else {
      // create new membership
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 1);

      await prisma.membership.create({
        data: {
          memberId,
          plan,
          startDate: now,
          endDate,
          isActive: true
        }
      });
    }

    // ensure member is active
    await prisma.member.update({
      where: { id: memberId },
      data: { status: "ACTIVE" }
    });

    return res.status(201).json({
      message: "Payment recorded and membership updated",
      payment
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Payment failed"
    });
  }
};
