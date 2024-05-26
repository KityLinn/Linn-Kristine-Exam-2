import { Button, Card } from "react-bootstrap"
import {  Link } from "react-router-dom";

export function ProfileVenue({ name, id, description, media }) {
  return (
    <>
      <Card border="primary" className="h-100">
        <Card.Img
          variant="top"
          src={media[0]?.url}
          alt={media[0]?.alt}
          style={{ objectFit: "cover", height: "250px" }}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title>
            <span className="fs-5">{name}</span>
          </Card.Title>
          <Card.Text className="truncate-text mt-3">
            <span className="fs-6">{description}</span>
          </Card.Text>
          <div className="d-block mt-auto">
            <Link to={"/venues/" + id} className="mt-auto btn btn-primary">
              Browse your venue
            </Link>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}