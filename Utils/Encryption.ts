import { hash } from "bcrypt";

export const generatePasswordHash = async (
  password: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    hash(password, 10, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
};
