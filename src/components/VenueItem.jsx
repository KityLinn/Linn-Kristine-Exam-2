import { Button, Card } from "react-bootstrap"
import {  Link } from "react-router-dom";

export function VenueItem ({name, id, description, media, }) {
    return (
        <>
 <Card border="primary" className="h-100">
      <Card.Img
        variant="top"
        src={media[0]?.url}
        alt={media[0]?.alt}
        style={{ objectFit: "cover", height: "250px"}}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex mb-2 flex-column">
          <span className="fs-5 mb-5">{name}</span>
        </Card.Title>
        <Card.Text className="truncate-text">
          {description}
        </Card.Text>
        <Link to= {"/venues/" + id} className="mt-auto btn btn-primary">
        Book this venue
        </Link>
       
      </Card.Body>
    </Card>
        </>
    ) 

}