import React from "react";
import Link from "next/link";
import Avatar from "@/components/atoms/Avatar";
import Card from "@/components/atoms/Card";
import "./UserItem.css";

type Props = {
 id: string;
 image: string;
 name: string;
 placeCount: number;
};

const UserItem: React.FC<Props> = (props) => {
 return (
  <li className="user-item">
   <Card className="user-item__content">
    <Link href={`/${props.id}/places`}>
     <a>
      <div className="user-item__image">
       <Avatar
        image={`http://localhost:4000/${props.image}`}
        alt={props.name}
       />
      </div>
      <div className="user-item__info">
       <h2>{props.name}</h2>
       <h3>
        {props.placeCount} {props.placeCount === 1 ? "Place" : "Places"}
       </h3>
      </div>
     </a>
    </Link>
   </Card>
  </li>
 );
};

export default UserItem;
