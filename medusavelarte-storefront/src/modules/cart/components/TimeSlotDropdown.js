import { DropdownMenu } from "@medusajs/ui"

const TimeSlotDropdown = () => {
  const timeSlots = [
    "13:15-13:45",
    "13:45-14:15",
    "14:15-14:45",
    "14:45-15:15",
  ];

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger>Selecciona una franja horaria</DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {timeSlots.map((slot, index) => (
          <DropdownMenu.Item key={index}>{slot}</DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu>
  );
};

export default TimeSlotDropdown;