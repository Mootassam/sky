import React, { useState, useEffect, useCallback } from "react";
import "../styles/styles.css";
import { useDispatch, useSelector } from "react-redux";
import authSelectors from "src/modules/auth/authSelectors";
import actions from "src/modules/product/list/productListActions";
import selector from "src/modules/product/list/productListSelectors";
import LoadingModal from "src/shared/LoadingModal";
import Dates from "src/view/shared/utils/Dates";
import recordActions from "src/modules/record/form/recordFormActions";
import recordListAction from "src/modules/record/list/recordListActions";
import recordSelector from "src/modules/record/list/recordListSelectors";
import Image from "src/shared/Images";
import { useHistory } from "react-router-dom";
import authActions from "src/modules/auth/authActions";
import Amount from "src/shared/Amount";
import Header from "src/view/shared/Header";

const Grappage = () => {
  const [randomImage, setRandomImage] = useState("");
  const [randomImage1, setRandomImage1] = useState("");
  const [randomImage2, setRandomImage2] = useState("");
  const [randomImage3, setRandomImage3] = useState("");
  const [randomImage4, setRandomImage4] = useState("");
  const [randomImage5, setRandomImage5] = useState("");
  const [randomImage6, setRandomImage6] = useState("");
  const [randomImage7, setRandomImage7] = useState("");
  const [randomImage8, setRandomImage8] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();
  const record = useSelector(authSelectors.selectCurrentUser);
  const items = useSelector(selector.selectRows);
  const loading = useSelector(selector.selectLoading);
  // const numberRecord = useSelector(recordSelector.selectCount);
  const [showModal, setShowModal] = useState(false);
  const [lodingRoll, setLoadingRoll] = useState(false);
  const selectCountRecord = useSelector(recordSelector.selectCountRecord);


  const error = useSelector(recordSelector.selectError);

  const refreshItems = useCallback(async () => {
    await dispatch(actions.doFetch());
    await dispatch(recordListAction.doFetch());
    await dispatch(authActions.doRefreshCurrentUser());
    await  dispatch(recordListAction.doCountDay());
  }, [dispatch]);

  const displayRandomImage = () => {
    // Function to update the image source
    const updateImage = async () => {
      const randomImage = await Image.randomImages();

      setRandomImage(randomImage);
      // Example: document.getElementById('imageElement').src = randomImage;
    };
    const updateImage1 = async () => {
      const randomImage = await Image.randomImages();

      setRandomImage1(randomImage);
      // Example: document.getElementById('imageElement').src = randomImage;
    };
    const updateImage2 = async () => {
      const randomImage = await Image.randomImages();

      setRandomImage2(randomImage);
      // Example: document.getElementById('imageElement').src = randomImage;
    };
    const updateImage3 = async () => {
      const randomImage = await Image.randomImages();

      setRandomImage3(randomImage);
      // Example: document.getElementById('imageElement').src = randomImage;
    };
    const updateImage4 = async () => {
      const randomImage = await Image.randomImages();

      setRandomImage4(randomImage);
      // Example: document.getElementById('imageElement').src = randomImage;
    };
    const updateImage5 = async () => {
      const randomImage = await Image.randomImages();

      setRandomImage5(randomImage);
      // Example: document.getElementById('imageElement').src = randomImage;
    };
    const updateImage6 = async () => {
      const randomImage = await Image.randomImages();

      setRandomImage6(randomImage);
      // Example: document.getElementById('imageElement').src = randomImage;
    };
    const updateImage7 = async () => {
      const randomImage = await Image.randomImages();

      setRandomImage7(randomImage);
      // Example: document.getElementById('imageElement').src = randomImage;
    };
    const updateImage8 = async () => {
      const randomImage = await Image.randomImages();

      setRandomImage8(randomImage);
      // Example: document.getElementById('imageElement').src = randomImage;
    };

    // Display the first random image immediately
    updateImage();
    updateImage1();
    updateImage2();
    updateImage3();
    updateImage4();
    updateImage5();
    updateImage6();
    updateImage7();

    // Set an interval to change the image every 3 seconds
    setInterval(updateImage, 3000);
    setInterval(updateImage1, 4000);
    setInterval(updateImage2, 2000);
    setInterval(updateImage3, 4000);
    setInterval(updateImage4, 5000);
    setInterval(updateImage5, 2000);
    setInterval(updateImage6, 3000);
    setInterval(updateImage7, 4000);
    setInterval(updateImage7, 3000);
  };

  const rollAll = async () => {
    try {
      setLoadingRoll(true);
      await dispatch(recordListAction.doCheck());
      if (error) {
        return;
      }
      await dispatch(actions.doFetch());

      setTimeout(() => {
        setShowModal(true);
      }, 1000);

      setLoadingRoll(false);
    } catch (error) {
      console.log(error);
      // Handle other errors
      setLoadingRoll(false);
    }
  };

  const hideModal = () => {
    setShowModal(false);
  };

  const [number] = useState(Dates.Number());

  useEffect(() => {
    dispatch(recordListAction.doCount());
      dispatch(recordListAction.doCountDay());

    displayRandomImage();
  }, [dispatch]);

  const calcule__total = (price, comission) => {
    const total = (parseFloat(comission) / 100) * parseFloat(price);
    return total.toFixed(3);
  };

  const currentUser = useSelector(authSelectors.selectCurrentUser);

  const submit = async () => {
    const values = {
      number: number,
      product: items?.id,
      status: items?.combo ? "pending" : "completed",
      user: currentUser.id,
    };

    await dispatch(recordActions.doCreate(values));
    setShowModal(false);
    await refreshItems();
  };

  const totalperday = useSelector(recordSelector.selectTotalPerday);


  return (
    <>
      <div className="app__grappage">

        {/* <Header />  */}
        <div className="product__heads">
          <div className="usa__nuaa">
            <img src="/images/user.png" alt="" className="users__png" />
            <b> Hi {currentUser.fullName}</b>👏
          </div>

          <div>
            <b>{currentUser.vip.title} </b>
          </div>
        </div>

        <div className="amounts__group">
        <div className="totals__amount">
          <div className="amount__w">
            <div> 
              <img src="/images/wallet.png" alt=""  className="wallet__s" />
            </div>
            <div className="amounts__">
              <div className="text-black">Total Amount</div>
              <div className="text-xs">Profits will be added here</div>
            </div>
          </div>
          <div className="amounts__">
            <div className="text-sm">{currentUser.balance.toFixed(2)}</div>
            <div className="text-xs">USD</div>
          </div>
        </div>


        <div className="totals__amount">
          <div className="amount__w">
            <div> 
              <img src="/images/T.png" alt=""  className="wallet__s" />
            </div>
            <div className="amounts__">
              <div className="text-black">Today's Commission</div>
              <div className="text-xs">Commission Earned</div>
            </div>
          </div>
          <div className="amounts__">
            <div className="text-sm">{totalperday}</div>
            <div className="text-xs">USD</div>
          </div>
        </div>
        </div>

        <div className="optimization__start">
          <div>Start Optimization</div>
          <div>{currentUser?.tasksDone}/{currentUser?.vip?.dailyorder}</div>
        </div>

        <div className="grap__order">
          <div className="order__top">
            <div className="first__order">
              <div className="vip__title"> {record?.vip?.title}</div>
              <div>
                <label className="vip__commission">Commission Rate: </label>
                <label className="comission">{record?.vip?.comisionrate}</label>
              </div>
            </div>
            <div className="second__order">
              <div>
                <span className="exclusive__channel">
                  Exclusive channel for exclsuive members
                </span>
              </div>
            </div>
          </div>

          <div className="grap__products">
            <div className="list__ofproduct">
              <div className="">
                <img src={randomImage} alt="" />
              </div>
              <div className="">
                <img src={randomImage1} alt="" />
              </div>
              <div className="">
                <img src={randomImage2} alt="" />
              </div>
            </div>
            <div className="list__ofproduct">
              <div className="">
                <img src={randomImage3} alt="" />
              </div>
              <div className="">
                {currentUser.grab ? (
                  <button
                    className={`grap ${lodingRoll ? "__disabled" : ""}`}
                    onClick={() => rollAll()}
                    disabled={lodingRoll}
                  >
                    <span className="product__start">Start</span>
                  </button>
                ) : (
                  <button className={`grap __disabled`} disabled={true}>
                    <span className="product__start">Start</span>
                  </button>
                )}
              </div>
              <div className="">
                <img src={randomImage4} alt="" />
              </div>
            </div>
            <div className="list__ofproduct">
              <div className="">
                <img src={randomImage5} alt="" />
              </div>
              <div className="">
                <img src={randomImage6} alt="" />
              </div>
              <div className="">
                <img src={randomImage7} />
              </div>
            </div>
          </div>

          <div style={{ paddingTop: 10 }}>
            <span className="exclusive__chaneels">
              Exclusive channel for exclsuive members
            </span>
          </div>
        </div>

        <div className="button__grap"></div>

        <div className="rules__description">
          <div className="rules">
            {" "}
            <b>Notice:</b>{" "}
          </div>
          <ul className="rules__list">
            <li>Online Support Hours 10:00 - 22:00</li>
            <li>Please contact online support for your assistance! </li>
          </ul>
        </div>

        {loading && <LoadingModal />}

        {showModal && (
          <div className="modal__grap">
            <div className="modal__product">
              <div className="single__product">
                <div className="single__header">{items?.vip?.title}</div>
                <div className="order__time">
                  <div>Order Time: {Dates.current()}</div>
                  <div>Order Number: N{number}</div>
                </div>
                <div className="badge__ pending">
                  <label>Pending</label>
                </div>
                <div className="product__image">
                  <div className="image__">
                    {items?.photo && items?.photo[0]?.downloadUrl && (
                      <img src={items?.photo[0]?.downloadUrl} alt="" />
                    )}
                  </div>

                  <div className="product__detail">
                    <div className="detail__name">{items?.title}</div>
                    <div className="detail__price">
                      <div> {items?.amount}</div>
                      <div>X 1</div>
                    </div>
                  </div>
                </div>

                <div className="bottom__cadre">
                  <div className="cadre__detail">
                    <div>Total order amount</div>
                    <div>{items?.amount} USD</div>
                  </div>

                  <div className="cadre__detail">
                    <div>Commission</div>
                    <div>{items?.commission}%</div>
                  </div>

                  <div className="cadre__detail">
                    <div>Estimated return</div>
                    <div>
                      {calcule__total(items?.amount, items?.commission)} USD
                    </div>
                  </div>
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
                    <div className="submit__product" onClick={() => submit()}>
                      Submit
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Grappage;
