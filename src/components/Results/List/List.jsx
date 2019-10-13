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

import './List.scss';

const priceLevels = ['', '$', '$$', '$$$', '$$$$'];


function List(props) {
  const dummyDateplans = [];
  const dummyVenues = [];
  for (let x = 0; x < 3; x += 1) {
    dummyDateplans.push(
      <option key={x} value={`test${x}`}>test{x}</option>,
    );
  }
  for (let x = 0; x < 4; x += 1) {
    dummyVenues.push(
      <p>Venue {x} </p>,
    );
  }

  const { results } = props;
  const [sortChange, setSortChange] = useState('');
  const [modal, setModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [resultIndex, setResultIndex] = useState(0);
  const [selectedDateplan, setDateplan] = useState(dummyDateplans[0]);
  const [modalAddVisible, setModalAddDisabled] = useState(false);
  // const [newDateplanName, setNewDateplanName] = useState('');  column 'date' = name of dateplan


  const toggleModal = () => setModal(!modal);
  const toggleCreateModal = () => setCreateModal(!createModal);

  function toggleModalCancel() {
    toggleModal();
    setDateplan('');
    setModalAddDisabled(true);
  }

  function addToDateplan() {
    toggleModal();
    setDateplan('');
    setModalAddDisabled(true);
    // perform sql insert here
  }
  function dateplanClick(i) {
    setResultIndex(i);
    toggleModal();
  }

  function showVenues(status) {
    if (status) {
      return '';
    }
    return '';
  }

  function onChangeDateplan(event) {
    // check if selected dateplan has venues in it, if it does => showVenues(true)
    setModalAddDisabled(false);
    setDateplan(event.target.value);
  }

  function createDateplan() {
    console.log('create btn clicked');
    toggleCreateModal();
    // perform sql insert here
  }

  function updateDateplans() {
    // insert new dateplan into database here
    console.log('insert dateplan');
    toggleCreateModal();
  }

  function displayHours(hours) {
    if (typeof hours === 'undefined') {
      return '\n Hours not available \n';
    }
    const date = new Date();
    const today = date.getDay() - 1;
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
            {results[i].rating && <div className="listCardPhone">{results[i].phone}</div>}
            {results[i].website && <a className="listCardWebsite" href={results[i].website}>visit their website</a>}
            {results[i].website === undefined && <div className="listCardWebsite">no website</div>}
            <div className="listCardHours">{displayHours(results[i].openHours)}</div>
            <button type="button" className="btn btn-primary" onClick={() => { dateplanClick(i); }}>Add to Dateplan</button>
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
    if (sortChange === 'price') {
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
    if (sortChange === 'rating') {
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
        <button className="button" type="button" disabled>
          Sort By:
          {' '}
          <select className="sort" onChange={onchangeSort} value={sortChange}>
            <option value="" disabled hidden>Default</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </select>
        </button>
      </div>

      <div>
        <Modal isOpen={modal} toggle={toggleModal} style={{ color: 'black' }}>
          <ModalHeader toggle={toggleModal}>
            <h2>
              Add to a Dateplan
            </h2>
          </ModalHeader>
          <ModalBody>

            <Modal isOpen={createModal} toggle={toggleCreateModal} style={{ color: 'black' }}>
              <ModalHeader> <h2>Create Dateplan</h2> </ModalHeader>
              <ModalBody>
                <p>Create dateplan</p>
              </ModalBody>
              <ModalFooter>
                <Button color="success" onClick={updateDateplans}>Create</Button>
                <Button color="secondary" onClick={toggleCreateModal}>Cancel</Button>
              </ModalFooter>
            </Modal>

            <div>
              <select className="form-control" onChange={onChangeDateplan} value={selectedDateplan}>
                {dummyDateplans}
              </select>
            </div>
            <p style={{ fontSize: 12 }}>
              result index: {resultIndex} &nbsp;
              selected Dateplan: {selectedDateplan}
            </p>
            {showVenues(!modalAddVisible)}
          </ModalBody>
          <ModalFooter>
            <Button color="info" onClick={createDateplan}>Create Dateplan</Button>
            <Button color="primary" onClick={addToDateplan} disabled={modalAddVisible}>Add</Button>{' '}
            <Button color="secondary" onClick={toggleModalCancel}>Cancel</Button>
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
