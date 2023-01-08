import React from "react";
import {
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput
} from "shards-react";

const TableFilter = ({  searchColumn, searchCallback }) => {
  const placeholder = searchColumn ? `Search for ${searchColumn}`:"Search...";
  const handleInputChange = (e) => {
    const { value } = e.target;
    searchCallback(value);
  }


  return (
    <Form className="main-navbar__search w-100 d-none d-md-flex d-lg-flex">
      <InputGroup seamless className="ml-3">
        <InputGroupAddon type="prepend">
          <InputGroupText>
            <i className="fas fa-search"></i>
          </InputGroupText>
        </InputGroupAddon>
        {/*<input type="text" placeholder={placeholder} className="navbar-search form-control" value={searchText} onChange={(e) => handleInputChange(e)} />
      */}
     <FormInput
        className="navbar-search"
        placeholder={placeholder}
        onChange={handleInputChange}
      /> 

      </InputGroup>
    </Form>
  )
};
export default TableFilter;