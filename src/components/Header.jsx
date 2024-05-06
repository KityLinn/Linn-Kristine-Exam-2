import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";


export function Header() {

    return (
     <>
   <header>
        <Navbar className="bg-white shadow-sm mb-3">
          <Container>
            <h1>Navbar</h1>

          </Container>
        </Navbar>
      </header>
     </>
   );
 }
 