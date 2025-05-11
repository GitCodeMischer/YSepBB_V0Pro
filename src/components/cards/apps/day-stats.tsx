import { author } from "@/constants/strings";
import CardTitle from "@/shared/components/titles/card-title";
import Image from "next/image";
import { useEffect, useState } from "react";

function DayStatsCard() {
  let timer: string | number | NodeJS.Timeout | undefined;

  const [daydatasets, setData] = useState<any[]>([
    {
      battery: {
        in: {
          value: 0,
          unit: "W"
        },
        out: {
          value: 0,
          unit: "W"
        }
      }
    },
    {
      consumption: {
        value: 0,
        unit: "W"
      }
    },
    {
      powergrid: {
        in: {
          value: 0,
          unit: "W"
        },
        out: {
          value: 0,
          unit: "W"
        }
      }
    },
    {
      pvroof: {
        value: 0,
        unit: "W",
        selfconsumed: {
          selfconsumption: 0,
          selfconsumption_unit: "W"
        }
      }
    },
    {
      load: {
        value: 0,
        unit: "W"
      }
    }
  ])

  const fetchData = async () => {
    var accessToken = localStorage.getItem("access_token");

    try {

      const date = new Date()

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;

      var payloaddata = {
        Date: formattedDate,
        PodId: "16931",
        DeviceTimeOffset: 1,
        ExtractionType: 0,
        LanguageId: "",
        CountryId: "",
        IsMobile: true
      }

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(payloaddata)
      };

      const response = await fetch('https://api-service.regalgrid.com/Api_System/api/SystemData/SummaryData', requestOptions);

      const ds = await response.json();

      console.log(ds);

      var daydatasets = [
        {
          pvroof: {
            title: "PV Dach",
            value: ds.PV,
            unit: ds.PVUnit,
            selfconsumed: {
              selfconsumption: ds.SelfConsumption,
              selfconsumption_unit: ds.SelfConsumptionUnit
            }
          }
        },
        {
          battery: {
            title: "Batterie",
            in: {
              value: ds.BatteryIn,
              unit: ds.BatteryInUnit
            },
            out: {
              value: ds.BatteryOut,
              unit: ds.BatteryOutUnit
            }
          }
        },
        {
          powergrid: {
            title: "Netz",
            in: {
              value: ds.GridIn,
              unit: ds.GridInUnit
            },
            out: {
              value: ds.GridOut,
              unit: ds.GridOutUnit
            }
          }
        },
        {
          consumption: {
            title: "Verbrauch",
            value: ds.Consumption,
            unit: ds.ConsumptionUnit,
            load: {
              title: "Verbrauch durchschnitt",
              value: ds.LoadAverage,
              unit: ds.LoadUnit
            }
          }
        }
      ];

      setData(daydatasets);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();

    timer = window.setInterval(() => {
      fetchData();
    }, (5 * 60 * 1000));
    return () => {
      clearInterval(timer)
    }
  }, []);

  return (
    <>
      {daydatasets.map((cardData, index) => (
        <div key={index} className={"flex flex-col w-full h-full bg-white dark:bg-dark border border-neutral-400/20 dark:border-neutral-600/10 rounded-3xl p-6 items-start justify-between col-span-3 md:col-span-3"}>
          <div className="flex flex-row w-full">
            <div className="flex flex-col flex-grow">
              <CardTitle title={cardData[Object.keys(cardData)[0]]?.title} />
            </div>
            <div className="px-3 py-2 bg-teal-100/40 dark:bg-slate-500/20 rounded-full">
              <Image
                className="hidden 2xs:block"
                src="/me/ctlabs-logo.png"
                alt={author}
                width={40}
                height={50}
              />
            </div>
          </div>

          <div style={{ margin: "auto" }}>
            <div style={{ border: "0px solid black", display: "flex", flexBasis: "auto", flexShrink: "0", margin: "0px", minHeight: "0px", minWidth: "0px", padding: "0px", position: "relative", zIndex: "0", alignItems: "center", flexDirection: "column", justifyContent: "center" }}>
              <svg fill="rgba(120,120,128,0.36)" viewBox="0 0 140 140" clip-path="url(#rectClipperWb-953819)" style={{ borderColor: "rgba(120, 120, 128, 0.36)", borderRadius: "50%", borderWidth: "4px", height: "140px", marginBottom: "32px", marginTop: "34px", width: "140px", alignItems: "center", flexDirection: "row", justifyContent: "center" }}>
                <circle cx="70" cy="70" r="70" clip-path="url(#circleClipperWb-953819)">
                </circle>
                <clipPath id="rectClipperWb-953819">
                  <path d="M0 0 h140 v140 h-140 M58 140 h24 v-24 h-24"></path>
                </clipPath>
                <clipPath id="circleClipperWb-953819">
                  <path d="M0 0 h140 v140 h-140  M4 70 a 66,66 0 1,0 132,0  a 66,66 0 1,0 -132,0">
                  </path>
                </clipPath>
              </svg>

              {
                Object.keys(cardData)[0] == 'pvroof' ?
                  <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" style={{ inset: "auto", fill: "rgb(105, 195, 80)", height: "35px", width: "34px", position: "absolute" }} viewBox="0 0 612.002 612.002" >
                    <g id="SVGRepo_bgCarrier" stroke-width="0">
                    </g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
                    </g>
                    <g id="SVGRepo_iconCarrier">
                      <g>
                        <g>
                          <path d="M611.567,370.172c-15.485-104.763-30.977-209.528-46.472-314.286c-3.239-21.938-21.6-38.483-42.711-38.483H89.621 c-21.104,0-39.467,16.539-42.715,38.477l-8.119,54.91c-12.779,86.46-25.56,172.921-38.351,259.374 c-1.698,11.465,1.61,23,9.075,31.651c7.806,9.046,19.478,14.233,32.024,14.233h86.416l81.462,84.521h-44.902 c-6.075,0-11.35,4.708-12.265,10.942l-10.309,69.7c-0.489,3.356,0.492,6.735,2.686,9.268c2.265,2.62,5.628,4.121,9.224,4.121 h304.305c3.605,0,6.971-1.506,9.238-4.133c2.19-2.54,3.165-5.919,2.668-9.279l-10.3-69.652 c-0.908-6.25-6.181-10.966-12.265-10.966h-44.903l81.46-84.521h86.415c12.543,0,24.216-5.187,32.022-14.232 C609.953,393.166,613.263,381.633,611.567,370.172z M308.865,500.569h-5.722l-81.46-84.521h168.639L308.865,500.569z M52.305,365.435c12.192-82.413,24.374-164.828,36.556-247.243l7.414-50.175h419.452c14.66,99.139,29.318,198.279,43.974,297.418 H52.305z">
                          </path>
                          <polygon points="356.566,96.844 252.065,96.844 248.42,201.915 360.211,201.915 ">
                          </polygon>
                          <path d="M388.532,229.269l3.643,105.065h123.039c-5.178-35.023-10.36-70.042-15.534-105.065L388.532,229.269L388.532,229.269z">
                          </path>
                          <polygon points="247.472,229.269 243.831,334.335 364.806,334.335 361.159,229.269 ">
                          </polygon>
                          <path d="M480.101,96.844h-96.167l3.647,105.071h108.053C490.459,166.888,485.279,131.867,480.101,96.844z"></path>
                          <path d="M119.984,154.651c-2.324,15.756-4.655,31.51-6.98,47.264h108.049l3.645-105.071h-96.162L119.984,154.651z"></path>
                          <path d="M93.418,334.335h123.039l3.648-105.065H108.952C103.778,264.292,98.6,299.312,93.418,334.335z"></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                  : ''
              }

              {
                Object.keys(cardData)[0] == 'battery' ?
                  <svg viewBox="0 0 20 24" xmlns="http://www.w3.org/2000/svg" style={{ inset: "auto", fill: "rgb(105, 195, 80)", height: "48px", width: "48px", position: "absolute" }}>
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M21 10C21.5523 10 22 10.4477 22 11V13C22 13.5523 21.5523 14 21 14C20.4477 14 20 13.5523 20 13V11C20 10.4477 20.4477 10 21 10Z" fill="rgb(105, 195, 80)"></path>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.4474 13.8944C6.95342 14.1414 6.35274 13.9412 6.10576 13.4472L5.10576 11.4472C4.85877 10.9532 5.05899 10.3525 5.55297 10.1055C6.04695 9.85855 6.64762 10.0588 6.89461 10.5528L7.89461 12.5528C8.1416 13.0467 7.94137 13.6474 7.4474 13.8944ZM6.93417 7C6.95604 7 6.97799 7 7 7L14.0658 7C14.9523 6.99995 15.7161 6.99991 16.3278 7.08215C16.9833 7.17028 17.6117 7.36902 18.1213 7.87868C18.631 8.38835 18.8297 9.0167 18.9179 9.67221C19.0001 10.2839 19.0001 11.0477 19 11.9342V12.0658C19.0001 12.9523 19.0001 13.7161 18.9179 14.3278C18.8297 14.9833 18.631 15.6117 18.1213 16.1213C17.6117 16.631 16.9833 16.8297 16.3278 16.9179C15.7161 17.0001 14.9523 17.0001 14.0658 17H6.93417C6.04769 17.0001 5.28387 17.0001 4.67221 16.9179C4.0167 16.8297 3.38835 16.631 2.87868 16.1213C2.36902 15.6117 2.17028 14.9833 2.08215 14.3278C1.99991 13.7161 1.99995 12.9523 2 12.0658C2 12.044 2 12.022 2 12C2 11.978 2 11.956 2 11.9342C1.99995 11.0477 1.99991 10.2839 2.08215 9.67221C2.17028 9.0167 2.36902 8.38835 2.87868 7.87868C3.38835 7.36902 4.0167 7.17028 4.67221 7.08215C5.28387 6.99991 6.04769 6.99995 6.93417 7Z" fill="rgb(105, 195, 80)"></path>
                    </g>
                  </svg>
                  : ''
              }

              {
                Object.keys(cardData)[0] == 'powergrid' ?
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ inset: "auto", fill: "rgb(105, 195, 80)", height: "48px", width: "48px", position: "absolute" }}>
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <g>
                        <g>
                          <path d="M469.335,273.067h-17.067V256h17.067c4.233,0,7.825-3.106,8.44-7.296c0.623-4.19-1.929-8.192-5.99-9.412l-164.582-49.374 v-84.582l103.996,31.198h-86.929c-4.719,0-8.533,3.823-8.533,8.533c0,4.71,3.814,8.533,8.533,8.533h110.933v17.067h-17.067 c-4.719,0-8.533,3.823-8.533,8.533s3.814,8.533,8.533,8.533h51.2c4.719,0,8.533-3.823,8.533-8.533s-3.814-8.533-8.533-8.533 h-17.067V153.6h17.067c4.233,0,7.825-3.106,8.44-7.296c0.623-4.19-1.929-8.192-5.99-9.412l-167.1-50.133L264.373,4.77 c-1.425-2.901-4.369-4.753-7.603-4.77h-0.06c-3.209,0-6.153,1.801-7.612,4.668l-43.375,85.333 c-0.043,0.094-0.026,0.188-0.068,0.282c-0.247,0.512-0.316,1.075-0.461,1.63c-0.137,0.555-0.316,1.101-0.333,1.664 c0,0.102-0.06,0.188-0.06,0.29v42.667H101.923l88.218-25.95c4.523-1.323,7.108-6.067,5.777-10.59 c-1.323-4.514-6.042-7.117-10.59-5.786L40.262,136.875c-4.07,1.203-6.647,5.205-6.042,9.412c0.606,4.198,4.207,7.313,8.448,7.313 h17.067v17.067H42.668c-4.719,0-8.533,3.823-8.533,8.533s3.814,8.533,8.533,8.533h51.2c4.719,0,8.533-3.823,8.533-8.533 s-3.814-8.533-8.533-8.533H76.801V153.6h128v85.333H101.923l88.218-25.95c4.523-1.323,7.108-6.067,5.777-10.59 c-1.323-4.514-6.042-7.108-10.59-5.786L40.262,239.275c-4.07,1.203-6.647,5.205-6.042,9.412c0.606,4.198,4.207,7.313,8.448,7.313 h17.067v17.067H42.668c-4.719,0-8.533,3.823-8.533,8.533s3.814,8.533,8.533,8.533h51.2c4.719,0,8.533-3.823,8.533-8.533 s-3.814-8.533-8.533-8.533H76.801V256H202.02l-63.394,221.867h-27.691c-4.719,0-8.533,3.823-8.533,8.533v17.067 c0,4.71,3.814,8.533,8.533,8.533s8.533-3.823,8.533-8.533v-8.533h25.583h0.026h221.824h0.026h25.609v8.533 c0,4.71,3.814,8.533,8.533,8.533s8.533-3.823,8.533-8.533V486.4c0-4.71-3.814-8.533-8.533-8.533h-27.691l-66.176-231.595v-38.537 l103.996,31.198h-86.929c-4.719,0-8.533,3.823-8.533,8.533s3.814,8.533,8.533,8.533h110.933v17.067h-17.067 c-4.719,0-8.533,3.823-8.533,8.533s3.814,8.533,8.533,8.533h51.2c4.719,0,8.533-3.823,8.533-8.533 S474.054,273.067,469.335,273.067z M156.383,477.867l27.887-97.587l55.842,35.524l-59.52,37.879 c-3.977,2.526-5.146,7.808-2.62,11.785c1.63,2.551,4.386,3.951,7.211,3.951c1.57,0,3.149-0.427,4.574-1.34l66.244-42.155 l81.621,51.942H156.383z M352.556,467.132L189.16,363.153l19.43-68.019l31.932,21.086l-31.889,21.052 c-3.934,2.594-5.018,7.893-2.415,11.827c1.63,2.483,4.352,3.823,7.125,3.823c1.613,0,3.251-0.452,4.693-1.408l37.965-25.071 l61.116,40.354l-40.277,25.634c-3.968,2.534-5.146,7.799-2.611,11.784c1.621,2.552,4.386,3.951,7.211,3.951 c1.562,0,3.149-0.435,4.574-1.34l41.719-26.547L352.556,467.132z M318.261,347.102l-57.515-37.973 c-0.009-0.009-0.017-0.017-0.034-0.026l-47.198-31.172L219.777,256h53.291c4.719,0,8.533-3.823,8.533-8.533 s-3.814-8.533-8.533-8.533h-51.2V204.8h51.2c4.719,0,8.533-3.823,8.533-8.533s-3.814-8.533-8.533-8.533h-51.2V153.6h51.2 c4.719,0,8.533-3.823,8.533-8.533c0-4.71-3.814-8.533-8.533-8.533h-51.2V102.4h42.667c4.719,0,8.533-3.823,8.533-8.533 c0-4.71-3.814-8.533-8.533-8.533h-37.291l29.338-57.719l33.553,68.241v151.612c0,0.794,0.111,1.579,0.324,2.347l8.038,28.117 l-21.299,14.063c-3.934,2.594-5.009,7.893-2.415,11.819c1.638,2.492,4.361,3.831,7.125,3.831c1.621,0,3.251-0.452,4.693-1.408 l16.811-11.102L318.261,347.102z">
                          </path>
                        </g>
                      </g>
                    </g>
                  </svg>
                  : ''
              }

              {
                Object.keys(cardData)[0] == 'consumption' ?
                  <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" style={{ inset: "auto", fill: "rgb(105, 195, 80)", height: "48px", width: "48px", position: "absolute" }}>
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <title>ionicons-v5-i</title>
                      <path d="M261.56,101.28a8,8,0,0,0-11.06,0L66.4,277.15a8,8,0,0,0-2.47,5.79L63.9,448a32,32,0,0,0,32,32H192a16,16,0,0,0,16-16V328a8,8,0,0,1,8-8h80a8,8,0,0,1,8,8l0,136a16,16,0,0,0,16,16h96.06a32,32,0,0,0,32-32l0-165.06a8,8,0,0,0-2.47-5.79Z"></path>
                      <path d="M490.91,244.15l-74.8-71.56,0-108.59a16,16,0,0,0-16-16h-48a16,16,0,0,0-16,16l0,32L278.19,40.62C272.77,35.14,264.71,32,256,32h0c-8.68,0-16.72,3.14-22.14,8.63L21.16,244.13c-6.22,6-7,15.87-1.34,22.37A16,16,0,0,0,43,267.56L250.5,69.28a8,8,0,0,1,11.06,0L469.08,267.56a16,16,0,0,0,22.59-.44C497.81,260.76,497.3,250.26,490.91,244.15Z"></path>
                    </g>
                  </svg>
                  : ''
              }

              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ inset: "auto auto 22px", fill: "rgba(120, 120, 128, 0.36)", height: "24px", width: "24px", position: "absolute" }}>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M19.604.722a.683.683 0 00-.813.213L5.458 18.855a.621.621 0 00-.051.665.673.673 0 00.593.347h9.835l-2.485 10.74c-.07.298.089.601.378.725a.68.68 0 00.814-.212L27.875 13.2a.619.619 0 00.05-.665.67.67 0 00-.593-.348h-9.836l2.487-10.742a.634.634 0 00-.379-.723z">
                </path>
              </svg>
            </div>
          </div>

          {/* Data */}

          <div className="border-0 flex flex-col items-center justify-center" style={{ margin: "auto" }}>
            <div className="flex flex-wrap justify-center w-full">

              {
                Object.keys(cardData)[0] == 'pvroof' ?
                  <div className="w-full sm:w-1/2 lg:w-1/2 xl:w-1/2 p-4">
                    <div className="text-white font-extrabold text-2xl">{cardData[Object.keys(cardData)[0]]?.value}<span className="text-sm font-semibold"> {cardData[Object.keys(cardData)[0]]?.unit}</span></div>
                    <div className="text-gray-400 mt-2">PV Erzeugt</div>
                  </div>
                  : ''
              }

              {
                Object.keys(cardData)[0] == 'pvroof' ?
                  <div className="w-full sm:w-1/2 lg:w-1/2 xl:w-1/2 p-4">
                    <div className="text-white font-extrabold text-2xl">{cardData[Object.keys(cardData)[0]]?.selfconsumed?.selfconsumption}<span className="text-sm font-semibold"> {cardData[Object.keys(cardData)[0]]?.selfconsumed?.selfconsumption_unit}</span></div>
                    <div className="text-gray-400 mt-2">PV Stom selbstgenutzt</div>
                  </div>
                  : ''
              }

              {
                Object.keys(cardData)[0] == 'battery' ?
                  <div className="w-full sm:w-1/2 lg:w-1/2 xl:w-1/2 p-4">
                    <div className="text-white font-extrabold text-2xl">{cardData[Object.keys(cardData)[0]]?.in?.value}<span className="text-sm font-semibold"> {cardData[Object.keys(cardData)[0]]?.in?.unit}</span></div>
                    <div className="text-gray-400 mt-2">Batterie Geladen</div>
                  </div>
                  : ''
              }

              {
                Object.keys(cardData)[0] == 'battery' ?
                  < div className="w-full sm:w-1/2 lg:w-1/2 xl:w-1/2 p-4">
                    <div className="text-white font-extrabold text-2xl">{cardData[Object.keys(cardData)[0]]?.out?.value}<span className="text-sm font-semibold"> {cardData[Object.keys(cardData)[0]]?.out?.unit}</span></div>
                    <div className="text-gray-400 mt-2">Batterie Entladen</div>
                  </div>
                  : ''
              }

              {
                Object.keys(cardData)[0] == 'powergrid' ?
                  < div className="w-full sm:w-1/2 lg:w-1/2 xl:w-1/2 p-4">
                    <div className="text-white font-extrabold text-2xl">{cardData[Object.keys(cardData)[0]]?.in?.value}<span className="text-sm font-semibold"> {cardData[Object.keys(cardData)[0]]?.in?.unit}</span></div>
                    <div className="text-gray-400 mt-2">Netz Konsumiert</div>
                  </div>
                  : ''
              }

              {
                Object.keys(cardData)[0] == 'powergrid' ?
                  < div className="w-full sm:w-1/2 lg:w-1/2 xl:w-1/2 p-4">
                    <div className="text-white font-extrabold text-2xl">{cardData[Object.keys(cardData)[0]]?.out?.value}<span className="text-sm font-semibold"> {cardData[Object.keys(cardData)[0]]?.out?.unit}</span></div>
                    <div className="text-gray-400 mt-2">Netz Abgabe</div>
                  </div>
                  : ''
              }

              {
                Object.keys(cardData)[0] == 'consumption' ?
                  < div className="w-full sm:w-1/2 lg:w-1/2 xl:w-1/2 p-4">
                    <div className="text-white font-extrabold text-2xl">{cardData[Object.keys(cardData)[0]]?.value}<span className="text-sm font-semibold"> {cardData[Object.keys(cardData)[0]]?.unit}</span></div>
                    <div className="text-gray-400 mt-2">Verbrauch</div>
                  </div>
                  : ''
              }

              {
                Object.keys(cardData)[0] == 'consumption' ?
                  < div className="w-full sm:w-1/2 lg:w-1/2 xl:w-1/2 p-4">
                    <div className="text-white font-extrabold text-2xl">{cardData[Object.keys(cardData)[0]]?.load?.value}<span className="text-sm font-semibold"> {cardData[Object.keys(cardData)[0]]?.load?.unit}</span></div>
                    <div className="text-gray-400 mt-2">Verbrauch durchschnitt</div>
                  </div>
                  : ''
              }

            </div>
          </div>

        </div >
      ))
      }
    </>
  );
}

export default DayStatsCard