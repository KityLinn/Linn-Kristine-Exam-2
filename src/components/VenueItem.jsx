import { Card } from "react-bootstrap"
import {  Link } from "react-router-dom";

export function VenueItem({ name, id, description, media }) {
  return (
    <>
      <Card className="h-100 d-flex flex-column venue-card-bg">
        <Card.Img
          variant="top"
          src={media[0]?.url}
          alt={media[0]?.alt ? media[0].alt : name}
          style={{ objectFit: "cover", height: "250px" }}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="d-flex flex-column">
            <span className="fs-5">{name}</span>
          </Card.Title>
          <Card.Text className="truncate-text mt-3">
            <span className="fs-6">{description}</span>
          </Card.Text>
          <div className="d-block mt-auto">
            <Link to={"/venues/" + id} className="mt-auto btn btn-primary">
              Book this venue
            </Link>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}