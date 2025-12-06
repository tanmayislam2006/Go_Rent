const createBooking = async (bookingInfo: Record<string, any>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } =
    bookingInfo;
    const number_of_days=rent_end_date-rent_start_date
    console.log(number_of_days);
    return number_of_days
};
export const bookingService = {
  createBooking,
};
