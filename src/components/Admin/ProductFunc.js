import React, { useContext, useEffect, useRef, useState } from 'react';
import { 
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Button
} from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

import '../../css/Admin/ProductFunc.css';
import { AdminContext } from '../../contexts/AdminContext';

function validateFn(input = '', info = '') {
  if (!input) {
    return `The ${info} field is required.`
  }
  if (info !== 'price') {
    if (input.length < 6) {
      return `${info.charAt(0).toUpperCase() + info.slice(1)} must be at least 5 characters.`
    }
  }
  return '';
}

const ProductFunc = () => {
  const { open, setOpen, product, setProducts } = useContext(AdminContext);
  const [ data, setData ] = useState({});
  const [errors, setError] = useState({
    name: '',
    description: '',
    price: '',
    author: ''
  });
  const divElement = useRef(null);

  useEffect(() => {
    setData(product);
    if (open) {
      divElement.current.focus();
    }
  }, [open, product])
  
  const categoryList = [
    { name: 'Children Literature' },
    { name: 'Comic Book' },
    { name: 'Fantasy' },
    { name: 'Horror' },
    { name: 'Novel' },
    { name: 'Romantic' },
    { name: 'Science Fiction' },
    { name: 'Thriller' }
  ];

  const validate = () => {
    const nameError = validateFn(data.title, 'name') || '';
    const descriptionError = validateFn(data.description, 'description') || '';
    const priceError = validateFn(data.price, 'price') || '';
    const authorError = validateFn(data.author, 'author') || '';
    
    if (nameError || descriptionError || priceError || authorError) {
      setError({
        name: nameError,
        description: descriptionError,
        price: priceError,
        author: authorError,
      })
      return false;
    }
    return true;
  }

  const handleEsc = (event) => {
    if (event.keyCode === 27) {
      setOpen(false)
    }
  }

  const handleImage = (event) => {
    const files = event.target.files;
    const formData = new FormData();    
    formData.append('file', files[0]);
    formData.append('upload_preset', 'dvbtrung');
    
    axios.post('https://api.cloudinary.com/v1_1/dofqucuyy/image/upload', formData,  {headers: {'Content-Type': 'application/json'}})
          .then(res => {
            setData({...data, image: res.data.secure_url});
          })
  }

  const handleInput = (event) => {
    setData({...data, [event.target.name]: event.target.value});
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('adminToken');
    if (JSON.stringify(data) === JSON.stringify(product)) {
      return;
    }

    const isValid = validate();

    if (isValid) {
      axios.patch('http://localhost:5000/admin/update', data, { headers: {"Authorization" : `Bearer ${token}`}})
           .then(res => {
              setOpen(false);
              setProducts();
           })
    }
  }
  
  return(
    <div 
      className={ open ? "ProductFuncBackground update-active" : "ProductFuncBackground" } 
      onClick={() => setOpen(false)}
      onKeyDown={handleEsc}
      tabIndex="0"
      ref={divElement}
      >
      <Container 
        className={ open ? "ProductFunc update-active" : "ProductFunc" }
        onClick={(event) => event.stopPropagation()}
      >
        <Row
          style={{
            position: "fixed",
            top: "0",
            width: "100%",
            left: "0",
            right: "0",
            margin: "0",
            padding: "50px 35px 0 70px",
          }}
        >
          <Col className="d-flex justify-content-between p-0">
            <h3 className="bt-header mb-5" style={{fontSize:"18px", color:"rgb(22,31,106)"}}>Update Product</h3>
            <FontAwesomeIcon icon={faTimes} onClick={() => setOpen(false)}/>
          </Col>
        </Row>
        <Form 
          style={{
            height: "100%",
            overflow: "scroll"
          }}
          onSubmit={handleSubmit}
        >
          <Row className="mb-5 w-100 m-0">
            <Col xl="4" style={{padding:"30px"}}>
              <span className="product-title">Upload your Product image here</span>
            </Col>
            <Col xl="8" className="product-background">
              <FormGroup>
                <Input id="file" type="file" accept="image/*" name="image" onChange={handleImage} />
                <Label for="file" className="input-wrapper">
                  <FontAwesomeIcon icon={faCloudUploadAlt} size="2x" />
                  <span>
                    <span>Drag/Upload </span>
                    your image here.
                  </span>
                </Label>
                <div className="img-wrapper">
                  <img src={data.image} alt="" />
                </div>
              </FormGroup>
            </Col>
          </Row>

          <Row className="w-100 m-0">
            <Col xl="4" style={{padding:"30px"}}>
              <span className="product-title">Add your Product description and necessary information from here</span>
            </Col>
            <Col className="product-background">
              <FormGroup className="update-form">
                <Label className="product-label" for="name">
                  Name
                  <span className="ml-1 text-danger">*</span>
                </Label>
                <Input onChange={handleInput} value={data.title || ''} className="product-form-control" id="name" type="text" name="title"/>
                {errors.name && <div className="validation">{errors.name}</div>}
              </FormGroup>

              <FormGroup className="update-form">
                <Label className="product-label" for="description">
                  Description
                  <span className="ml-1 text-danger">*</span>
                </Label>
                <div>
                  <textarea 
                    value={data.description || ''} 
                    className="product-form-control" 
                    id="description" 
                    type="text" 
                    name="description" 
                    onChange={handleInput}
                  />
                </div>
                {errors.description && <div className="validation">{errors.description}</div>}
              </FormGroup>

              <FormGroup className="update-form">
                <Label className="product-label" for="price">
                  Price
                  <span className="ml-1 text-danger">*</span>
                </Label>
                <Input onChange={handleInput} value={data.price || ''} className="product-form-control" id="price" type="number" name="price"/>
                {errors.price && <div className="validation">{errors.price}</div>}
              </FormGroup>

              <FormGroup className="update-form">
                <Label className="product-label" for="author">
                  Author
                  <span className="ml-1 text-danger">*</span>
                </Label>
                <Input onChange={handleInput} value={data.author || ''} className="product-form-control" id="author" type="text" name="author"/>
                {errors.author && <div className="validation">{errors.author}</div>}
              </FormGroup>

              <FormGroup className="update-form">
                <Label className="product-label" for="category">
                  Category
                  <span className="ml-1 text-danger">*</span>
                </Label>
                <Input onChange={handleInput} className="product-form-control" id="category" type="select" name="category" value={data.category || ''}>
                  { categoryList.map(category => <option key={category.name}>{category.name}</option>) }
                </Input>
                
              </FormGroup>
            </Col>
          </Row>
          
          <Row className="update-btn">
            <Col className="p-0 cancle-btn w-100">
              <Button className="w-100" onClick={() => setOpen(false)}>Cancle</Button>
            </Col>
            <Col className="p-0 submit-btn w-100">
              <Button className="w-100" type="submit">Update Product</Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}

export default ProductFunc;