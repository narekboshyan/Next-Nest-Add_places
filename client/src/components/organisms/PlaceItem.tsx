import React, { useState, useContext } from "react";

import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Modal from "@/components/molecules/Modal";
import Map from "@/components/atoms/Map";
import ErrorModal from "@/components/molecules/ErrorModal";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";
import { AuthContext } from "@/context/auth-context";
import { useHttpClient } from "@/hooks/http-hook";
import Image from "next/image";

interface PlaceItemProps {
 id: string;
 image: string;
 title: string;
 description: string;
 address: string;
 coordinates: {
  lat: number;
  lng: number;
 };
 creatorId: string;
 onDelete: (id: string) => void;
}

const PlaceItem: React.FC<PlaceItemProps> = (props) => {
 const { isLoading, error, sendRequest, clearError } = useHttpClient();
 const auth = useContext(AuthContext);
 const [showMap, setShowMap] = useState<boolean>(false);
 const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

 const openMapHandler = () => setShowMap(true);

 const closeMapHandler = () => setShowMap(false);

 const showDeleteWarningHandler = () => {
  setShowConfirmModal(true);
 };

 const cancelDeleteHandler = () => {
  setShowConfirmModal(false);
 };

 const confirmDeleteHandler = async () => {
  setShowConfirmModal(false);
  try {
   await sendRequest(
    `http://localhost:4000/api/places/${props.id}`,
    "DELETE",
    null,
    {
     Authorization: "Bearer " + auth.token,
    }
   );
   props.onDelete(props.id);
  } catch (err) {}
 };
 return (
  <React.Fragment>
   <ErrorModal error={error} onClear={clearError} />
   <Modal
    show={showMap}
    onCancel={closeMapHandler}
    header={props.address}
    contentClass="place-item__modal-content"
    footerClass="place-item__modal-actions"
    footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
   >
    <div className="map-container">
     <Map center={props.coordinates} zoom={16} />
    </div>
   </Modal>
   <Modal
    show={showConfirmModal}
    onCancel={cancelDeleteHandler}
    header="Are you sure?"
    footerClass="place-item__modal-actions"
    footer={
     <React.Fragment>
      <Button inverse onClick={cancelDeleteHandler}>
       CANCEL
      </Button>
      <Button danger onClick={confirmDeleteHandler}>
       DELETE
      </Button>
     </React.Fragment>
    }
   >
    <p>
     Do you want to proceed and delete this place? Please note that it cant be
     undone thereafter.
    </p>
   </Modal>
   <li className="place-item">
    <Card className="place-item__content">
     {isLoading && <LoadingSpinner asOverlay />}
     <div className="place-item__image">
      <Image src={`http://localhost:4000/${props.image}`} alt={props.title} />
     </div>
     <div className="place-item__info">
      <h2>{props.title}</h2>
      <h3>{props.address}</h3>
      <p>{props.description}</p>
     </div>
     <div className="place-item__actions">
      <Button inverse onClick={openMapHandler}>
       VIEW ON MAP
      </Button>
      {auth.userId === props.creatorId && (
       <Button to={`/places/${props.id}`}>EDIT</Button>
      )}

      {auth.userId === props.creatorId && (
       <Button danger onClick={showDeleteWarningHandler}>
        DELETE
       </Button>
      )}
     </div>
    </Card>
   </li>
  </React.Fragment>
 );
};

export default PlaceItem;
