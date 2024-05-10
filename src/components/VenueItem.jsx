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
        height="250px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex mb-4 flex-column">
          <span className="fs-5 mb-5">{name}</span>
        </Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
        <Link to= {"/venues/" + id} >
           <Button className="mt-auto" variant="primary">Book this venue</Button>
        </Link>
       
      </Card.Body>
    </Card>
        </>
    ) 

}