import React from "react";
import {
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput
} from "shards-react";

const NavbarSearch = () => {
  return (
    <>
    {/* <div class="input-group">
    <div class="form-outline">
      <input id="search-input" type="search" style={"width"="20%"} class="form-control" />
      <label class="form-label" for="form1">Search</label>
    </div>
    <button id="search-button" type="button" class="btn btn-primary">
      <i class="fas fa-search"></i>
    </button>
  </div> w-1000 d-none d-md-flex d-lg-flex*/}
 
     
       <Form className="main-navbar__search">
      <InputGroup seamless className="ml-3">
        <InputGroupAddon type="prepend">
          <InputGroupText>
            <i className="fas fa-search"></i>
          </InputGroupText>
        </InputGroupAddon>
        <FormInput
          className="navbar-search"
          placeholder="Search..."
          
        />
      </InputGroup> 
    </Form>  </> 
    )
 
};

export default NavbarSearch;
