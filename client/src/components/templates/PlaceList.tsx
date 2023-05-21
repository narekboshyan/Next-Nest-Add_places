import React from "react";
import Card from "@/components/atoms/Card";
import PlaceItem from "@/components/organisms/PlaceItem";
import Button from "@/components/atoms/Button";
import styles from "./PlaceList.module.css";

interface Place {
 id: string;
 image: string;
 title: string;
 description: string;
 address: string;
 creator: string;
 location: {
  lat: number;
  lng: number;
 };
}

interface Props {
 items: Place[];
 onDeletePlace: (id: string) => void;
}

const PlaceList: React.FC<Props> = ({ items, onDeletePlace }) => {
 if (items.length === 0) {
  return (
   <div className={`${styles["place-list"]} center`}>
    <Card>
     <h2>No places found. Maybe create one?</h2>
     <Button href="/places/new">Share Place</Button>
    </Card>
   </div>
  );
 }

 return (
  <ul className={styles["place-list"]}>
   {items.map((place) => (
    <PlaceItem
     key={place.id}
     id={place.id}
     image={place.image}
     title={place.title}
     description={place.description}
     address={place.address}
     creatorId={place.creator}
     coordinates={place.location}
     onDelete={props.onDeletePlace}
    />
   ))}
  </ul>
 );
};

export default PlaceList;
