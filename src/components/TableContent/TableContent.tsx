"use client";
import { useEffect, useState, useRef } from "react";
import { useStores } from "../../store/root-store-context";

import { observer } from "mobx-react-lite";

import { ISort, TSortWay, IUser, TOption } from "@/utils/types";

import { MoveUp, MoveDown } from "lucide-react";
import { user_photo } from "@/utils/constants";
import styles from "./TableContent.module.scss";

const TableContent = observer(() => {
  const [sortBy, setSortBy] = useState<ISort>({
    sortWay: "without",
    option: "without",
  });

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const {
    userStore: { isLoading, filterUsers, showedUsers, getSortUsers, getUsers },
  } = useStores();

  const tableRef = useRef<HTMLTableElement | null>(null);

  function handleChange(sort: TSortWay, option: TOption) {
    if (option === sortBy.option) {
      if (sortBy.sortWay === "without" || sortBy.sortWay !== sort) {
        setSortBy({ ...sortBy, sortWay: sort });
        getSortUsers(sort, option);
      } else {
        setSortBy({ ...sortBy, sortWay: "without" });
        getSortUsers("without", option);
      }
    } else {
      setSortBy({ sortWay: sort, option: option });
      getSortUsers(sort, option);
    }
  }

  function handleClick(user: IUser) {
    setIsOpenModal(true);
    setSelectedUser(user);
  }

  useEffect(() => {
    setSortBy({
      sortWay: "without",
      option: "without",
    });
  }, [filterUsers]);

  function returnIcon(option: TOption) {
    return (
      <>
        <MoveUp
          size={16}
          strokeWidth={2}
          className={
            sortBy.sortWay == "up" && sortBy.option == option
              ? styles.selectedIcon
              : styles.icon
          }
          onClick={() => {
            handleChange("up", option);
          }}
        />
        <MoveDown
          size={16}
          strokeWidth={2}
          className={
            sortBy.sortWay == "down" && sortBy.option == option
              ? styles.selectedIcon
              : styles.icon
          }
          onClick={() => {
            handleChange("down", option);
          }}
        />
      </>
    );
  }

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (!tableRef.current || tableRef.current.className === "noUsers") {
      return;
    }

    const cleanFun: (() => void)[] = [];

    const tableThElem: NodeListOf<HTMLTableCellElement> =
      tableRef.current.querySelectorAll("th");
    tableThElem.forEach((elem) => {
      const resizeHandleElem: HTMLElement | null =
        elem.querySelector<HTMLElement>(`.${styles.resizeHandle}`);
      if (!resizeHandleElem) {
        return;
      }

      let x_start: number;
      let x_start_width: number;

      function onMouseDown(event: MouseEvent) {
        x_start = event.clientX;
        x_start_width = elem.offsetWidth;

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
      }

      function onMouseUp() {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      }

      function onMouseMove(event: MouseEvent) {
        let new_width = Math.max(50, x_start_width + (event.clientX - x_start));

        elem.style.width = `${new_width}px`;
      }

      resizeHandleElem.addEventListener("mousedown", onMouseDown);

      cleanFun.push(() =>
        resizeHandleElem.removeEventListener("mousedown", onMouseDown)
      );

      return () => {
        cleanFun.forEach((fn) => fn());
      };
    });
  }, [showedUsers]);

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table} ref={tableRef}>
        <thead>
          <tr>
            <th>
              <div>
                <p>Last name</p>
                <div className={styles.icons}>{returnIcon("lastName")}</div>
              </div>
              <span className={styles.resizeHandle}></span>
            </th>
            <th>
              <div>
                <p>First name</p>
                <div className={styles.icons}>{returnIcon("firstName")}</div>
              </div>
              <span className={styles.resizeHandle}></span>
            </th>
            <th>
              <div>
                <p>Maiden name</p>
                <div className={styles.icons}>
                  {returnIcon("maidenName")}
                  <span className={styles.resizeHandle}></span>
                </div>
              </div>
            </th>
            <th>
              <div>
                <p>Age</p>
                <div className={styles.icons}>{returnIcon("age")}</div>
              </div>
              <span className={styles.resizeHandle}></span>
            </th>
            <th>
              <div>
                <p>Gender</p>
                <div className={styles.icons}>{returnIcon("gender")}</div>
              </div>
              <span className={styles.resizeHandle}></span>
            </th>
            <th>
              <div>
                <p>Phone</p>
                <div className={styles.icons}>{returnIcon("phone")}</div>
              </div>
              <span className={styles.resizeHandle}></span>
            </th>
            <th>
              <div>
                <p>Email</p>

                <div className={styles.icons}>{returnIcon("email")}</div>
              </div>
              <span className={styles.resizeHandle}></span>
            </th>
            <th>
              <div>
                <p>Country</p>
              </div>
              <span className={styles.resizeHandle}></span>
            </th>
            <th>
              <div>
                <p>City</p>
              </div>
              <span className={styles.resizeHandle}></span>
            </th>
          </tr>
        </thead>
        <tbody>
          {showedUsers && showedUsers.length !== 0 ? (
            showedUsers.map((user) => (
              <tr key={user.id} onClick={() => handleClick(user)}>
                <td>{user.lastName}</td>
                <td>{user.firstName}</td>
                <td>{user.maidenName || "-"}</td>
                <td>{user.age}</td>
                <td>{user.gender}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>{user.address?.country}</td>
                <td>{user.address?.city}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className={styles.noUsers} colSpan={9}>
                {isLoading ? "Loading..." : "No users found"}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {isOpenModal && selectedUser && (
        <div
          className={styles.modalWrapper}
          onClick={() => setIsOpenModal(false)}
        >
          <div
            className={styles.modalWindow}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>User information</h3>
            <div className={styles.userInfo}>
              <div className={styles.avatar}>
                <img
                  src={selectedUser.image ? selectedUser.image : user_photo}
                  width={100}
                  height={100}
                />
              </div>
              <div className={styles.content}>
                <p>
                  <strong>Name: </strong> {selectedUser.lastName}{" "}
                  {selectedUser.firstName} {selectedUser.maidenName}
                </p>
                <p>
                  <strong>Age:</strong> {selectedUser.age}
                </p>
                <p>
                  <strong>Address:</strong>{" "}
                  {[
                    selectedUser.address?.country,
                    selectedUser.address?.state,
                    selectedUser.address?.city,
                    selectedUser.address?.address,
                  ].join(", ")}
                </p>
                <p>
                  <strong>Height:</strong> {selectedUser.height} см
                </p>
                <p>
                  <strong>Weight:</strong> {selectedUser.weight} кг
                </p>
                <p>
                  <strong>Email:</strong> {selectedUser.email}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedUser.phone}
                </p>
                <button
                  className={styles.buttonClose}
                  onClick={() => setIsOpenModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default TableContent;
