import { Button, Heading } from "@medusajs/ui";
import { useState } from "react";
import { DatePicker } from "@medusajs/ui";

import CartTotals from "@modules/common/components/cart-totals";
import Divider from "@modules/common/components/divider";
import { CartWithCheckoutStep } from "types/global";
import DiscountCode from "@modules/checkout/components/discount-code";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

type SummaryProps = {
  cart: CartWithCheckoutStep;
};

const generateTimeSlots = () => {
  const timeSlots = [];
  let startTime = new Date();
  startTime.setHours(13, 15, 0, 0); // Empieza a las 13:15
  
  const endTime = new Date();
  endTime.setHours(15, 15, 0, 0); // Termina a las 15:15

  while (startTime <= endTime) {
    const label = `${startTime.getHours()}:${startTime.getMinutes().toString().padStart(2, '0')} - ${startTime.getHours()}:${(startTime.getMinutes() + 30).toString().padStart(2, '0')}`;
    const start = `${startTime.getHours()}:${startTime.getMinutes().toString().padStart(2, '0')}`;
    const end = `${startTime.getHours()}:${(startTime.getMinutes() + 30).toString().padStart(2, '0')}`;
    
    timeSlots.push({ label, start, end });
    
    startTime.setMinutes(startTime.getMinutes() + 30); // Incrementa 30 minutos
  }

  return timeSlots;
};

const timeSlots = generateTimeSlots();

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
          placeholder="Selecciona una fecha y franja horaria"
          selected={selectedDate}
          onChange={handleDateChange}
          showTimePicker
          presets={timeSlots.map(slot => ({
            label: slot.label,
            date: selectedDate ? new Date(selectedDate.setHours(parseInt(slot.start.split(':')[0]), parseInt(slot.start.split(':')[1]))) : undefined,
          }))}
          onSelectTime={(time: Date) => {
            const formattedTime = `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`;
            const selectedSlot = timeSlots.find(slot => slot.start === formattedTime);
            if (selectedSlot) {
              setSelectedTimeSlot(selectedSlot.label);
            }
          }}
        />
      </div>
      {selectedDate && selectedTimeSlot && (
        <p>Fecha y franja horaria seleccionadas: {selectedDate.toLocaleDateString()} - {selectedTimeSlot}</p>
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
