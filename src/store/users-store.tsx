import { makeAutoObservable, runInAction } from "mobx";
import { USER_URL } from "../utils/constants";

import { IUser, IFilters, TSortWay, TOption } from "@/utils/types";

export class UsersStore {
  users: IUser[] = [];
  sortUsers: IUser[] = [];
  filterUsers: IUser[] = [];
  showedUsers: IUser[] = this.sortUsers.slice(0, 12);
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  getUsers = async () => {
    try {
      this.isLoading = true;
      const response = await fetch(
        `${USER_URL}?select=id,firstName,lastName,maidenName,age,gender,email,phone,address,weight,height,image`
      );

      const data = await response.json();
      runInAction(() => {
        this.users = data.users;
        this.filterUsers = data.users;
        this.sortUsers = data.users;
        this.showedUsers = data.users.slice(0, 12);
        this.isLoading = false;
      });
    } catch (error: any) {
      this.isLoading = false;
      console.log(error.message);
    }
  };

  getSortUsers = (sortType: TSortWay, option: TOption) => {
    let copy = [...this.filterUsers];

    if (option == "without") {
      return;
    } else {
      if (sortType == "without") {
        this.sortUsers = this.filterUsers;
      }
      if (sortType == "up") {
        copy.sort((user1, user2) => {
          if (user1[option] < user2[option]) {
            return -1;
          }
          if (user1[option] > user2[option]) {
            return 1;
          }

          return 0;
        });
        this.sortUsers = copy;
      }
      if (sortType == "down") {
        copy.sort((user1, user2) => {
          if (user1[`${option}`] > user2[`${option}`]) {
            return -1;
          }
          if (user1[`${option}`] < user2[`${option}`]) {
            return 1;
          }

          return 0;
        });
        this.sortUsers = copy;
      }
    }

    this.showedUsers = this.sortUsers.slice(0, 12);
  };

  getFilterUsers = (filters: IFilters) => {
    const { name, age, gender, city, phone_code } = filters;

    let filtered_users = this.users.filter((user) => {
      const isNameMatch =
        !name.trim() ||
        name
          .toLowerCase()
          .split(" ")
          .every((word) =>
            [user.firstName, user.lastName, user.maidenName || ""]
              .map((str) => str.toLowerCase())
              .some((part) => part.includes(word))
          );

      const isGenderMatch = gender === "not_selected" || user.gender === gender;

      const isCityMatch =
        city === "not_selected" || user.address?.city === city;

      const userPhoneCode = user.phone?.split(" ")[0];
      const isPhoneCodeMatch =
        phone_code === "not_selected" || userPhoneCode === phone_code;

      let isAgeMatch = true;
      if (age !== "not_selected" && user.age != null) {
        const userAge = +user.age;

        if (age === "0_19") isAgeMatch = userAge > 0 && userAge < 20;
        else if (age === "20_29") isAgeMatch = userAge >= 20 && userAge < 30;
        else if (age === "30_39") isAgeMatch = userAge > 30 && userAge <= 40;
        else if (age === "40+") isAgeMatch = userAge > 40;
      }

      return (
        isNameMatch &&
        isGenderMatch &&
        isCityMatch &&
        isPhoneCodeMatch &&
        isAgeMatch
      );
    });
    this.sortUsers = filtered_users;
    this.filterUsers = filtered_users;
    this.showedUsers =
      filtered_users.length >= 10
        ? filtered_users.slice(0, 12)
        : filtered_users.slice(0);
  };

  clearFilters = () => {
    this.sortUsers = this.users;
    this.filterUsers = this.users;
    this.showedUsers = this.sortUsers.slice(0, 12);
  };

  getShowedUsers = (num: number) => {
    try {
      this.isLoading = true;
      let list = num * 12;

      this.showedUsers = this.sortUsers.slice(list - 12, list);
    } catch {
      this.isLoading = false;
    }
  };
}
