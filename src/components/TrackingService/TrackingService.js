import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { TrackingContext } from "../TrackingContext";
import { Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckFast, faCartPlus, faCheckSquare, faHandshake } from "@fortawesome/free-solid-svg-icons";
import './TrackingService.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import feedBack from "../../assets/feedback.svg";

function TrackingService() {

    const { t, i18n } = useTranslation();
    const { trackingNumber } = useContext(TrackingContext);
    const [shipmentDetails, setShipmentDetails] = useState([]);
    const [promisedShipmentDate, setPromisedShipmentDate] = useState([]);
    const [currentStatus, setCurrentStatus] = useState([]);

    useEffect(() => {
        if (trackingNumber) {

            fetch(`https://tracking.bosta.co/shipments/track/${trackingNumber}`)
                .then((response) => response.json())
                .then((data) => {
                    // Update the shipment data state with the API response
                    setPromisedShipmentDate(data.PromisedDate)
                    setCurrentStatus(data.CurrentStatus);
                    setShipmentDetails(data.TransitEvents);
                })
                .catch((error) => {
                    console.log("Error fetching shipment data:", error);
                });
        }
    }, [trackingNumber]);

    // function for changing date and time format
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const day = date.toLocaleDateString(undefined, { day: "numeric" });
        const month = date.toLocaleDateString(undefined, { month: "numeric" });
        const year = date.toLocaleDateString(undefined, { year: "numeric" });
        const formattedTime = date.toLocaleTimeString([], {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        });
        const formattedDay = date.toLocaleDateString(undefined, { weekday: "long" });

        return {
            day: day,
            month: t(month),
            year: year,
            date: day + '/' + month + '/' + year,
            time: formattedTime,
            dayOfWeek: t(formattedDay),
        };
    };

    const lastUpdateDic = formatTimestamp(currentStatus.timestamp);
    const promisedDateDic = formatTimestamp(promisedShipmentDate);

    const Step = ({ icon, text, isActive }) => (
        <div className={`step ${isActive ? 'active' : ''}`}>
            <span className="icon" style={{ backgroundColor: (isActive) ? ((currentStatus.state === 'DELIVERED' || currentStatus.state === 'DELIVERED_TO_SENDER') ? '#198754' : (currentStatus.state === 'CANCELLED') ? '#e20a1a' : '#ffc107') : '#ddd' }}>
                <FontAwesomeIcon icon={icon} style={{ color: 'white' }} flip={(i18n.language === 'ar') ? "horizontal" : false} />
            </span>
            <span className="text">{text}</span>
        </div>
    );

    const StatesDic = {
        "DELIVERED_TO_SENDER":3,
        "DELIVERED":3,
        "TICKET_CREATED":0,
        "CREATED":0,
        "PACKAGE_RECEIVED":1,
        "IN_TRANSIT":2,
        "NOT_YET_SHIPPED": 0,
        "CANCELLED": 0
    }

    return (
        <>
            <div className="card" dir={(i18n.language === 'ar' ? "rtl" : "ltr")}>
                <div className="card-body row">

                    <div className="col"> <p>{t('trackingNumber')} {trackingNumber}</p>
                        <strong style={{ color: (currentStatus.state === 'DELIVERED' || currentStatus.state === 'DELIVERED_TO_SENDER') ? '#198754' : (currentStatus.state === 'CANCELLED') ? '#e20a1a' : '#ffc107' }}>{t(currentStatus.state)}</strong> </div>
                    <div className="col"> <p>{t('lastUpdate')}</p><strong>{lastUpdateDic.time + ' ' + lastUpdateDic.date + ' ' + lastUpdateDic.dayOfWeek}</strong> </div>
                    <div className="col"> <p>{t('merchantName')}</p><strong>BLUEDART, </strong>  </div>
                    <div className="col"> <p>{t('promisedDate')}</p><strong>{promisedDateDic.day + ' ' + promisedDateDic.month + ' ' + promisedDateDic.year}</strong>  </div>

                </div>
                <hr></hr>
                <div>

                    <div className="track" style={{ position: "relative" }}>
                        
                        <div style={{ width: "75%", backgroundColor: "#ddd", position: "absolute", height: "7px", top: "18px", left:"13%" }}> </div>
                        <div style={{ width: `${StatesDic[currentStatus.state] * 25}%` , backgroundColor: (currentStatus.state === 'DELIVERED' || currentStatus.state === 'DELIVERED_TO_SENDER') ? '#198754' : (currentStatus.state === 'CANCELLED') ? '#e20a1a' : '#ffc107', position: "absolute", height: "7px", top: "18px", left:"13%" }}> </div>

                        <Step icon={faCartPlus} text={t('created')} isActive={StatesDic[currentStatus.state]>=0} />
                        <Step icon={faHandshake} text={t('shippmentRecivedFromMerchant')} isActive={StatesDic[currentStatus.state]>=1} />
                        <Step icon={faTruckFast} text={t('shippmentOnTheWay')} isActive={StatesDic[currentStatus.state]>=2} />
                        <Step icon={faCheckSquare} text={t('Deleviered')} isActive={StatesDic[currentStatus.state]===3} />

                    </div>

                </div>

            </div>
            <div className="cardBody" >

                <div className="col shippmentDetails">

                    <p dir={(i18n.language === 'ar' ? "rtl" : "ltr")} style={{ width: "80%", color: "black" }}>
                        {t('address')}
                    </p>

                    <div className="card2" style={{ backgroundColor: "#ddd" }} dir={(i18n.language === 'ar' ? "rtl" : "ltr")}>
                        امبابه شارع طلعت حرب مدينه العمال بجوار البرنس منزل 17 بلوك 22
                    </div>

                    <div className="card2" >

                        <div style={{ margin: "auto", width: "max-content" }} dir={(i18n.language === 'ar' ? "rtl" : "ltr")}>

                            <strong>
                                {t('anyProblem?')}
                            </strong>

                            <br></br>

                            <Button variant="danger" style={{ width: "max-content", borderRadius: "0.80rem" }}>
                                {t('reportAProblem')}
                            </Button>
                        </div>

                        <div className="image-container">
                            <img src={feedBack} alt="feedBack" style={{ maxWidth: "auto", maxHeight: "auto" }}></img>
                        </div>

                    </div>

                </div>

                <div className=" col shippmentDetails table-responsive" dir={(i18n.language === 'ar' ? "rtl" : "ltr")}>

                    <p style={{ color: "black" }}>{t('shippmentDetails')}</p>

                    {shipmentDetails && shipmentDetails.length > 0 ? (
                        <Table className="table">

                            <thead >
                                <tr className="tableHeader">
                                    <th scope="col" style={{ borderTopRightRadius: "0.3 rem" }}>{t('branch')}</th>
                                    <th scope="col">{t('date')}</th>
                                    <th scope="col">{t('time')}</th>
                                    <th scope="col" style={{ borderTopLeftRadius: "0.3 rem" }}>{t('details')}</th>
                                </tr>
                            </thead>

                            <tbody>

                                {shipmentDetails.map((event, index) => (
                                    <tr key={index}>
                                        <td>{(event.hub && event.hub.length > 0 ? event.hub : t('noData'))}</td>
                                        <td>{formatTimestamp(event.timestamp).date}</td>
                                        <td>{formatTimestamp(event.timestamp).time}</td>
                                        <td>{t(event.state)}</td>
                                    </tr>
                                ))}

                            </tbody>

                        </Table>
                    ) : (
                        <p>No shipment data available</p>
                    )}

                </div>

            </div>


        </>
    );
}

export default TrackingService