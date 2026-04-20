import { calculatePoints } from "./rewards";

export const getCustomerPoints = (customer) => {
  return customer.transactions.reduce(
    (totalPoints, transaction) =>
      totalPoints + calculatePoints(transaction.amount),
    0,
  );
};

export const calculateAge = (dateOfBirth) => {
  const birthDate = new Date(dateOfBirth);
  const referenceDate = new Date("2026-05-30");

  let age = referenceDate.getFullYear() - birthDate.getFullYear();

  const monthDifference = referenceDate.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && referenceDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};
