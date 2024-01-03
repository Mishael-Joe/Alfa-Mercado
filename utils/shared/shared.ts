// function getDeliveryWindow() {
//   // Set the delivery time frame (e.g., 2 days)
//   const deliveryDays = 2;

//   // Calculate the delivery date
//   const deliveryDate = new Date();
//   deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);

//   // Calculate the time remaining
//   const currentDate = new Date();
//   const timeRemaining = deliveryDate - currentDate;

//   // Calculate hours and minutes
//   const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
//   const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

//   // Format the string
//   const deliveryString = `Ready for delivery between ${deliveryDate.toDateString()} when you order within the next ${hours}hrs ${minutes}mins.`;

//   return deliveryString;
// }


export function getDeliveryWindow() {
// Set the delivery time frame (e.g., 2 days)
const deliveryDays = 3;

// Calculate the delivery date
const deliveryDate = new Date();
deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);

// Calculate the time remaining
const currentDate = new Date();
const timeRemaining = deliveryDate.getTime() - currentDate.getTime();

// Calculate hours and minutes
const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

// Format the string
const deliveryString = `Ready for delivery between ${deliveryDate.toDateString()} when you order within the next ${hours}hrs ${minutes}mins.`;

return deliveryString;
}

// Example usage
// const deliveryWindow = getDeliveryWindow();
// console.log(deliveryWindow);
