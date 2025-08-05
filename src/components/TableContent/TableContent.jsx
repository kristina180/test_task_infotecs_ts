"use client";
import { useEffect, useState, useRef, use } from "react";
import { useStores } from "../../store/root-store-context";

import { observer } from "mobx-react-lite";

import { MoveUp, MoveDown } from "lucide-react";
import styles from "./TableContent.module.css";
import { user_photo } from "@/utils/constants";

const TableContent = observer(() => {
  const [sortBy, setSortBy] = useState({
    sortWay: "without",
    option: "without",
  });

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const {
    userStore: { filterUsers, showedUsers, getSortUsers, getUsers },
  } = useStores();

  const tableRef = useRef(null);

  function handleChange(sort, option) {
    if (option == sortBy.option) {
      if (sortBy.sortWay == "without" || sortBy.sortWay != sort) {
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

  function handleClick(user) {
    setIsOpenModal(true);
    setSelectedUser(user);
  }

  useEffect(() => {
    setSortBy({
      sortWay: "without",
      option: "without",
    });
  }, [filterUsers]);

  function returnIcon(option) {
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
    if (!tableRef.current) {
      return;
    }

    const tableThElem = tableRef.current.querySelectorAll("th");
    tableThElem.forEach((elem) => {
      const resizeHandleElem = elem.querySelector(`.${styles.resizeHandle}`);
      if (!resizeHandleElem) {
        return;
      }

      let x_start;
      let x_start_width;

      function onMouseDown(event) {
        x_start = event.clientX;
        x_start_width = elem.offsetWidth;

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
      }

      function onMouseUp() {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      }

      function onMouseMove(event) {
        let new_width = Math.max(50, x_start_width + (event.clientX - x_start));

        elem.style.width = `${new_width}px`;
      }

      resizeHandleElem.addEventListener("mousedown", onMouseDown);

      return () => {
        resizeHandleElem.removeEventListener("mousedown", onMouseDown);
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
                <p>Lastname</p>
                <div className={styles.icons}>{returnIcon("lastName")}</div>
              </div>
              <span className={styles.resizeHandle}></span>
            </th>
            <th>
              <div>
                <p>Firstname</p>
                <div className={styles.icons}>{returnIcon("firstName")}</div>
              </div>
              <span className={styles.resizeHandle}></span>
            </th>
            <th>
              <div>
                <p>Maidenname</p>
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
          {showedUsers &&
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
            ))}
        </tbody>
      </table>
      {showedUsers.length == 0 && (
        <div className={styles.noUsers}>No users found</div>
      )}

      {isOpenModal && (
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
                  src={selectedUser.avatar ? selectedUser.avatar : user_photo}
                  width={100}
                  height={100}
                />
              </div>
              <div className={styles.content}>
                <p>
                  <strong>Name:</strong> {selectedUser.lastName}{" "}
                  {selectedUser.firstName} {selectedUser.maidenName}
                </p>
                <p>
                  <strong>Age:</strong> {selectedUser.age}
                </p>
                <p>
                  <strong>Address:</strong>{" "}
                  {[
                    selectedUser.address.country,
                    selectedUser.address.state,
                    selectedUser.address.city,
                    selectedUser.address.address,
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
