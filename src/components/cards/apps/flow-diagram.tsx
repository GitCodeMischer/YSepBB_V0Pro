import React, { useState, useEffect } from 'react';
import cardStyle from "@/shared/styles/card";
import Moment from 'react-moment';

function CalculatePercentage(percentage: number) {
  var minval = 0;
  var maxval = 70;

  var calculation = (percentage) * (maxval - minval) / 100
  return maxval - calculation
}

function FlowDiagramm() {
  const residual = 0;

  const c_off = "#f7b55C"
  const c_on = "#69C350"
  const c_neutral = "#ebebf599"
  const c_disabled = "#1c1c1ea3"

  let timer: string | number | NodeJS.Timeout | undefined;

  const [data, setData] = useState(
    {
      pvroof: 0,
      pvroof_unit: 'W',
      batteryout: 0,
      batteryout_unit: 'W',
      batterycap: 0,
      powergrid: 0,
      powergrid_unit: 'W',
      consumer: 0,
      consumer_unit: 'W',
      residual: 0,
      residual_unit: "W"
    }
  );

  const [lastupdate, setLastUpdate] = useState(new Date())
  const [callState, setCallState] = useState(0)

  const collectNewTokens = async () => {
    try {
      var accesstoken = localStorage.getItem("access_token");
      var refreshtoken = localStorage.getItem("refresh_token");
      var credentials = localStorage.getItem("credentials");

      if (!accesstoken && !refreshtoken && !credentials) {
        return
      }

      if (accesstoken && refreshtoken) {
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        };

        const response = await fetch('https://api-portal.regalgrid.com/api/TokenAuth/RefreshToken?refreshToken=' + refreshtoken, requestOptions);

        if (response.status == 200) {
          var responsedata = await response.json();

          localStorage.setItem("access_token", responsedata.result?.accessToken)
          localStorage.setItem("refresh_token", responsedata.result?.refreshToken)
        }
      } else {
        if (credentials) {

          var convertedcreds = atob(credentials);
          var jsoncreds = JSON.parse(convertedcreds);

          var authpayload = {
            userNameOrEmailAddress: jsoncreds.email,
            password: jsoncreds.password,
            twoFactorVerificationCode: "",
            rememberClient: false,
            twoFactorRememberClientToken: "",
            singleSignIn: false,
            returnUrl: "",
            captchaResponse: ""
          }

          const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Abp.TenantId': '2'
            },
            body: JSON.stringify(authpayload)
          };

          const response = await fetch('https://api-portal.regalgrid.com/api/TokenAuth/Authenticate', requestOptions);

          if (response.status == 200) {
            var data = await response.json()

            localStorage.setItem("access_token", data.result.accessToken ?? null)
            localStorage.setItem("refresh_token", data.result?.refreshToken ?? null)
          }
        }
      }

    } catch (ex) {
      console.error(ex);
    }
  }

  const fetchData = async () => {
    var accessToken = localStorage.getItem("access_token");

    try {

      var payloaddata = {
        "Date": "2024-04-25",
        "IdDevices": "16931",
        "DeviceTimeOffset": 1,
        "ExtractionType": 1,
        "AgregatePower": 0,
        "AgregateEnergy": 0,
        "LanguageId": "de",
        "CountryId": "de",
        "Interval": 0,
        "ReturnChartType": ""
      }

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(payloaddata)
      };

      const response = await fetch('https://api-service.regalgrid.com/Api_System/api/SystemData/SystemLiveData', requestOptions);

      if (response.status == 401) {
        await collectNewTokens();
      }

      const jsonData = await response.json();

      var residualcalulated = Math.abs((jsonData.Battery.Battery.Value ?? 0) * 1000 + (jsonData.Utility.Value ?? 0) * 1000 + (jsonData.PvSystem.Value ?? 0) * 1000);
      
      //aufbereiten Daten
      const aggdata: any = {
        pvroof: jsonData.PvSystem.Value,
        pvroof_unit: jsonData.PvSystem.UnitOfMeasure ?? 'W',
        batteryout: jsonData.Battery.Battery.Value ?? 0,
        batteryout_unit: jsonData.Battery.Battery.UnitOfMeasure ?? 'W',
        batterycap: jsonData.Battery.SOC.Value ?? 0,
        powergrid: jsonData.Utility.Value ?? 0,
        powergrid_unit: jsonData.Utility.UnitOfMeasure ?? 'W',
        consumer: jsonData.Load.Value ?? 0,
        consumer_unit: jsonData.Load.UnitOfMeasure ?? 'W',
        residual: residualcalulated,
        residual_unit: 'W',
      }

      setData(aggdata);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const checkforUpdatedLiveData = async () => {
    var accessToken = localStorage.getItem("access_token");

    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
    };
    const response = await fetch('https://api-service.regalgrid.com/Api_System/api/SystemData/CheckLiveData?PodId=16931', requestOptions);

    setCallState(response.status);

    if (response.status == 401) {
      await collectNewTokens();
    }

    const jsonData = await response.json();

    if (jsonData) {
      var last_utc = new Date(jsonData?.LastUpdate)
      var saved_utc = lastupdate;

      last_utc.setTime(last_utc.getTime() + (Math.abs(new Date().getTimezoneOffset() * 60 * 1000)))

      if (last_utc > saved_utc) {
        fetchData();
        setLastUpdate(new Date())
      }
    }
  }

  const isWithinTimeLimit = () => {
    const currentTime = new Date();
    const timeDifference = currentTime.getTime() - lastupdate.getTime();
    return timeDifference < 60000;
  };

  useEffect(() => {
    fetchData();

    timer = window.setInterval(() => {
      checkforUpdatedLiveData();
    }, 2500);
    return () => {
      clearInterval(timer)
    }
  }, []);

  return (

    <div className={cardStyle}>

      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 333 455.64181359802205">
        <g>
          <line x1="166.5" y1="227.82090679901103" x2="166.5" y2="142" stroke="rgba(142, 142, 147, 1)" stroke-width="2" />

          {
            data?.pvroof == 0 ? c_neutral :
              <line x1="166.5" y1="227.82090679901103" x2="166.5" y2="142" stroke={c_on} stroke-width="7" stroke-dasharray="0 121.82090679901104" stroke-linecap="round">
                <animate attributeName="stroke-dashoffset" values="0;121.82090679901104" dur="1.8s" repeatCount="indefinite" />
              </line>
          }

          <line x1="166.5" y1="227.82090679901103" x2="240.8230854637602" y2="184.9104533995055" stroke="rgba(142, 142, 147, 1)" stroke-width="2" />

          <line x1="166.5" y1="227.82090679901103" x2="240.8230854637602" y2="270.73136019851654" stroke="rgba(142, 142, 147, 1)" stroke-width="2" />

          {
            data?.batteryout == 0 ? c_neutral :
              data?.batteryout < 0 ?
                <line x1="166.5" y1="227.82090679901103" x2="240.8230854637602" y2="270.73136019851654" stroke={c_off} stroke-width="7" stroke-dasharray="0 121.82090679901104" stroke-linecap="round">
                  <animate attributeName="stroke-dashoffset" values="0;121.82090679901104" dur="1.8s" repeatCount="indefinite" />
                </line>
                :
                <line x1="166.5" y1="227.82090679901103" x2="240.8230854637602" y2="270.73136019851654" stroke={c_on} stroke-width="7" stroke-dasharray="0 121.82090679901104" stroke-linecap="round">
                  <animate attributeName="stroke-dashoffset" values="121.82090679901104;0" dur="1.8s" repeatCount="indefinite" />
                </line>
          }

          <line x1="166.5" y1="227.82090679901103" x2="166.5" y2="313.64181359802205" stroke="rgba(142, 142, 147, 1)" stroke-width="2" />

          {
            data?.powergrid == 0 ? c_neutral :
              data?.powergrid < 0 ?
                <line x1="166.5" y1="227.82090679901103" x2="166.5" y2="313.64181359802205" stroke={c_on} stroke-width="7" stroke-dasharray="0 121.82090679901104" stroke-linecap="round">
                  <animate attributeName="stroke-dashoffset" values="121.82090679901104;0" dur="1.8s" repeatCount="indefinite" />
                </line>
                :
                <line x1="166.5" y1="227.82090679901103" x2="166.5" y2="313.64181359802205" stroke={c_off} stroke-width="7" stroke-dasharray="0 121.82090679901104" stroke-linecap="round">
                  <animate attributeName="stroke-dashoffset" values="0;121.82090679901104" dur="1.8s" repeatCount="indefinite" />
                </line>
          }

          <line x1="166.5" y1="227.82090679901103" x2="100.8371685740842" y2="275.73136019851654" stroke="rgba(142, 142, 147, 1)" stroke-width="2" />

          {
            data?.consumer == 0 ? c_neutral :
              <line x1="166.5" y1="227.82090679901103" x2="100.8371685740842" y2="275.73136019851654" stroke="#f7b55C" stroke-width="7" stroke-dasharray="0 121.82090679901104" stroke-linecap="round">
                <animate attributeName="stroke-dashoffset" values="121.82090679901104;0" dur="1.9s" repeatCount="indefinite" />
              </line>
          }

          <line x1="166.5" y1="227.82090679901103" x2="92.17691453623979" y2="184.9104533995055" stroke="rgba(142, 142, 147, 1)" stroke-width="2" />

          {
            data?.residual == 0 ? c_neutral :
              <line x1="166.5" y1="227.82090679901103" x2="92.17691453623979" y2="184.9104533995055" stroke="#f7b55C" stroke-width="7" stroke-dasharray="0 121.82090679901104" stroke-linecap="round">
                <animate attributeName="stroke-dashoffset" values="121.82090679901104;0" dur="2s" repeatCount="indefinite" />
              </line>
          }

          <circle cx="166.5" cy="227.82090679901103" r="6" fill="rgba(142, 142, 147, 1)" />
        </g>

        <g transform="translate(105.5, -1.42109e-14)">
          <g transform="translate(-105, 10)">
            <rect x="0" y="0" width="122" height="70" fill="none" />
            <text x="50%" y="25" text-anchor="middle" font-size="17" fill="rgb(255, 255, 255)">{data?.pvroof} {data?.pvroof_unit}</text>
            <text x="50%" y="46" text-anchor="middle" font-size="17" fill="rgba(235, 235, 245, 0.6)">PV Dach</text>
          </g>
          <g transform="translate(25, 70)">
            <circle cx="36" cy="36" r="34.5" fill="rgba(28,28,30,0.64)" stroke={data?.pvroof == 0 ? c_neutral : c_on} stroke-width="3" />
            <g transform="translate(20, 20) scale(1.2)">
              <path fill="rgb(235, 235, 245)" d="M9.5 2a.5.5 0 0 0 .5-.5v-1a.5.5 0 1 0-1 0v1a.5.5 0 0 0 .5.5ZM3.148 3.826a.497.497 0 0 0 .707 0 .5.5 0 0 0 0-.707l-1-1a.5.5 0 0 0-.707.707l1 1Zm12.353.147a.495.495 0 0 0 .353-.147l1-1a.5.5 0 0 0-.707-.707l-1 1a.5.5 0 0 0 .354.854ZM1.5 9h-1a.5.5 0 0 0 0 1h1a.5.5 0 1 0 0-1Zm2.44 3.819 2.249-4.048A1.5 1.5 0 0 1 7.5 8h8.326c-.669-2.877-3.248-5.029-6.325-5.029a6.508 6.508 0 0 0-6.5 6.5 6.45 6.45 0 0 0 .939 3.348ZM14.501 20h-3a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3c.276 0 .5-.224.499-.5v-3a.499.499 0 0 0-.499-.5ZM11.61 9l-.663 3h4.08l-.666-3H11.61ZM21 13h-4.725l.449 1.971h5.387L21 13Zm-5.749 0h-4.526l-.447 1.971h5.421L15.251 13Zm-5.196 3-.676 3h7.224l-.679-3h-5.869ZM5 13l-1.11 1.971h5.364L9.7 13H5Zm18.857 5.15L22.667 16h-5.719l.679 3h5.894a.483.483 0 0 0 .479-.5.502.502 0 0 0-.143-.35Zm-21.794.108A.499.499 0 0 0 2.5 19h5.856l.676-3H3.334l-1.271 2.258ZM16.052 12h4.392l-1.507-2.742A.5.5 0 0 0 18.5 9h-3.114l.666 3ZM7.063 9.258 5.556 12h4.368l.663-3H7.5c-.181 0-.349.1-.437.258Z" />
            </g>
          </g>
        </g>

        <g transform="translate(211, 60.9105)">
          <g transform="translate(-105, 10)">
            <rect x="0" y="0" width="122" height="70" fill="none" />
            <text x="50%" y="25" text-anchor="middle" font-size="17" fill="rgb(255, 255, 255)">--</text>
            <text x="50%" y="46" text-anchor="middle" font-size="17" fill="rgba(235, 235, 245, 0.6)">Wallbox</text>
          </g>
          <g transform="translate(25, 70)">
            <circle cx="36" cy="36" r="34.5" fill="rgba(28,28,30,0.64)" stroke="rgba(235, 235, 245, 0.6)" stroke-width="3" />
            <g transform="translate(17.2, 17.2) scale(1.5)">
              <path fill="rgb(235, 235, 245)" d="M19.294 6.16a.5.5 0 0 0-.729.684A8.965 8.965 0 0 1 21 13c0 4.962-4.037 9-9 9s-9-4.038-9-9a8.988 8.988 0 0 1 8-8.936V5.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V5h1.5a.5.5 0 0 0 0-1H16V3h1.5a.5.5 0 0 0 0-1H16v-.5a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 0-.5.5v1.56A9.987 9.987 0 0 0 2 13c0 5.514 4.486 10 10 10s10-4.486 10-10a9.96 9.96 0 0 0-2.706-6.84Z" />
              <path d="m15.86 12-.886-2.658A.499.499 0 0 0 14.5 9h-5a.5.5 0 0 0-.475.342L8.14 12h7.72ZM15 15a.5.5 0 0 1 0-1h3v-.5a.5.5 0 0 0-.276-.447L17.618 13H6.382l-.105.053A.499.499 0 0 0 6 13.5v.5h3a.5.5 0 1 1 0 1H6v1.5a.5.5 0 0 0 .5.5H7v1a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1h4v1a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1h.5a.5.5 0 0 0 .5-.5V15h-3Z" />
            </g>
          </g>
        </g>

        <g transform="translate(211, 252.731)">
          <g transform="translate(25, 0)">
            <circle cx="36" cy="36" r="34.5" fill="#ddd" />

            <circle cx="36" cy="36" r="34.5" fill="none" stroke="none">
              <text x="36" y="36" text-anchor="middle" dominant-baseline="middle" font-size="18">0%</text>
            </circle>

            <defs>
              <clipPath id="fillClip">
                {/* MIN 0 Max 70 */}
                <rect x="0" y={CalculatePercentage(data?.batterycap)} width="72" height="70" fill="black" />
                <animate attributeName="y" from="72" to="13.5" dur="5s" fill="freeze" />
              </clipPath>
            </defs>
            <circle cx="36" cy="36" r="34.5" fill={c_on} clip-path="url(#fillClip)">
            </circle>

            <circle cx="36" cy="36" r="34.5" fill="none" stroke="none">
              <text x="36" y="36" text-anchor="middle" dominant-baseline="middle" font-size="18">
                <animate attributeName="textContent" from="0" to="15" dur="5s" fill="freeze" />  </text>
            </circle>

            {/* ORGINAL ELEMENT */}
            <circle cx="36" cy="36" r="34.5" fill="rgba(28,28,30,0.64)" stroke={data?.batteryout == 0 ? c_neutral : data?.batteryout < 0 ? c_off : c_on} stroke-width="3" />
            {/* ORGINAL ELEMENT */}

            <g transform="translate(15, 15) scale(1.7)">
              <path fill="rgb(235, 235, 245)" d="M16 17.5v-9a.5.5 0 0 0-.5-.5H14V6.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5V8H8.5a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5Zm-2.144-4.648-2.5 2.532a.499.499 0 0 1-.708.004.501.501 0 0 1-.005-.707L12.304 13H10.5a.5.5 0 0 1-.352-.857l2.5-2.468a.5.5 0 1 1 .703.712L11.718 12H13.5a.5.5 0 0 1 .356.852Z" />
            </g>
          </g>
          <g transform="translate(-105, 75)">
            <rect x="0" y="0" width="122" height="70" fill="none" />
            <text x="50%" y="20" text-anchor="middle" font-size="17" fill="rgba(235, 235, 245, 0.6)">Batterie</text>
            <text x="50%" y="41" text-anchor="middle" font-size="17" fill="rgb(255, 255, 255)">{data?.batteryout} {data?.batteryout_unit}</text>
            <text x="50%" y="62" text-anchor="middle" font-size="17" fill="rgb(255, 255, 255)">{data?.batterycap} %</text>
          </g>
        </g>

        <g transform="translate(105.5, 313.642)">
          <g transform="translate(25, 0)">
            <circle cx="36" cy="36" r="34.5" fill="rgba(28,28,30,0.64)" stroke={data?.powergrid == 0 ? c_neutral : data?.powergrid < 0 ? c_on : c_off} stroke-width="3" />
            <g transform="translate(20, 20) scale(1.2)">
              <path fill="rgb(235, 235, 245)" d="M12.952.693a1 1 0 0 0-1.904 0L9.658 5H3.5a.5.5 0 0 0 0 1h5.836l-.645 2H4.5a.5.5 0 0 0 0 1h3.869l-2.302 7.136-2.975 6.445a1 1 0 0 0 1.816.838l.51-1.105L12 19.543l6.582 2.77.51 1.106a1 1 0 0 0 1.816-.838l-2.975-6.445L15.631 9H19.5a.5.5 0 0 0 0-1h-4.191l-.645-2H20.5a.5.5 0 0 0 0-1h-6.159L12.951.693Zm3.488 16.98 1.52 3.294L13.29 19l3.151-1.327Zm-.414-.935.007.021L12 18.457 7.967 16.76l.007-.021L12 15.043l4.026 1.695Zm-.963-2.985.558 1.73-2.332-.983 1.774-.747Zm-.344-1.066.036.11L12 13.957l-2.755-1.16.036-.11L12 11.543l2.72 1.145Zm-.65-2.016.245.761L13.29 11l.78-.329ZM13.529 9l.232.716-1.761.742-1.76-.742.23-.716h3.06Zm-.967-3 .645 2h-2.414l.645-2h1.124Zm-.802-1 .24-.743.24.743h-.48Zm-2.074 6.432.245-.76.78.328-1.025.432Zm-1.307 4.05.558-1.73 1.774.748-2.332.982Zm-2.34 5.485 1.521-3.294L10.711 19 6.04 20.967Z" clip-rule="evenodd" />
            </g>
          </g>
          <g transform="translate(-105, 70)">
            <rect x="0" y="0" width="122" height="70" fill="none" />
            <text x="50%" y="25" text-anchor="middle" font-size="17" fill="rgba(235, 235, 245, 0.6)">Netz</text>
            <text x="50%" y="46" text-anchor="middle" font-size="17" fill="rgb(255, 255, 255)">{data?.powergrid} {data?.powergrid_unit}</text>
          </g>
        </g>

        <g transform="translate(0, 252.731)">
          <g transform="translate(25, 0)">
            <circle cx="47" cy="36" r="32.0000000004" stroke="rgba(151, 151, 151, 1)" stroke-width="2" clip-path="url(#energyIconClippy-45774)" fill="rgba(28,28,30,0.64)" />
            <circle cx="47" cy="36" r="34.5" fill="rgba(28,28,30,0.64)" stroke={data?.consumer == 0 ? c_neutral : c_off} stroke-width="3" />
            <clipPath id="energyIconClippy-45774">
              <path d="M0 0h80v72h-80M0 36a36 36 0 11072 0a36 36 0 10-72 0" />
            </clipPath>
            {/* <g transform="translate(20, 20) scale(1.2)">
              <path fill="rgb(235, 235, 245)" d="M14.703.542a.512.512 0 00-.61.159l-10 13.44a.466.466 0 00-.038.5c.085.158.257.26.445.26h7.376l-1.864 8.055a.476.476 0 00.284.543.51.51 0 00.61-.16l10-13.44a.464.464 0 00.038-.497.502.502 0 00-.445-.262h-7.377l1.865-8.056a.476.476 0 00-.284-.542z" clip-rule="evenodd" />
            </g> */}

            <g transform="translate(32, 20) scale(0.06)">
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
              </g><g id="SVGRepo_iconCarrier">
                <g>
                  <g>
                    <g fill="rgb(235, 235, 245)">
                      <path d="M487.083,225.514l-75.08-75.08V63.704c0-15.682-12.708-28.391-28.413-28.391c-15.669,0-28.377,12.709-28.377,28.391 v29.941L299.31,37.74c-27.639-27.624-75.694-27.575-103.27,0.05L8.312,225.514c-11.082,11.104-11.082,29.071,0,40.158 c11.087,11.101,29.089,11.101,40.172,0l187.71-187.729c6.115-6.083,16.893-6.083,22.976-0.018l187.742,187.747 c5.567,5.551,12.825,8.312,20.081,8.312c7.271,0,14.541-2.764,20.091-8.312C498.17,254.586,498.17,236.619,487.083,225.514z">
                      </path>
                      <path d="M257.561,131.836c-5.454-5.451-14.285-5.451-19.723,0L72.712,296.913c-2.607,2.606-4.085,6.164-4.085,9.877v120.401 c0,28.253,22.908,51.16,51.16,51.16h81.754v-126.61h92.299v126.61h81.755c28.251,0,51.159-22.907,51.159-51.159V306.79 c0-3.713-1.465-7.271-4.085-9.877L257.561,131.836z">
                      </path>
                    </g>
                  </g>
                </g>
              </g>
            </g>

          </g>
          <g transform="translate(-100,70)">
            <rect x="0" y="0" width="122" height="70" fill="none" />
            <text x="50%" y="25" text-anchor="middle" font-size="17" fill="rgba(235, 235, 245, 0.6)">Verbraucher</text>
            <text x="50%" y="46" text-anchor="middle" font-size="17" fill="rgb(255, 255, 255)">{data?.consumer} {data?.consumer_unit}</text>
          </g>
        </g>

        <g transform="translate(0, 60.9105)">
          <g transform="translate(-105, 10)">
            <rect x="0" y="0" width="122" height="70" fill="none" />
            <text x="50%" y="25" text-anchor="middle" font-size="17" fill="rgb(255, 255, 255)">{data?.residual} {data?.residual_unit}</text>
            <text x="50%" y="46" text-anchor="middle" font-size="17" fill="rgba(235, 235, 245, 0.6)">Fluss Total</text>
          </g>
          <g transform="translate(25, 70)">
            <circle cx="36" cy="36" r="34.5" fill="rgba(28,28,30,0.64)" stroke={data?.residual == 0 ? c_neutral : c_off} stroke-width="3" />
            <g transform="translate(20, 20) scale(1.2)">
              <path fill="rgb(235, 235, 245)" d="M14.703.542a.512.512 0 00-.61.159l-10 13.44a.466.466 0 00-.038.5c.085.158.257.26.445.26h7.376l-1.864 8.055a.476.476 0 00.284.543.51.51 0 00.61-.16l10-13.44a.464.464 0 00.038-.497.502.502 0 00-.445-.262h-7.377l1.865-8.056a.476.476 0 00-.284-.542z" clip-rule="evenodd" />
            </g>
          </g>
        </g>
      </svg>

      <div className="w-full flex justify-between">
        <div>
          <Moment fromNow>{lastupdate}</Moment>
        </div>
        <div>
          {
            callState != 200 ?
              <div className="relative inline-flex">
                <div className="w-5 h-5 rounded-full bg-red-400"></div>
                <div className="w-5 h-5 rounded-full bg-red-400 absolute top-0 left-0 animate-ping"></div>
                <div className="w-5 h-5 rounded-full bg-red-400 absolute top-0 left-0 animate-pulse"></div>
              </div> :
              <div className="relative inline-flex">
                <div className="w-5 h-5 rounded-full" style={{ background: isWithinTimeLimit() ? c_on : c_off }}></div>
                <div className="w-5 h-5 rounded-full absolute top-0 left-0 animate-ping" style={{ background: isWithinTimeLimit() ? c_on : c_off }}></div>
                <div className="w-5 h-5 rounded-full absolute top-0 left-0 animate-pulse" style={{ background: isWithinTimeLimit() ? c_on : c_off }}></div>
              </div>
          }

        </div>
      </div>

    </div>
  );
}

export default FlowDiagramm;
