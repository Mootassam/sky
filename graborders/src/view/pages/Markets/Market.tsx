import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import selectors from 'src/modules/vip/list/vipListSelectors';
import styled from "styled-components";
import Vipactions from "src/modules/vip/list/vipListActions";
import selector from "src/modules/vip/list/vipListSelectors";
import LoadingModal from "src/shared/LoadingModal";
import authSelectors from "src/modules/auth/authSelectors";
import actions from "src/modules/auth/authActions";
import listactions from "src/modules/company/list/companyListActions";
import selectors from "src/modules/company/list/companyListSelectors";
import { ReactSmartScroller } from 'react-smart-scroller'

function Market() {
  const MarketContainer = styled.div`
    top: 0;
    background-color: rgb(0, 0, 29, 1);
    with: 100dvw;
    width: 100%;
    height: auto;
    position: absolute;
    left: 0;
  `;

  const dispatch = useDispatch();
  const record = useSelector(selector.selectRows);
  const logorecord = useSelector(selectors.selectRows);
  const loadingImage = useSelector(selectors?.selectLoading);
  const [timemodal, setBigModal] = useState(true);
  const loading = useSelector(selector.selectLoading);
  const [Modal, setShowModal] = useState(false);
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const searchAllCoins = async () => {};
  interface DataItem {
    image: string;
    title: string;
    Entrylimit: string;
    levellimit: string;
    dailyorder: string;
    comisionrate: string;
  }
  const [selectedItem, setItems] = useState<DataItem | null>(null);

  const currentDate = () => {
    const californiaTimezone = "America/Los_Angeles"; // Timezone for California
    const options = { timeZone: californiaTimezone };
    const currentDateTime = new Date().toLocaleString("en-US", options);
    return currentDateTime;
  };

  const dolistCompany = () => {
    dispatch(listactions.doFetch());
  };

  useEffect(() => {
    dolistCompany();
    searchAllCoins();
    dispatch(Vipactions.doFetch());
    currentDate();

    // eslint-disable-next-line
  }, [dispatch]);

  const hideModal = () => {
    setShowModal(false);
  };

  const showModal = (item) => {
    setItems(item);
    setShowModal(true);
  };

  const button__action = [
    {
      icon: "fa-solid fa-headphones",
      text: "Services",
      link: "/Online",
    },
    {
      icon: "fa-solid fa-calendar",
      text: "Events",
      link: "/events",
    },
    {
      icon: "fa-regular fa-building",
      text: "About",
      link: "/company",
    },
    {
      icon: "fa-solid fa-file-contract",
      text: "T&C",
      link: "/tc",
    },
    {
      icon: "fa fa-certificate",
      text: "Certificate",
      link: "/Certificate",
    },
    {
      icon: "fa-solid fa-question",
      text: "FAQs",
      link: "/faqs",
    },
  ];

  const submit = (item) => {
    const data = {
      vip: item,
    };
    dispatch(actions.doUpdateProfileMobile(data));
  };

  const NewsTicker = ({ text }) => {
    return (
      <div className="news-ticker-container">
        <div className="news-ticker">
          <span>{text}</span>
        </div>
      </div>
    );
  };

  const [currentImage, setCurrentImage] = useState(0);
  const images = ["https://koozaimarketing.com/member/assets/images/01.gif"];

  useEffect(() => {});

  return (
    <MarketContainer>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="advertise__header">
          <video
            className="w-full h-full"
            autoPlay
            loop
            playsInline
            style={{ zIndex: 1, width: "100%" }}
          >
            <source src="/video/gtb2.mp4" type="video/mp4" />
          </video>

          <div className="advertise__profile">
            <div className="welcome">
              {" "}
              <img src="/images/user.png" alt="" className="user__png" />{" "}
              <b> Hi, {currentUser.fullName} </b> Welcome Back 👏{" "}
            </div>
            <div>
              <Link to="/profile">
                <img src="/images/circle.png" alt="" className="user__png" />
              </Link>
            </div>
          </div>
        </div>
        <div className="home__section">
          <div className="advertise__speaker">
            <div>
              <i className="fa-solid fa-volume-off speaker"></i>
            </div>

            <div className="marquee">
              <span>
              Dear users,the GTB platform is back to the best and normal,continue to earn as much as you can from the platform
              </span>
            </div>
            <NewsTicker text="" />
          </div>

          <div className="advertise__buttons">
            <Link
              to="/online"
              className="button__deposit"
              style={{ textDecoration: "none" }}
            >
              <div>Deposit</div>
            </Link>
            <Link
              to="/withdraw"
              className="button__withdraw"
              style={{ textDecoration: "none" }}
            >
              Withdraw
            </Link>
          </div>
          <div className="adverstise__actions">
            {button__action.map((item) => (
              <Link to={item.link} className="remove__ligne">
                <div className="button__action">
                  <div className="action__cirlce">
                    <i className={`${item.icon} icon__action`}></i>
                  </div>
                  <label htmlFor="" className="action__label">
                    {item.text}
                  </label>
                </div>
              </Link>
            ))}
          </div>

          <div className="advertise__content">
            <div className="content__header">
              <h3 className="halls">Employee level</h3>
              {loading && <LoadingModal />}
              {!loading && record && (
                <div className="content__vip">
                  {record?.map((item, index) => (
                    <div
                      className="vip"
                      onClick={() => showModal(item)}
                      key={index}
                    >
                      {currentUser?.vip?.id === item.id ? (
                        <div className="success__vip"></div>
                      ) : (
                        <div className="subscribe__"></div>
                      )}
                      <div className="vip__image">
                        <img
                          src={item?.photo[0]?.downloadUrl}
                          alt="Vip__image"
                          className="vip__level"
                        />
                      </div>
                      <div className="vip__text">
                        <div className="vip__title">{item?.title}</div>
                        <div className="vip__price">USD {item?.levellimit}</div>
                        <div className="vip__details">
                          <div>
                            <strong>● </strong>
                            {item.comisionrate}% commission per data
                          </div>
                          <div>
                            <strong>● </strong>
                            {item.commissionmergedata}% commission for merge
                            data
                          </div>
                          <div>
                            <strong>● </strong>
                            Limited to {item.tasksperday} data per set,{" "}
                            {item?.setperday} sets of data everyday
                          </div>
                          <div>
                            <strong>● </strong>
                            {item?.withdrawperday} times of withdrawal
                          </div>
                          <div>
                            <strong>● </strong>
                            {item?.handlingfee}% handling fee
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="content__footer"></div>
          </div>
        </div>
        {selectedItem && Modal && (
          <div className="modal__grap">
            <div className="modal__product">
              <div className="single__product">
                <div className="single__header">{selectedItem?.title}</div>

                <div className="order__time">
                  <div style={{ fontSize: 20 }}>
                    Level Limit: {selectedItem?.levellimit}
                  </div>
                  <div style={{ fontSize: 20 }}>
                    Data per set: {selectedItem?.dailyorder}
                  </div>
                  <div style={{ fontSize: 20 }}>
                    Commission Rate: {selectedItem?.comisionrate}%
                  </div>
                </div>
                <div className="badge__ pending">
                  <label>Pending</label>
                </div>

                <div className="bottom__submit">
                  <div className="submit__ligne"></div>
                  <div className="sumbit__buttons">
                    <div
                      className="cancel__product"
                      onClick={() => hideModal()}
                    >
                      Cancel
                    </div>
                    <div
                      className="submit__product"
                      onClick={() => submit(selectedItem)}
                    >
                      Upgrage
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* 
      {timemodal && (
        <div className="big__modal">
          <div className="modal__time">
            {logorecord.map((item) => (
              <>
                <span className="modal__companyname">{item.name}</span>
                {!loadingImage && item?.photo[0]?.downloadUrl && (
                  <img
                    src={item?.photo[0]?.downloadUrl}
                    alt=""
                    style={{ width: 190, height: 100 }}
                  />
                )}
                {!loadingImage && !item?.photo[0]?.downloadUrl && (
                  <img
                    src="/images/invitation/logo.png"
                    alt=""
                    className="invitation__"
                  />
                )}
              </>
            ))}
            <div className="time__">
              Each time user completed a set of optimisation tasks, they can
              immedialy approch the platform's customer serivice to receive a
              random bonus
            </div>
            <div className="close" onClick={() => setBigModal(!timemodal)}>
              <i className="fa fa-close closa" />
            </div>
          </div>
        </div>
      )} */}
      </div>
    </MarketContainer>
  );
}

export default Market;
