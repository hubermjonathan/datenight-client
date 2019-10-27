/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { useAuth0 } from '../../../common/authHook';
import './List.scss';

const priceLevels = ['', '$', '$$', '$$$', '$$$$'];

function List(props) {
  const {
    isAuthenticated,
    user,
    getTokenSilently,
  } = useAuth0();

  const { results } = props;
  const [sortChange, setSortChange] = useState('');
  const [createPlanModal, setCreatPlanModal] = useState(false);
  const [modal, setModal] = useState(false);
  const [viewPlan, setViewPlan] = useState(false);
  const [resultIndex, setResultIndex] = useState(0);
  const [activities, addActivities] = useState([]);
  const [dateplanName, setDateplanName] = useState('');
  const [btnViewplanDisabled, setBtnViewplan] = useState(true);
  const [currentActivities, addToActivities] = useState([]);
  // const [viewplanDisabled, setViewplanDisable] = useState(true);

  const toggleCreatePlan = () => setCreatPlanModal(!createPlanModal);
  const toggleModal = () => setModal(!modal);
  const toggleViewPlan = () => setViewPlan(!viewPlan);

  function addToDateplan() {
    toggleModal();
    // perform sql insert here
    const a = {
      name: results[resultIndex].name,
      placeid: results[resultIndex].placeID,
      lat: results[resultIndex].location.lat,
      long: results[resultIndex].location.lng,
      address: results[resultIndex].address,
      price: results[resultIndex].priceLevel,
      rating: results[resultIndex].rating,
      website: results[resultIndex].website,
      phone: results[resultIndex].phoneNumber,
    };
    const li = (
      <li>{results[resultIndex].name} &nbsp;
      </li>
    );
    addToActivities([...currentActivities, li]);
    addActivities([...activities, a]);
  }


  function dateplanClick(i) {
    setResultIndex(i);
    toggleModal();
  }

  function startDateplan() {
    toggleCreatePlan();
  }

  function onChangeDateplanName(event) {
    setDateplanName(event.target.value);
  }

  function toggleBtnViewPlan() {
    if (dateplanName.length > 0) {
      toggleCreatePlan();
      setBtnViewplan(false);
    }
  }

  function openViewDateplan() {
    toggleViewPlan();
  }

  async function getToken() {
    const x = await getTokenSilently();
    return x;
  }

  async function saveDateplan() {
    toggleViewPlan();
    const acts = activities;
    const authuser = user.name;
    const savedPlan = {
      user: authuser,
      name: dateplanName,
      rating: 0,
      activities: acts,
    };

    const token = await getToken();

    fetch('https://datenight-api-251515.appspot.com/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(savedPlan),
    });

    setBtnViewplan(true);
    addToActivities([]);
    addActivities([]);
  }

  function displayHours(hours) {
    if (typeof hours === 'undefined') {
      return '\n Hours not available \n';
    }
    const date = new Date();
    let today = date.getDay() - 1;
    if (today < 0) { // is a sunday
      today = 6;
    }
    const h = `Today: ${hours[today].substring(hours[today].indexOf(':') + 2)}`;
    return h;
  }

  function getCards() {
    const createdCards = [];
    if (results) {
      for (let i = 0; i < results.length; i += 1) {
        createdCards.push(
          <div className="listCard" key={`listCard${i}`}>
            <div className="listCardTitle">
              {results[i].name}
              &nbsp;
              {priceLevels[results[i].priceLevel]}
            </div>
            {results[i].rating
              && (
                <div className="listCardRating">
                  {results[i].rating} stars
                </div>
              )}
            <div className="listCardAddress">{results[i].address}</div>
            {results[i].phone && <div className="listCardPhone">{results[i].phone}</div>}
            {results[i].website && <a className="listCardWebsite" href={results[i].website}>visit their website</a>}
            {results[i].website === undefined && <div className="listCardWebsite">no website</div>}
            <div className="listCardHours">{displayHours(results[i].openHours)}</div>
            {isAuthenticated && <button type="button" className="btn btn-primary" onClick={() => { dateplanClick(i); }}>Add</button>}
          </div>,
        );
      }
    }

    if (createdCards.length === 0) {
      return <div className="emptyMessage">your search returned no results.</div>;
    }

    return createdCards;
  }

  function getOpen(stat) {
    return !stat;
  }

  const [cards, setCards] = useState(getCards());
  // eslint-disable-next-line no-unused-vars
  const [open, setOpen] = useState(getOpen(true));

  function onchangeSort(event) {
    setSortChange(event.target.value);
    const newCards = cards.slice(0);
    if (sortChange === 'rating') {
      newCards.sort((e1, e2) => {
        if (!e1.props.children[1] && !e2.props.children[1]) {
          return -1;
        }
        if (!e1.props.children[1]) {
          return 1;
        }
        if (!e2.props.children[1]) {
          return -1;
        }
        const r1 = e1.props.children[1].props.children[0];
        const r2 = e2.props.children[1].props.children[0];
        if (r1 > r2) {
          return -1;
        }
        if (r1 < r2) {
          return 1;
        }
        return 0;
      });
    }
    if (sortChange === 'price') {
      newCards.sort((e1, e2) => {
        if (!e1.props.children[0].props.children[2] && !e2.props.children[0].props.children[2]) {
          return -1;
        }
        if (!e1.props.children[0].props.children[2]) {
          return 1;
        }
        if (!e2.props.children[0].props.children[2]) {
          return -1;
        }
        const r1 = e1.props.children[0].props.children[2].length;
        const r2 = e2.props.children[0].props.children[2].length;
        if (r1 > r2) {
          return -1;
        }
        if (r1 < r2) {
          return 1;
        }
        return 0;
      });
    }
    setCards(newCards);
  }

  return (
    <div>
      <div className="utilityBar">
        {isAuthenticated && (
          <div>
            <button type="button" className="btn btn-success" onClick={startDateplan}>Start Dateplan</button>&nbsp;&nbsp;
            <button type="button" className="btn btn-info" onClick={() => { openViewDateplan(); }} disabled={btnViewplanDisabled}>View Dateplan</button>
          </div>
        )}
        <button className="button" type="button" disabled>
          Sort By:
          &nbsp;
          <select className="sort" onChange={onchangeSort} value={sortChange}>
            <option value="" disabled hidden>Default</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </select>
        </button>
      </div>

      <div>
        <Modal isOpen={createPlanModal} toggle={toggleCreatePlan} style={{ color: 'black' }}>
          <ModalHeader toggle={toggleCreatePlan}>
            <h2>
              Create Dateplan
            </h2>
          </ModalHeader>
          <ModalBody style={{ fontSize: 15 }}>
            Dateplan Name: <input type="text" onChange={onChangeDateplanName} />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggleBtnViewPlan}>Create</Button>&nbsp;
            <Button color="secondary" onClick={toggleCreatePlan}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={modal} toggle={toggleModal} style={{ color: 'black' }}>
          <ModalHeader toggle={toggleModal}>
            <h2>
              Add to a Dateplan?
            </h2>
          </ModalHeader>
          <ModalFooter>
            <Button color="primary" onClick={addToDateplan}>Confirm</Button>&nbsp;
            <Button color="secondary" onClick={toggleModal}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={viewPlan} toggle={toggleViewPlan} style={{ color: ' black' }}>
          <ModalHeader toggle={toggleViewPlan}>
            <h2>
              Current Activities
            </h2>
          </ModalHeader>
          <ModalBody style={{ fontSize: 15 }}>
            <ul>
              {currentActivities}
            </ul>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={saveDateplan}>Save</Button>&nbsp;
            <Button color="secondary" onClick={toggleViewPlan}>Exit</Button>
          </ModalFooter>

        </Modal>
      </div>

      <div className="cardsContainer">
        {cards}
      </div>
    </div>
  );
}

export default List;
