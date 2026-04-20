import data from "../data/data.json";

export const fetchCustomersData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        if (!data) {
          throw new Error("No Data available");
        }

        resolve(data);
      } catch (error) {
        reject(error);
      }
    }, 800);
  });
};
