"use client";
import { Button, Heading } from "@medusajs/ui";
import { useState } from "react";
import { DatePicker } from "@medusajs/ui";

import CartTotals from "@modules/common/components/cart-totals";
import Divider from "@modules/common/components/divider";
import { CartWithCheckoutStep } from "types/global";
import DiscountCode from "@modules/checkout/components/discount-code";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import TimeSlotDropdown from "../components/TimeSlotDropdown";

type SummaryProps = {
  cart: CartWithCheckoutStep;
};

const Summary = ({ cart }: SummaryProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleTimeSlotChange = (slot: string) => {
    setSelectedTimeSlot(slot);
  };

  return (
    <div className="flex flex-col gap-y-4">
      <Heading level="h2" className="text-[2rem] leading-[2.75rem]">
        Resumen
      </Heading>
      <DiscountCode cart={cart} />
      <div className="w-[250px]">
        <DatePicker
          placeholder="Selecciona una fecha"
          selected={selectedDate}
          onChange={handleDateChange}
        />
      </div>
      <div className="w-[250px]">
        <TimeSlotDropdown onSelect={handleTimeSlotChange} /> {/* Usa el nuevo componente */}
      </div>
      {selectedDate && selectedTimeSlot && (
        <p>Fecha y franja horaria seleccionadas: {selectedDate.toLocaleDateString()} - {selectedTimeSlot}</p>
      )}
      {selectedTimeSlot && (
        <p>Franja horaria seleccionada: {selectedTimeSlot}</p>
      )}
      <Divider />
      <CartTotals data={cart} />
      <LocalizedClientLink
        href={"/checkout?step=" + cart.checkout_step}
        data-testid="checkout-button"
      >
        <Button className="w-full h-10">Ir al checkout</Button>
      </LocalizedClientLink>
    </div>
  );
};

export default Summary;
