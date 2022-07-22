import { API_URL } from "../contexts/Config";
import IFine from "../interfaces/Fine";

const BASE_URL = API_URL + "fine/";

export const FineService = {
  createFine(fine: IFine): Promise<void> {
    return fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fine),
    }).then();
  },

  updateFine(fine: IFine): Promise<void> {
    return fetch(BASE_URL + fine.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fine),
    }).then();
  },

  deleteFine(id: number): Promise<void> {
    return fetch(BASE_URL + id, {
      method: "DELETE",
    }).then();
  },

  retrieveFines(setFines?: (a: IFine[]) => void) {
    const url = BASE_URL + "fines";
    fetch(url)
      .then((response) => response.json())
      .then((fines) => {
        setFines && setFines(fines);
      });
  },
};
