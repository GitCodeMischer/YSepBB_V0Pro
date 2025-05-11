"use client";

import ArrowUpRightIcon from "@/assets/icons/arrow-up-right";
import MailIcon from "@/assets/icons/mail";
import { AlertDialog } from "@/shared/components/alerts/alert-dialog";
import { useAlert } from "@/shared/components/alerts/alert-hook";
import { AlertEnum } from "@/shared/components/alerts/types";
import CardTitle from "@/shared/components/titles/card-title";
import { useLoadingButton } from "@/shared/hooks/loading-button-hook";
import cardStyle from "@/shared/styles/card";
import inputStyle from "@/shared/styles/input";
import "@/shared/styles/input.css";
import { useEffect, useState } from "react";
import LinksGridCard from "../cards/links/links-grid";

const getTextById = (id: string): string | undefined => {
  try {
    const element = document.getElementById(id) as HTMLInputElement;
    return element.value;
  } catch { }
};

const setTextById = (id: string, value: string): void => {
  try {
    const element = document.getElementById(id) as HTMLInputElement;
    element.value = value;
  } catch { }
};

export default function AppData() {
  const [isSent, setIsSent] = useState(false);

  const [hasCredentials, setHasCredentials] = useState(false)

  const alertDialog = useAlert({
    Alert: AlertDialog,
    iniAlert: { type: AlertEnum.ERROR, className: "" },
  });
  const loadingButton = useLoadingButton({
    props: {
      className:
        "justify-center items-center rounded-full bg-dark dark:bg-white text-white dark:text-dark",
      button: (
        <button
          type="submit"
          disabled={isSent}
          onClick={() => {
            try {
              ["email", "password"].forEach((id) => {
                if (!getTextById(id))
                  throw {
                    title:
                      id.charAt(0).toUpperCase() + id.slice(1) + " wird benötigt",
                    description: "geben Sie ein(e) " + id + " ein",
                    type: AlertEnum.ERROR,
                  };
              });
            } catch (error) {
              alertDialog.setAlertWithTimeout(error as any);
            }
          }}
          className={
            "rounded-full flex font-normal text-sm text-center gap-3 px-6 py-4 hover:bg-neutral-500/20" +
            (isSent
              ? " bg-green-500 text-white font-medium hover:bg-green-500"
              : "")
          }
        >
          {isSent ? "Sent" : "Send"}
          {isSent ? (
            <MailIcon className="w-5 h-5" strokeWidth={2} />
          ) : (
            <ArrowUpRightIcon className="w-5 h-5" />
          )}
        </button>
      ),
    },
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      loadingButton.setLoading(true);

      const email = getTextById("email");
      const password = getTextById("password");

      var credentials = {
        email: email,
        password: password
      }

      let jsonstring = JSON.stringify(credentials);
      let encodedValue = btoa(jsonstring);
      console.log(encodedValue);
      localStorage.setItem("credentials", encodedValue)

      alertDialog.setAlertWithTimeout({ title: "Credentials Erfolgreich eingefügt", description: "Login Credentials wurden soeben eingesetzt", seconds: 1.2, type: AlertEnum.SUCCESS })

      setTimeout(() => {
        setTextById("email", "");
        setTextById("password", "");
        setHasCredentials(true)

        loadingButton.setLoading(false)
      }, 1200)
    } catch (error) {
      loadingButton.setLoading(false);
      alertDialog.setAlertWithTimeout(error as any);
    }
  };

  useEffect(() => {
    var credentials = localStorage.getItem("credentials");

    if (credentials) {
      setHasCredentials(true)
    }

    return () => {

    }
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <form onSubmit={handleSubmit} className={cardStyle + " gap-7"}>
          <CardTitle title="Auth Credentials API" icon={<MailIcon />} />
          <p className="text-md pb-1">
            <a className="opacity-70">
              Alperia App Daten
            </a>
          </p>
          <TextInput
            required
            id="email"
            type="email"
            label="Email"
            placeholder="Alperia App Email"
          />
          <TextInput
            required
            id="password"
            type="password"
            label="Password"
            placeholder="Alperia App Passwort"
          />
          <div className="w-full flex justify-between">
            <div className="col-span-9 sm:col-span-6 md:col-span-3">
              <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl text-red-500" style={{background: hasCredentials ? '#69C350': '#f7b55C'}}>
                <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="8" cy="15" r="3" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></circle> <path d="M10 12.5858L17.0858 5.5" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <line x1="16.9142" y1="7" x2="18" y2="8.08579" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></line> <line x1="14.4142" y1="9.5" x2="15.5" y2="10.5858" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></line> </g></svg>
              </div>
            </div>

            {loadingButton.loadingButton}
          </div>
          {alertDialog.alert}
        </form>

        <div className="py-3" />


        <div className="py-3" />
        <LinksGridCard />
      </div>
    </>
  );
}

function TextInput(props: any) {
  const inputProps = Object.assign({}, props);
  delete inputProps.isTextArea;
  delete inputProps.label;
  return (
    <div className="input-container relative w-full">
      {props.isTextArea ? (
        <textarea {...inputProps} className={inputStyle} />
      ) : (
        <input {...inputProps} className={inputStyle} />
      )}
      <label
        className={
          "input-label absolute pointer-events-none text-xs top-[-10px] left-3 border-0 bg-white dark:bg-dark w-fit px-0.5 rounded-md"
        }
      >
        {props.label}
      </label>
    </div>
  );
}
